import IArenaEvents from "../../../entities/IArenaEvents";
import PrismaEventRepositorie from "../../../repositories/PrismaRepositories/PrismaEventRepositorie";
import { EventResponse } from "../MainEvents";

export const UpdateEvent = async (event_id: string, data: Partial<IArenaEvents>): Promise<EventResponse> => {
    const prismaEvent = new PrismaEventRepositorie()

    return new Promise(async (resolve, reject) => {
        try {
            if (!event_id) return reject({
                status_code: 400,
                body: { msg: "ID do evento é obrigatório" }
            })

            const event = await prismaEvent.update(event_id, data)

            resolve({
                status_code: 200,
                body: {
                    msg: "Evento atualizado com sucesso",
                    event
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