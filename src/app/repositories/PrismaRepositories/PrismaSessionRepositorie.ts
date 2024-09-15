import { PrismaClient } from "@prisma/client";
import ISessions from "../../entities/ISessions";
import ISessionRepositorie from "../ISessionRepositorie";

const prisma = new PrismaClient()

class PrismaSessionRepositorie implements ISessionRepositorie {

    async create(data: ISessions): Promise<ISessions> {

        const { local_id, adm_id, client_id, machine_id, ...restData } = data

        const currentSession = await prisma.sessions.create({
            data: {
                ...restData,
                Client: {
                    connect: {
                        id: client_id
                    }
                },
                UserAdm: {
                    connect: {
                        id: adm_id
                    }
                },
                location: {
                    connect: {
                        id: local_id
                    }
                },
                Machine: {
                    connect: {
                        id: machine_id
                    }
                }
            }
        })

        return currentSession as ISessions;
    }

    async find(client_id: string): Promise<ISessions | null> {

        const currentSession = await prisma.sessions.findFirst({
            where: {
                client_id: client_id
            }, include: {
                Machine: true
            }
        })

        return currentSession as ISessions;
    }

    async findAll(client_id: string): Promise<ISessions[]> {

        const currentSession = await prisma.sessions.findMany({
            where: {
                client_id: client_id
            }
        })

        return currentSession as ISessions[];
    }

    async findLastSession(client_id: string): Promise<ISessions> {

        const currentSession = await prisma.sessions.findMany({
            where: {
                client_id: client_id
            },
            include: {
                Machine: true
            },
            orderBy: {
                created_at: 'desc'
            },
            take: 1
        });

        // Retorna a primeira (e única) sessão da lista
        return currentSession[0] as ISessions;
    }

    async listAllSessions(adm_id: string): Promise<ISessions[]> {

        const currentSession = await prisma.sessions.findMany({
            where: {
                adm_id: adm_id
            },
            include: {
                Machine: true,
                Client: true,
                location: true
            },
            orderBy: {
                created_at: 'desc'
            },
        });

        return currentSession as ISessions[];
    }

    async update(session_id: string, data: Partial<ISessions>): Promise<ISessions> {

        const { duration, products, status } = data

        const currentSession = await prisma.sessions.update({
            where: { id: session_id },
            data: {
                duration,
                products,
                status,
            }
        })

        return currentSession as ISessions;
    }

    async delete(session_id: string): Promise<ISessions> {

        const currentSession = await prisma.sessions.delete({
            where: { id: session_id }
        })

        return currentSession as ISessions;
    }
}

export default PrismaSessionRepositorie;