import ISessions from "../../../entities/ISessions";
import { AdmResponses, params } from "../../IUserAdm_usecases";
import PrismaMachineRepositorie from "../../../repositories/PrismaRepositories/PrismaMachineRepositorie";
import { sessionInterval } from "./startMachine";
import { serverSendMessage } from "../../../../websockets/socketServer";



export function stopMachine(data: ISessions, params: params): Promise<AdmResponses> {

    const prismaMachine = new PrismaMachineRepositorie()

    return new Promise(async (resolve, reject) => {

        try {

            await prismaMachine.update(params.machine_id, {
                status: "STOPED"
            })

            clearInterval(sessionInterval)

            serverSendMessage('session-machine-stoped', {
                body: {
                    machine_id: data.machine_id,
                    client_id: data.client_id,

                },
                timer: 0
            });

        } catch (error) {
            reject({
                status_code: 500,
                msg: "server error"
            })
        }

    })

}