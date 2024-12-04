import PrismaEventRepositorie from "../../../repositories/PrismaRepositories/PrismaEventRepositorie";
import { EventResponse } from "../MainEvents";

export const ListEvents = async (local_id: string): Promise<EventResponse> => {
    const prismaEvent = new PrismaEventRepositorie()

    return new Promise(async (resolve, reject) => {
        try {
            if (!local_id) return reject({
                status_code: 400,
                body: { msg: "ID do local é obrigatório" }
            })

            const events = await prismaEvent.listAll(local_id)

            resolve({
                status_code: 200,
                body: {
                    events,
                    msg: "Eventos encontrados com sucesso"
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