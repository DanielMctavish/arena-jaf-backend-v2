import ISessions from "../entities/ISessions"

interface ISessionRepositorie {

    create(data: ISessions): Promise<ISessions>
    find(client_id: string): Promise<ISessions | null>
    findAll(client_id: string): Promise<ISessions[]>
    update(session_id: string, data: Partial<ISessions>): Promise<ISessions>
    delete(session_id: string): Promise<ISessions>

    //list
    listAllSessions(adm_id:string): Promise<ISessions[]>

}

export default ISessionRepositorie