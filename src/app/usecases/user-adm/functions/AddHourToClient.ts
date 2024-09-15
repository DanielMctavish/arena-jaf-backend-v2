import { AdmResponses } from "../../IUserAdm_usecases";
import ITransaction from "../../../entities/ITransaction";
import PrismaTransactionRepositorie from "../../../repositories/PrismaRepositories/PrismaTransactionRepositorie";
import PrismaUserClientRepositorie from "../../../repositories/PrismaRepositories/PrismaUserClientRepositorie";
import PrismaUserAdmRepositorie from "../../../repositories/PrismaRepositories/PrismaUserAdmRepositorie"; // Import Admin repository

const prismaTransaction = new PrismaTransactionRepositorie();
const prismaClient = new PrismaUserClientRepositorie();
const prismaAdmin = new PrismaUserAdmRepositorie(); // Initialize Admin repository

export const addHourToClient = async (data: ITransaction, horas: string): Promise<AdmResponses> => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentClient = await prismaClient.find(data.userClientId);
            const currentAdmin = await prismaAdmin.find(data.userAdmId); // Find Admin

            if (!currentClient || !currentAdmin) {
                return reject({
                    status_code: 400,
                    body: {
                        msg: "Cliente ou Administrador não encontrado"
                    }
                });
            }

            const currentTransaction = await prismaTransaction.create(data);
            const clientUpdated = await prismaClient.update(data.userClientId, {
                horas: currentClient.horas ? currentClient.horas + parseFloat(horas) : parseFloat(horas)
            });

            await prismaAdmin.update(data.userAdmId, {
                saldo: currentAdmin.saldo + currentTransaction.value // Increment admin's balance
            });

            if (!clientUpdated) {
                return reject({
                    status_code: 400,
                    body: {
                        msg: "Não foi possível atualizar a hora do cliente"
                    }
                });
            }

            return resolve({
                status_code: 200,
                body: currentTransaction,
                msg: "horas adicionadas com sucesso"
            });

        } catch (error: any) {
            return reject({ status_code: 500, msg: 'falha ao realizar transação', body: error.message });
        }
    });
};