import { PrismaClient } from "@prisma/client";
import IArenaEvents from "../../entities/IArenaEvents";
import IEventRepositorie from "../IEventRepositorie";

const prisma = new PrismaClient()

class PrismaEventRepositorie implements IEventRepositorie {

    async create(data: IArenaEvents): Promise<IArenaEvents> {
        try {
            const result = await prisma.arenaEvents.create({
                data: {
                    ...data
                },
                include: {
                    local: true
                }
            });
            
            return {
                ...result,
                Local: result.local
            } as IArenaEvents;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async find(event_id: string): Promise<IArenaEvents | null> {
        try {
            const result = await prisma.arenaEvents.findUnique({
                where: {
                    id: event_id
                },
                include: {
                    local: true
                }
            });

            if (!result) return null;

            return {
                ...result,
                Local: result.local
            } as IArenaEvents;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async listAll(local_id: string): Promise<IArenaEvents[]> {
        try {
            const results = await prisma.arenaEvents.findMany({
                where: {
                    localId: local_id
                },
                include: {
                    local: true
                },
                orderBy: {
                    created_at: 'desc'
                }
            });

            return results.map(result => ({
                ...result,
                Local: result.local
            })) as IArenaEvents[];
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async update(event_id: string, data: Partial<IArenaEvents>): Promise<IArenaEvents> {
        try {
            const result = await prisma.arenaEvents.update({
                where: {
                    id: event_id
                },
                data: {
                    ...data
                },
                include: {
                    local: true
                }
            });

            return {
                ...result,
                Local: result.local
            } as IArenaEvents;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async delete(event_id: string): Promise<IArenaEvents> {
        try {
            const result = await prisma.arenaEvents.delete({
                where: {
                    id: event_id
                },
                include: {
                    local: true
                }
            });

            return {
                ...result,
                Local: result.local
            } as IArenaEvents;
        } catch (error) {
            throw new Error(error as string);
        }
    }

}

export default PrismaEventRepositorie; 