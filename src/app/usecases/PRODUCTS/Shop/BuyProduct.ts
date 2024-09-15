import { AdmResponses } from "../../IUserAdm_usecases";
import PrismaProductRepositorie from "../../../repositories/PrismaRepositories/PrismaProductRepositorie";
import PrismaUserClientRepositorie from "../../../repositories/PrismaRepositories/PrismaUserClientRepositorie";
import PrismaTransactionRepositorie from "../../../repositories/PrismaRepositories/PrismaTransactionRepositorie";
import PrismaUserAdmRepositorie from "../../../repositories/PrismaRepositories/PrismaUserAdmRepositorie"; // Import Admin repository
import { IBuyProduct } from "../../IProduct_usecases";
import ITransaction from "../../../entities/ITransaction";

export const buyProduct = (data: IBuyProduct): Promise<AdmResponses> => {
    const prismaProduct = new PrismaProductRepositorie();
    const prismaClient = new PrismaUserClientRepositorie();
    const prismaTransaction = new PrismaTransactionRepositorie();
    const prismaAdmin = new PrismaUserAdmRepositorie(); // Initialize Admin repository

    return new Promise(async (resolve, reject) => {
        try {
            const currentProduct = await prismaProduct.find(data.product_id);
            const currentClient = await prismaClient.find(data.client_id);
            
            // Check if currentProduct is null before accessing its properties
            if (!currentProduct) {
                return reject({ status_code: 404, body: { msg: 'product not found' } });
            }

            const currentAdmin = await prismaAdmin.find(currentProduct.owner_id); // Find Admin

            if (!currentClient || !currentAdmin) {
                return reject({ status_code: 404, body: { msg: 'client or admin not found' } });
            }

            // Verifique se o produto está disponível em quantidade suficiente
            if (currentProduct.available < data.quantity) {
                return reject({ status_code: 400, body: { msg: 'insufficient product quantity' } });
            }

            const transactionData: ITransaction = {
                method: data.method,
                value: data.value,
                transaction_type: 'PRODUCT',
                fluxo: 'IN', // Money is coming in for the admin
                status: 'APPROVED',
                userClientId: data.client_id,
                userAdmId: currentProduct.owner_id
            };

            const currentTransaction = await prismaTransaction.create(transactionData);

            await prismaProduct.update(data.product_id, {
                available: currentProduct.available - data.quantity
            });

            await prismaClient.update(data.client_id, {
                saldo: currentClient.saldo - data.value
            });

            await prismaAdmin.update(currentProduct.owner_id, {
                saldo: currentAdmin.saldo + data.value // Increment admin's balance
            });

            const response: AdmResponses = { status_code: 200, msg: 'compra realizada com sucesso... ', body: currentTransaction };
            resolve(response);

        } catch (error: any) {
            reject({
                status_code: 500,
                body: error.message
            });
        }
    });
};