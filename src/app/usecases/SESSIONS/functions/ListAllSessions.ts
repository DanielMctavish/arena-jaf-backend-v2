import PrismaSessionRepositorie from "../../../repositories/PrismaRepositories/PrismaSessionRepositorie";
import { AdmResponses } from "../../IUserAdm_usecases";

export const ListAllSessions = async (adm_id: string): Promise<AdmResponses> => {
    const prismaSession = new PrismaSessionRepositorie()

    return new Promise(async (resolve, reject) => {

        try {

            if (!adm_id) return reject({
                status_code: 400,
                body: "adm_id is required"
            })

            const allSessions = await prismaSession.listAllSessions(adm_id)
            const response: AdmResponses = { status_code: 200, msg: "founded", body: allSessions }

            resolve(response);

        } catch (error: any) {
            return reject({ status_code: 500, body: { msg: error.message } })
        }

    })

}