import IArenaEvents from "../entities/IArenaEvents"


interface IEventRepositorie {
    create(data: IArenaEvents): Promise<IArenaEvents>
    find(event_id: string): Promise<IArenaEvents | null>
    listAll(local_id: string): Promise<IArenaEvents[]>
    update(event_id: string, data: Partial<IArenaEvents>): Promise<IArenaEvents>
    delete(event_id: string): Promise<IArenaEvents>
}

export default IEventRepositorie 