import PrismaEventRepositorie from "../../../repositories/PrismaRepositories/PrismaEventRepositorie";
import { EventResponse } from "../MainEvents";

export const DeleteEvent = async (event_id: string): Promise<EventResponse> => {
    const prismaEvent = new PrismaEventRepositorie()

    return new Promise(async (resolve, reject) => {
        try {
            if (!event_id) return reject({
                status_code: 400,
                body: { msg: "ID do evento é obrigatório" }
            })

            await prismaEvent.delete(event_id)

            resolve({
                status_code: 200,
                body: {
                    msg: "Evento deletado com sucesso"
                }
            })

        } catch (error: any) {
            return reject({
                status_code: 500,
                body: { msg: error.message }
            })
        }
    })
}