import axios from "axios";
import ISessions from "../../../entities/ISessions";
import { AdmResponses, params } from "../../IUserAdm_usecases";
import PrismaMachineRepositorie from "../../../repositories/PrismaRepositories/PrismaMachineRepositorie";
import PrismaUserClientRepositorie from "../../../repositories/PrismaRepositories/PrismaUserClientRepositorie";
import { timerSessionInstance } from "../../../../http/app";

export function stopMachine(data: ISessions): Promise<AdmResponses> {

    const prismaMachine = new PrismaMachineRepositorie()
    const prismaClient = new PrismaUserClientRepositorie()
    console.log("stop step 2")

    return new Promise(async (resolve, reject) => {

        console.log("observando data: ", data)

        try {

            const currentClient = await prismaClient.find(data.client_id)
            if (!currentClient) {
                reject({
                    status_code: 404,
                    body: "client not founded"
                })
                return
            }

            await prismaMachine.update(data.machine_id, {
                status: "STOPED"
            })

            currentClient.horas && data.elapsed_time &&
                await prismaClient.update(data.client_id, {
                    isPlaying: false,
                    horas: currentClient.horas - (data.elapsed_time / 3600)
                });


            try {
                await axios.post(`${process.env.API_URL_WEBSOCKET}/websocket/sent-message?message_type=${data.machine_id}-stopped`, {
                    body: {
                        machine_id: data.machine_id,
                        client_id: data.client_id,
                    },
                    cronTimer: 0,
                })
            } catch (error) {
                console.log("error ao tentar enviar mensagem websocket")
            }

            timerSessionInstance.stopMachine(data)

            resolve({
                status_code: 200,
                body: 'Machine stopped'
            })

        } catch (error: any) {
            reject({
                status_code: 500,
                body: error.message
            })
        }

    })

}