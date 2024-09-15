import IMachines from "../../../entities/IMachines";
import { AdmResponses } from "../../IUserAdm_usecases";
import PrismaMachineRepositorie from "../../../repositories/PrismaRepositories/PrismaMachineRepositorie";
import PrismaLocalRepositorie from "../../../repositories/PrismaRepositories/PrismaLocalRepositorie";
import PrismaUserAdmRepositorie from "../../../repositories/PrismaRepositories/PrismaUserAdmRepositorie";
// import validator from "../../../../security/validations/Joi";
// import { machineSchemma } from "../../../../security/validations/schemmas-joi/MachineSchemma";
const prismaMachine = new PrismaMachineRepositorie()
const prismaLocal = new PrismaLocalRepositorie()
const prismaUserAdm = new PrismaUserAdmRepositorie()

export const createMachine = async (data: IMachines): Promise<AdmResponses> => {
    return new Promise(async (resolve, reject) => {
        try {
            // ... existing code ...

            const machineCreated = await prismaMachine.create(data);

            if (!machineCreated) return reject({ status_code: 401, msg: 'falha ao criar máquina', body: machineCreated });

            const response: AdmResponses = { status_code: 200, msg: 'máquina criada com sucesso', body: machineCreated };
            resolve(response);
        } catch (error: any) {
            console.log("observando error _>", error);
            return reject({ status_code: 500, msg: 'falha ao criar máquina', body: error });
        }
    });
}