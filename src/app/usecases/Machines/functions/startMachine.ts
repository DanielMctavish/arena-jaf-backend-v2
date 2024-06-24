// startMachine.ts
import { AdmResponses, params } from '../../IUserAdm_usecases';
import dayjs from 'dayjs';
import PrismaMachineRepositorie from '../../../repositories/PrismaRepositories/PrismaMachineRepositorie';
import PrismaSessionRepositorie from '../../../repositories/PrismaRepositories/PrismaSessionRepositorie';
import PrismaTransactionRepositorie from '../../../repositories/PrismaRepositories/PrismaTransactionRepositorie';
import PrismaUserClientRepositorie from '../../../repositories/PrismaRepositories/PrismaUserClientRepositorie';
import ISessions from '../../../entities/ISessions';
import ITransaction from '../../../entities/ITransaction';
import { serverSendMessage } from '../../../../websockets/socketServer';
import { timerSessionInstance } from '../../../../http/app';

const prismaMachine = new PrismaMachineRepositorie();
const prismaSession = new PrismaSessionRepositorie();
const prismaTransaction = new PrismaTransactionRepositorie();
const prismaClient = new PrismaUserClientRepositorie();

let sessionInterval: any;

async function startMachine(data: ISessions, params: params): Promise<AdmResponses> {
    let currentTimer: number = 0;
    const currentValue: number = data.value;
    const currentMachine: string = data.machine_id;

    return new Promise(async (resolve, reject) => {

        //verify if machine exist
        const isMachine = await prismaMachine.find(currentMachine)

        if (isMachine?.status === "RUNNING") {
            reject({
                status_code: 400,
                body: 'Máquina já está em execução',
            });
            return;
        }

        if (!isMachine) {
            reject({
                status_code: 404,
                body: 'Máquina não encontrada',
            });
            return;
        }

        //verify if client have funds or exist................................................................
        const isClient = await prismaClient.find(data.client_id);
        if (!isClient) {
            reject({
                status_code: 404,
                body: 'Cliente não encontrado',
            });
            return;
        }
        if (isClient?.saldo < data.value) {
            reject({
                status_code: 400,
                body: 'Saldo insuficiente',
            });
            return;
        }
        //#######################################################################################################
        try {
            if (!data) {
                reject({
                    status_code: 404,
                    body: 'Dados inválidos',
                });
                return;
            }
            //01 ....................................................................
            await prismaMachine.update(currentMachine, {
                status: 'RUNNING',
            });

            const timeStarted = dayjs().toDate();
            const timeEnded = dayjs().add(data.duration, 'minutes').toDate();

            //02 .................................................................
            await prismaSession.create({
                ...data,
                timer_started_at: timeStarted,
                timer_ended_at: timeEnded,
            });

            const transactionData: Partial<ITransaction> = {
                value: currentValue,
                transaction_type: 'MACHINE_CREDIT',
                method: 'LOCAL',
                status: 'APPROVED',
                userAdmId: data.adm_id,
                userClientId: data.client_id,
            };
            //03 ............................................................................
            await prismaTransaction.create(transactionData as ITransaction);
            const currenClient = await prismaClient.find(data.client_id);

            if (currenClient?.isPlaying) {
                reject({
                    status_code: 400,
                    body: 'Cliente já está em uma sessão',
                });
                return;
            }

            if (!currenClient) {
                reject({
                    status_code: 404,
                    body: 'Cliente não encontrado',
                });
                return;
            }

            //04 ............................................................................
            await prismaClient.update(data.client_id, {
                saldo: currenClient.saldo - data.value,
                isPlaying: true
            });

            console.log('initialize session... ');

            // INTERVALO ----------------------------------------------------------------
            sessionInterval = setInterval(async () => {
                currentTimer++;

                //MESSAGE ...
                serverSendMessage('session-machine-running',
                    {
                        body: {
                            machine_id: data.machine_id,
                            client_id: data.client_id,
                            timer: currentTimer,
                        },
                        timer: currentTimer
                    }
                );

                if (dayjs(timeEnded).valueOf() <= dayjs().valueOf()) {
                    console.log('session ended');
                    clearInterval(sessionInterval);

                    await prismaMachine.update(currentMachine, {
                        status: 'STOPED',
                    });

                    serverSendMessage('session-machine-end', {
                        body: {
                            machine_id: data.machine_id,
                            client_id: data.client_id,

                        },
                        timer: currentTimer
                    });
                    return;
                }

            }, 1000);

            timerSessionInstance.saveSessionInstance(data, sessionInterval, reject)

            return resolve({
                status_code: 200,
                body: 'Machine is running',
            });
        } catch (error: any) {
            return reject({
                status_code: 500,
                body: 'server error',
            });
        }
    });
}

export { startMachine };
