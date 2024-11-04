import axios from "axios"
import { AdmResponses, params } from '../../IUserAdm_usecases';
import PrismaMachineRepositorie from "../../../repositories/PrismaRepositories/PrismaMachineRepositorie";
import IMachines from "../../../entities/IMachines";

const prismaMachine = new PrismaMachineRepositorie();

async function updateMachine(data: Partial<IMachines>, params: params): Promise<AdmResponses> {
    return new Promise(async (resolve, reject) => {
        try {
            // Verifica se a máquina existe
            const machine = await prismaMachine.find(params.machine_id);

            if (!machine) {
                return reject({
                    status_code: 404,
                    body: 'Máquina não encontrada',
                });
            }

            // Atualiza a máquina
            const updatedMachine = await prismaMachine.update(params.machine_id, data);

            return resolve({
                status_code: 200,
                body: 'Máquina atualizada com sucesso',
            });

        } catch (error: any) {
            console.log("error ao atualizar máquina: ", error.message);
            return reject({
                status_code: 500,
                body: 'Erro interno do servidor',
            });
        }
    });
}

export default updateMachine;