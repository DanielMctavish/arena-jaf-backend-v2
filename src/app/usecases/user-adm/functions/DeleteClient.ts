import { AdmResponses } from "../../IUserAdm_usecases";
import PrismaUserClientRepositorie from "../../../repositories/PrismaRepositories/PrismaUserClientRepositorie";
import firebaseDeleteClientProfile from "../../user-client/firebase/FirebaseDeleteClientProfile";

export const deleteClient = (client_id: string): Promise<AdmResponses> => {
    const UserClientRepositorie = new PrismaUserClientRepositorie()

    console.log("client_id", client_id)

    return new Promise(async (resolve, reject) => {
        try {
            if (!client_id) {
                return reject({
                    status_code: 403,
                    msg: "client_id nulo ou inválido"
                })
            }

            // Buscar o cliente primeiro para obter o avatar_url
            const client = await UserClientRepositorie.find(client_id);
            
            // Se o cliente tiver um avatar_url, tentar deletar a imagem do Firebase
            if (client?.avatar_url) {
                try {
                    await firebaseDeleteClientProfile(client.avatar_url);
                } catch (imageError) {
                    console.log("Aviso: Erro ao deletar imagem do cliente:", imageError);
                    // Continua a execução mesmo se houver erro ao deletar a imagem
                }
            }

            const currentClient = await UserClientRepositorie.delete(client_id)

            const response: AdmResponses = { 
                status_code: 200, 
                msg: 'cliente deletado com sucesso', 
                body: currentClient 
            }
            resolve(response);

        } catch (error) {
            console.log("erro ao deletar cliente", error)
            reject({
                status_code: 500,
                msg: "Erro no servidor"
            })
        }
    })
}