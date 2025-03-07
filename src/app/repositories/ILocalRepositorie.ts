import IArenaLocal from "../entities/IArenaLocal"


interface ILocalRepositorie {
    create(data: IArenaLocal): Promise<IArenaLocal>
    find(local_id: string): Promise<IArenaLocal | null>
    list(adm_id: string): Promise<Partial<IArenaLocal[]>>
    update(local_id: string, data: IArenaLocal): Promise<IArenaLocal>
    delete(local_id: string): Promise<IArenaLocal>
}

export default ILocalRepositorie