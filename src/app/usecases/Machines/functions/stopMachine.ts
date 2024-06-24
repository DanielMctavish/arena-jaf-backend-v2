import ISessions from "../../../entities/ISessions";
import { AdmResponses, params } from "../../IUserAdm_usecases";
import PrismaMachineRepositorie from "../../../repositories/PrismaRepositories/PrismaMachineRepositorie";
import PrismaUserClientRepositorie from "../../../repositories/PrismaRepositories/PrismaUserClientRepositorie";
import { serverSendMessage } from "../../../../websockets/socketServer";
import { timerSessionInstance } from "../../../../http/app";

export function stopMachine(data: ISessions, params: params): Promise<AdmResponses> {

    const prismaMachine = new PrismaMachineRepositorie()
    const prismaClient = new PrismaUserClientRepositorie()

    console.log("playing... ")

    return new Promise(async (resolve, reject) => {

        try {

            await prismaMachine.update(params.machine_id, {
                status: "STOPED"
            })
            await prismaClient.update(data.client_id, {
                isPlaying: false
            });

            serverSendMessage('session-machine-stoped', {
                body: {
                    machine_id: data.machine_id,
                    client_id: data.client_id,

                },
                timer: 0
            });

            timerSessionInstance.stopMachine(params)

            resolve({
                status_code: 200,
                body: 'Machine stopped'
            })

        } catch (error) {
            reject({
                status_code: 500,
                msg: "server error"
            })
        }

    })

}