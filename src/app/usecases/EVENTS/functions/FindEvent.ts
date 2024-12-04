import PrismaEventRepositorie from "../../../repositories/PrismaRepositories/PrismaEventRepositorie";
import { EventResponse } from "../MainEvents";

export const FindEvent = async (event_id: string): Promise<EventResponse> => {
    const prismaEvent = new PrismaEventRepositorie()

    return new Promise(async (resolve, reject) => {
        try {
            if (!event_id) return reject({
                status_code: 400,
                body: { msg: "ID do evento é obrigatório" }
            })

            const event = await prismaEvent.find(event_id)
            
            if (!event) return reject({
                status_code: 404,
                body: { msg: "Evento não encontrado" }
            })

            resolve({
                status_code: 200,
                body: {
                    event,
                    msg: "Evento encontrado com sucesso"
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