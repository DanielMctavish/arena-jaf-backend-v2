import ITransactions_usecases from "../ITransactions_usecases";
import { params, AdmResponses } from "../IUserAdm_usecases";
import { ListAllTransactions } from "./functions/ListAllTransactions";
import { ResumeBalance } from "./functions/ResumeBalance";
import { ResumeBalanceInRange } from "./functions/ResumeBalanceInRange";

class mainTransactions implements ITransactions_usecases {

    listAllTransactions(data: any, params: params): Promise<AdmResponses> {
        console.log("dentro da classe, params -> ", params)
        return ListAllTransactions(params.adm_id)
    }
    resumeBalance(data: any, params: params): Promise<AdmResponses> {
        return ResumeBalance(params.adm_id)
    }

    resumeBalanceInRange(data: any, params: params): Promise<AdmResponses> {
        return ResumeBalanceInRange(params.adm_id, params.startDate, params.endDate)
    }

}


export default mainTransactions;