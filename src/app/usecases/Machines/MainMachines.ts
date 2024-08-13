import ISessions from "../../entities/ISessions";
import IMachine_usecases from "../IMachine_usecases";
import { params, AdmResponses } from "../IUserAdm_usecases";
import { startMachine } from "./functions/startMachine";
import { stopMachine } from "./functions/stopMachine";


class MainMachines implements IMachine_usecases {

    async Start(data: ISessions, params: params): Promise<AdmResponses> {
        return await startMachine(data, params);
    }

    Stop(data: ISessions): Promise<AdmResponses> {
        return stopMachine(data)
    }
}

export default MainMachines;