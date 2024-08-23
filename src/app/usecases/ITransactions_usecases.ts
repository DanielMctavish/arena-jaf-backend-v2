import { AdmResponses, params } from "./IUserAdm_usecases";


interface ITransactions_usecases {
    listAllTransactions(data: any, params: params): Promise<AdmResponses>
    resumeBalance(data: any, params: params): Promise<AdmResponses>
    resumeBalanceInRange(data: any, params: params): Promise<AdmResponses>
}


export default ITransactions_usecases;