import PrismaTransactionRepositorie from "../../../repositories/PrismaRepositories/PrismaTransactionRepositorie";
import { AdmResponses } from "../../IUserAdm_usecases";

export const ListAllTransactions = async (adm_id?: string): Promise<AdmResponses> => {
    const TransactionsRepositorie = new PrismaTransactionRepositorie()

    return new Promise(async (resolve, reject) => {

        try {

            const allTransactions = await TransactionsRepositorie.list(adm_id)
            if (!allTransactions[0]) return reject({ status_code: 404, msg: 'none transaction founded', body: allTransactions })
            const response: AdmResponses = { status_code: 200, msg: "founded", body: allTransactions }

            resolve(response);

        } catch (error: any) {
            return reject({ status_code: 500, body: { msg: error.message } })
        }

    })

}