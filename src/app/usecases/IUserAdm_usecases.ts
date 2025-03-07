import { FilePhoto } from "../../utils/Firebase/FirebaseOperations"
import IArenaLocal from "../entities/IArenaLocal"
import IMachines from "../entities/IMachines"
import IProducts from "../entities/IProducts"
import ISessions, { SESSION_STATUS } from "../entities/ISessions"
import ITransaction from "../entities/ITransaction"
import IUserAdm from "../entities/IUserAdm"
import IUserClient from "../entities/IUserClient"

export interface AdmResponses {
    status_code: number,
    msg?: string,
    body?: Object | null
}

export interface params {
    horas: string
    adm_id: string
    email: string
    machine_id: string
    client_id: string
    product_id: string
    local_id: string
    owner_id: string
    url_image: string
    startDate: string
    endDate: string
}

interface IUserAdm_usecases {
    login(data: Partial<IUserAdm>): Promise<AdmResponses>
    logout(accessToken: string): Promise<AdmResponses>

    CreateAdm(data: IUserAdm): Promise<AdmResponses>
    GetAdminInfo(data: any, params: params): Promise<AdmResponses>
    addCreditToClient(data: ITransaction): Promise<AdmResponses>
    AddHourToClient(data: ITransaction, params: params): Promise<AdmResponses>
    GetAdminInfoByEmail(data: any, params: params): Promise<AdmResponses>

    createMachine(data: IMachines): Promise<AdmResponses>
    deleteMachine(data: any, params: params): Promise<AdmResponses>

    //SESSIONS................................................................
    createNewSession(data: ISessions): Promise<AdmResponses>
    findSession(data: any, params: params): Promise<AdmResponses>
    findLastSession(data: any, params: params): Promise<AdmResponses>
    pauseSession(session_status: SESSION_STATUS): void
    resumeSession(session_status: SESSION_STATUS): void

    createNewClient(data: IUserClient): Promise<AdmResponses>
    updateAdm(data: IUserAdm, params: params): Promise<AdmResponses>
    updateClient(data: IUserClient, params: params): Promise<AdmResponses>
    deleteClient(data: any, params: params): Promise<AdmResponses>

    //Listagens ..................................................................
    listAllClients(data: any, params: params): Promise<AdmResponses>
    listAllMachines(data: any, params: params): Promise<AdmResponses>
    listAllLocations(data: any, params: params): Promise<AdmResponses>

    addCreditToClient(data: ITransaction): Promise<AdmResponses>

    createArenaLocation(data: IArenaLocal): Promise<AdmResponses>
    updateArenaLocation(data: IArenaLocal, params: params): Promise<AdmResponses>
    deleteArenaLocation(data: any, params: params): Promise<AdmResponses>

    // FIREBASE
    uploadAdminProfile(data: any, params: params, File: FilePhoto): Promise<AdmResponses>
    deleteAdminProfile(data: any, params: params, File: FilePhoto): Promise<AdmResponses>
}

export default IUserAdm_usecases