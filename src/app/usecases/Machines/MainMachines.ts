import IMachines from "../../entities/IMachines";
import ISessions from "../../entities/ISessions";
import IMachine_usecases from "../IMachine_usecases";
import { params, AdmResponses } from "../IUserAdm_usecases";
import findMachine from "./functions/findMachine";
import { startMachine } from "./functions/startMachine";
import { stopMachine } from "./functions/stopMachine";
import updateMachine from "./functions/updateMachine";


class MainMachines implements IMachine_usecases {

    async Start(data: ISessions, params: params): Promise<AdmResponses> {
        return await startMachine(data, params);
    }

    Stop(data: ISessions): Promise<AdmResponses> {
        console.log("stop step 1")
        return stopMachine(data)
    }
    FindMachine(data: any, params: params): Promise<AdmResponses> {
        return findMachine(params.machine_id)
    }
    UpdateMachine(data: Partial<IMachines>, params: params): Promise<AdmResponses> {
        return updateMachine(data, params)
    }
}

export default MainMachines;