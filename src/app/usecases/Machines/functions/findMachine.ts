import { AdmResponses } from "../../IUserAdm_usecases"
import PrismaMachineRepositorie from "../../../repositories/PrismaRepositories/PrismaMachineRepositorie"

const prismaMachine = new PrismaMachineRepositorie()

const findMachine = (machine_id: string): Promise<AdmResponses> => {

    return new Promise(async (resolve, reject) => {

        try {

            const currentMachine = await prismaMachine.find(machine_id)

            if (!currentMachine) {
                return reject({
                    status_code: 404,
                    body: {
                        msg: "Machine not found"
                    }
                })
            }
            return resolve({
                status_code: 200,
                msg: "Machine founded",
                body: currentMachine
            })

        } catch (error: any) {

            return reject({
                status_code: 500,
                body: {
                    msg: error.message
                }
            })

        }

    })

}


export default findMachine;