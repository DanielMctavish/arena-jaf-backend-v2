import { PrismaClient } from "@prisma/client";
import IUserAdmRepositorie from "../IUserAdmRepositorie";
import IUserAdm from "../../entities/IUserAdm";

const prisma = new PrismaClient();

class PrismaUserAdmRepositorie implements IUserAdmRepositorie {
    async create(data: IUserAdm): Promise<IUserAdm> {
        const currentAdm = await prisma.userAdm.create({
            data
        })

        return currentAdm as IUserAdm
    }

    async find(adm_id: string): Promise<IUserAdm | null> {
        return await prisma.userAdm.findFirst({
            where: {
                id: adm_id
            }
        }) as IUserAdm | null;
    }

    async findByEmail(email: string): Promise<IUserAdm | null> {

        const currentAdm = await prisma.userAdm.findUnique({
            where: { email },
            include: {
                ArenaLocal: {
                    include: {
                        Machines: true
                    }
                },
                Machines: true
            }
        })

        return currentAdm as IUserAdm
    }

    async list(local_id?: string): Promise<IUserAdm[]> {

        const allAdms = await prisma.userAdm.findMany({
            orderBy: {
                created_at: 'asc',
            }
        })

        return allAdms as IUserAdm[];

    }

    async update(adm_id: string, data: Partial<IUserAdm>): Promise<IUserAdm> {
        return await prisma.userAdm.update({
            where: { id: adm_id },
            data
        }) as IUserAdm;
    }

    async delete(adm_id: string): Promise<IUserAdm> {
        const currentAdm = await prisma.userAdm.delete({
            where: { id: adm_id }
        })

        return currentAdm as IUserAdm
    }
}

export default PrismaUserAdmRepositorie;
