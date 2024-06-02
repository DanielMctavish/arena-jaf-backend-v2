import IUserAdm from "../../../entities/IUserAdm";
import { AdmResponses } from "../../IUserAdm_usecases";
import PrismaUserAdmRepositorie from "../../../repositories/PrismaRepositories/PrismaUserAdmRepositorie";
import * as bcrypt from "bcrypt"


export const updateAdministrator = async (adm_id: string, data: IUserAdm): Promise<AdmResponses> => {
    const prismaAdm = new PrismaUserAdmRepositorie()

    console.log('observando data -> ', data);


    return new Promise(async (resolve, reject) => {
        try {

            if (!data) {
                return reject({
                    status_code: 403,
                    msg: "data nulo ou inválido"
                })
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data.senha, salt)

            const currentAdm = await prismaAdm.update(adm_id, { ...data, senha: hash });
            const response: AdmResponses = { status_code: 200, msg: 'administrador atualizado com sucesso', body: currentAdm };
            resolve(response);

        } catch (error: any) {

            console.log('erro >> ', error);
            

            reject({
                status_code: 500,
                msg: error
            })
        }
    })

}