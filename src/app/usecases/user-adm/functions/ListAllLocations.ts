import { AdmResponses } from "../../IUserAdm_usecases";
import PrismaLocalRepositorie from "../../../repositories/PrismaRepositories/PrismaLocalRepositorie";

const prismaLocal = new PrismaLocalRepositorie()

export const listAllLocations = (adm_id: string): Promise<AdmResponses> => {

    return new Promise(async (resolve, reject) => {
        try {

            const localList = await prismaLocal.list(adm_id)
            const response: AdmResponses = { status_code: 200, msg: 'lista de todos os locais', body: localList }
            resolve(response);

        } catch (error) {
            reject({
                status_code: 500,
                msg: "Erro no servidor"
            })
        }
    })

}