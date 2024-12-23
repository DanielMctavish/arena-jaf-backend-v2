import { AdmResponses } from "../../IUserAdm_usecases";
import PrismaMachineRepositorie from "../../../repositories/PrismaRepositories/PrismaMachineRepositorie";

export const deleteMachine = async (machine_id: string): Promise<AdmResponses> => {

    const MachineRepositorie = new PrismaMachineRepositorie()

    console.log("parametros?? ", machine_id)

    return new Promise(async (resolve, reject) => {

        try {

            if (!machine_id) {
                return reject({
                    status_code: 403,
                    body: "machine_id nulo ou inválido"
                })
            }
            const currentMachine = await MachineRepositorie.delete(machine_id)
            const response: AdmResponses = { status_code: 200, msg: 'máquina deletada com sucesso', body: currentMachine }
            resolve(response);

        } catch (error: any) {

            reject({
                status_code: 500,
                body: error.message
            })

        }

    })

}