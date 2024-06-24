import { AdmResponses } from "../../IUserAdm_usecases";
import PrismaUserAdmRepositorie from "../../../repositories/PrismaRepositories/PrismaUserAdmRepositorie";

export const listAllAdmins = (local_id: string): Promise<AdmResponses> => {
    const prismaAdm = new PrismaUserAdmRepositorie()

    return new Promise(async (resolve, reject) => {
        try {

            const allAdms = await prismaAdm.list()
            const response: AdmResponses = { status_code: 200, msg: 'lista de todos os adms', body: allAdms }
            resolve(response);

        } catch (error) {
            reject({
                status_code: 500,
                msg: "Erro no servidor"
            })
        }
    })

}