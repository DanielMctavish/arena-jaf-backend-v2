import PrismaEventRepositorie from "../../../repositories/PrismaRepositories/PrismaEventRepositorie";
import { EventResponse } from "../MainEvents";
import IArenaEvents from "../../../entities/IArenaEvents";


export const CreateEvent = async (data: IArenaEvents): Promise<EventResponse> => {
    const prismaEvent = new PrismaEventRepositorie()

    return new Promise(async (resolve, reject) => {
        try {
            if (!data) return reject({
                status_code: 400,
                body: { msg: "Dados inválidos" }
            })

            const event = await prismaEvent.create(data)
            
            resolve({
                status_code: 201,
                body: {
                    msg: "Evento criado com sucesso",
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