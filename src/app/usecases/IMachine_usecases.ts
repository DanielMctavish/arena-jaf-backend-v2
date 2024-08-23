import ISessions from "../entities/ISessions";
import { AdmResponses, params } from "./IUserAdm_usecases";


interface IMachine_usecases {
    Start(data: ISessions, params: params): Promise<AdmResponses>
    Stop(data: ISessions, params: params): Promise<AdmResponses>
    FindMachine(data: any, params: params): Promise<AdmResponses>
}

export default IMachine_usecases;