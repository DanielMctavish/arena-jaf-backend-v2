import { AdmResponses } from "../../IUserAdm_usecases";
import PrismaProductRepositorie from "../../../repositories/PrismaRepositories/PrismaProductRepositorie";
import PrismaUserClientRepositorie from "../../../repositories/PrismaRepositories/PrismaUserClientRepositorie";
import PrismaTransactionRepositorie from "../../../repositories/PrismaRepositories/PrismaTransactionRepositorie";
import { IBuyProduct } from "../../IProduct_usecases";
import ITransaction from "../../../entities/ITransaction";

export const buyProduct = (data: IBuyProduct): Promise<AdmResponses> => {
    const prismaProduct = new PrismaProductRepositorie()
    const prismaClient = new PrismaUserClientRepositorie()
    const prismaTransaction = new PrismaTransactionRepositorie()


    return new Promise(async (resolve, reject) => {

        try {
            const currentProduct = await prismaProduct.find(data.product_id)
            const currentClient = await prismaClient.find(data.client_id)

            if (!currentProduct || !currentClient) {
                return reject({ status_code: 404, body: { msg: 'product or client not found' } })
            }

            const transactionData: ITransaction = {
                method: 'LOCAL',
                value: data.value,
                transaction_type: 'PRODUCT',
                status: 'APPROVED',
                userClientId: data.client_id,
                userAdmId: currentProduct.owner_id
            }

            const currentTransaction = await prismaTransaction.create(transactionData)

            await prismaProduct.update(data.product_id, {
                available: currentProduct.available - data.quantity
            })

            await prismaClient.update(data.client_id, {
                saldo: currentClient.saldo - data.value
            })

            const response: AdmResponses = { status_code: 200, msg: 'compra realizada com sucesso... ', body: currentTransaction }
            resolve(response);

        } catch (error: any) {
            reject({
                status_code: 500,
                body: error.message
            })
        }
    })

}