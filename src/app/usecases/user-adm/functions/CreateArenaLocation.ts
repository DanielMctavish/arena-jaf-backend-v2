import IArenaLocal from "../../../entities/IArenaLocal";
import { AdmResponses } from "../../IUserAdm_usecases";
import PrismaLocalRepositorie from "../../../repositories/PrismaRepositories/PrismaLocalRepositorie";
//import validator from "../../../../security/validations/Joi";
//import { arenaLocalSchema } from "../../../../security/validations/schemmas-joi/ArenaLocalSchemma";

const LocalRepositorie = new PrismaLocalRepositorie()

export const createArenaLocation = (data: IArenaLocal): Promise<AdmResponses> => {

    return new Promise(async (resolve, reject) => {
        if (!data) {
            return reject({
                status_code: 403,
                msg: "Dados inválidos"
            })
        }

        try {

            const currentLocal = await LocalRepositorie.create(data)
            const response: AdmResponses = { status_code: 200, msg: 'local criado com sucesso', body: currentLocal }
            resolve(response);

        } catch (error) {
            console.log("data informations -> ", data)
            console.log("error local -> ", error)
            reject({
                status_code: 500,
                msg: "Erro no servidor"
            })

        }

    })
}