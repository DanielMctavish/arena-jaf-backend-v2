import { AdmResponses, params } from "./IUserAdm_usecases";


interface ISessionsUsecases {
    listAllSessions(data: any, params: params): Promise<AdmResponses>
}


export default ISessionsUsecases;