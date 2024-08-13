import { AdmResponses } from "../../IUserAdm_usecases"
import PrismaSessionRepositorie from "../../../repositories/PrismaRepositories/PrismaSessionRepositorie"

const prismaSession = new PrismaSessionRepositorie()

const findLastSession = (client_id: string): Promise<AdmResponses> => {

    return new Promise(async (resolve, reject) => {

        try {

            const currentSession = await prismaSession.findLastSession(client_id)

            if (!currentSession) {
                return reject({
                    status_code: 404,
                    body:{
                        msg: "session not found"
                    }
                })
            }
            return resolve({
                status_code: 200,
                msg: "session founded successfully",
                body: currentSession
            })

        } catch (error: any) {

            return reject({
                status_code: 500,
                body: {
                    msg: error.message
                }
            })

        }

    })

}

export default findLastSession;