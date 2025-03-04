import axios from "axios"
import { AdmResponses, params } from '../../IUserAdm_usecases';
import dayjs from 'dayjs';
import PrismaMachineRepositorie from '../../../repositories/PrismaRepositories/PrismaMachineRepositorie';
import PrismaSessionRepositorie from '../../../repositories/PrismaRepositories/PrismaSessionRepositorie';
import PrismaTransactionRepositorie from '../../../repositories/PrismaRepositories/PrismaTransactionRepositorie';
import PrismaUserClientRepositorie from '../../../repositories/PrismaRepositories/PrismaUserClientRepositorie';
import ISessions from '../../../entities/ISessions';
import ITransaction from '../../../entities/ITransaction';
import { timerSessionInstance } from '../../../../http/app';
import { stopMachine } from './stopMachine';


const prismaMachine = new PrismaMachineRepositorie();
const prismaSession = new PrismaSessionRepositorie();
const prismaTransaction = new PrismaTransactionRepositorie();
const prismaClient = new PrismaUserClientRepositorie();

async function startMachine(data: ISessions, params: params): Promise<AdmResponses> {
    let currentTimer: number = 0;
    let sessionInterval: any;

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

        //#######################################################################################################
        try {
            if (!data) {
                reject({
                    status_code: 404,
                    body: 'Dados inválidos',
                });
                return;
            }

            //CLIENT verify................................................................
            const currenClient = await prismaClient.find(data.client_id);

            if (!currenClient) {
                reject({
                    status_code: 404,
                    body: 'client not founded',
                });
                return;
            }

            if (currenClient?.isPlaying) {
                reject({
                    status_code: 400,
                    body: 'Cliente já está em uma sessão',
                });
                return;
            }

            if (currenClient.horas && currenClient.horas < (data.duration / 60)) {
                reject({
                    status_code: 403,
                    body: 'horas insuficientes',
                });
                return;
            }

            //04 ............................................................................
            await prismaClient.update(data.client_id, {
                isPlaying: true
            });

            console.log('initialize session... ');

            //01 CLIENT...PLAY.................................................................
            await prismaMachine.update(data.machine_id, {
                status: 'RUNNING',
                client_id: data.client_id
            });

            const timeStarted = dayjs().toDate();
            const timeEnded = dayjs().add(data.duration, 'minutes').toDate();

            //02  SESSION .................................................................
            await prismaSession.create({
                ...data,
                timer_started_at: timeStarted,
                timer_ended_at: timeEnded,
            });


            console.clear()
            // INTERVALO ----------------------------------------------------------------
            sessionInterval = setInterval(async () => {
                currentTimer++;

                try {
                    await axios.post(`${process.env.API_URL_WEBSOCKET}/websocket/sent-message?message_type=${data.machine_id}-running`, {
                        body: {
                            machine_id: data.machine_id,
                            client_id: data.client_id,
                        },
                        cronTimer: currentTimer,
                    })
                } catch (error: any) {
                    console.log("error ao tentar enviar mensagem websocket", error.response);
                }

                if (dayjs(timeEnded).valueOf() <= dayjs().valueOf()) {
                    console.log('session ended');
                    clearInterval(sessionInterval);

                    await stopMachine({
                        ...data,
                        elapsed_time: data.duration * 60 // convertendo minutos para segundos
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
            console.clear()
            console.log("error at try run machine: ", error.message)
            return reject({
                status_code: 500,
                body: 'server error',
            });
        }
    });
}

export { startMachine };
