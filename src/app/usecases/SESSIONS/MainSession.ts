import ISessionsUsecases from "../ISessionsUsecases";
import { params, AdmResponses } from "../IUserAdm_usecases";
import { ListAllSessions } from "./functions/ListAllSessions";


class mainSessions implements ISessionsUsecases {

    listAllSessions(data: any, params: params): Promise<AdmResponses> {
        return ListAllSessions(params.adm_id)
    }

}


export default mainSessions;