import { PrismaClient } from "@prisma/client";
import IMachineRepositorie from "../IMachineRepositorie";
import IMachines from "../../entities/IMachines";

const prisma = new PrismaClient();

class PrismaMachineRepositorie implements IMachineRepositorie {
    async create(data: IMachines): Promise<IMachines> {
        const { userAdmId, userColabId, arenaLocalId, sessions, ...restData } = data;


        const currentMachine = await prisma.machines.create({
            data: {
                ...restData,
                UserAdm: {
                    connect: {
                        id: userAdmId
                    }
                },
                local: {
                    connect: {
                        id: arenaLocalId
                    }
                }
            }
        });

        return currentMachine as IMachines;
    }


    async find(machine_id: string): Promise<IMachines | null> {
        const currentMachine = await prisma.machines.findFirst({
            where: {
                id: machine_id
            }, include: {
                sessions: true
            }
        });
        return currentMachine as IMachines;
    }

    async list(adm_id: string): Promise<IMachines[]> {

        const currentMachine = await prisma.machines.findMany({
            where: {
                userAdmId: adm_id
            }, include: {
                sessions: true
            },
            orderBy: {
                created_at: 'asc'
            }
        });

        return currentMachine as IMachines[];
    }



    async update(machine_id: string, data: Partial<IMachines>): Promise<IMachines> {

        const currentMachine = await prisma.machines.update({
            where: { id: machine_id },
            data: {
                arenaLocalId: data.arenaLocalId,
                userAdmId: data.userAdmId,
                userColabId: data.userColabId,
                status: data.status
            }
        });

        return currentMachine as IMachines
    }

    async delete(machine_id: string): Promise<IMachines> {
        // Deleta os registros na tabela Sessions que referenciam a máquina
        await prisma.sessions.deleteMany({
            where: {
                machine_id: machine_id,
            },
        });

        // Agora que as dependências foram removidas, delete a máquina
        const currentMachine = await prisma.machines.delete({
            where: { id: machine_id },
        });

        return currentMachine as IMachines;
    }
}

export default PrismaMachineRepositorie;
