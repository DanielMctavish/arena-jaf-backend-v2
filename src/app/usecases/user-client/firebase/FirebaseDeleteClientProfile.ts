import IClientResponses from "../../../../http/res/IClientResponses"
import { deleteSingleImage } from "../../../../utils/Firebase/FirebaseOperations"

const firebaseDeleteClientProfile = (url_image: string): Promise<IClientResponses> => {

    return new Promise(async (resolve, reject) => {

        try {
            if (!url_image) return reject({ status_code: 500, body: "parâmetro url é necessário!" })
            
            try {
                await deleteSingleImage(url_image)
                resolve({ status_code: 200, body: { message: "Imagem deletada com sucesso" } })
            } catch (firebaseError: any) {
                // Se o erro for "No such object", significa que a imagem já não existe
                // Neste caso, podemos considerar como sucesso
                if (firebaseError.message.includes("No such object")) {
                    resolve({ status_code: 200, body: { message: "Imagem já não existe no storage" } })
                } else {
                    // Se for outro tipo de erro, rejeitamos a promise
                    reject({ status_code: 500, body: firebaseError.message })
                }
            }

        } catch (error: any) {
            reject({ status_code: 500, body: error.message })
        }

    })

}

export default firebaseDeleteClientProfile;