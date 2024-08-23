import { AdmResponses, params } from "../../IUserAdm_usecases"
import ITransaction from "../../../entities/ITransaction";
import PrismaTransactionRepositorie from "../../../repositories/PrismaRepositories/PrismaTransactionRepositorie";
import PrismaUserClientRepositorie from "../../../repositories/PrismaRepositories/PrismaUserClientRepositorie";

const prismaTransaction = new PrismaTransactionRepositorie();
const prismaClient = new PrismaUserClientRepositorie()

export const addHourToClient = async (data: ITransaction, horas: string): Promise<AdmResponses> => {

    return new Promise(async (resolve, reject) => {

        try {
            const currentClient = await prismaClient.find(data.userClientId)

            if (!currentClient) {
                return reject({
                    status_code: 400,
                    body: {
                        msg: "Cliente ou Administrador não encontrado"
                    }
                })
            }

            const currentTransaction = await prismaTransaction.create(data)
            const clientUpdated = await prismaClient.update(data.userClientId, {
                saldo: currentClient.saldo - currentTransaction.value,
                horas: currentClient.horas ?
                    currentClient.horas + parseFloat(horas) :
                    0 + parseFloat(horas)
            })

            if (!clientUpdated) {
                return reject({
                    status_code: 400,
                    body: {
                        msg: "Não foi possível atualizar a hora do cliente"
                    }
                })
            }

            return resolve({
                status_code: 200,
                body: currentTransaction,
                msg: "horas adicionadas com sucesso"
            })

        } catch (error: any) {
            return reject({ status_code: 500, msg: 'falha ao realizar transação', body: error.message })
        }

    });

}