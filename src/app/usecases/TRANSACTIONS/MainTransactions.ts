import ITransactions_usecases from "../ITransactions_usecases";
import { params, AdmResponses } from "../IUserAdm_usecases";
import { ListAllTransactions } from "./functions/ListAllTransactions";

class mainTransactions implements ITransactions_usecases {

    listAllTransactions(data: any, params: params): Promise<AdmResponses> {
        return ListAllTransactions(params.adm_id)
    }

}


export default mainTransactions;