import IArenaLocal from "../../entities/IArenaLocal";
import IMachines from "../../entities/IMachines";
import IProducts from "../../entities/IProducts";
import ISessions, { SESSION_STATUS } from "../../entities/ISessions";
import IUserClient from "../../entities/IUserClient";
import IUserAdm_usecases, { AdmResponses, params } from "../IUserAdm_usecases";

import { addCreditToClient } from "./functions/AddCreditToClient";
import { createArenaLocation } from "./functions/CreateArenaLocation";
import { createMachine } from "./functions/CreateMachine";
import { createNewClient } from "./functions/CreateNewClient";
import { login } from "./functions/Login";
import { logout } from "./functions/Logout";
import { createNewSession } from "./functions/CreateNewSession";
import { deleteArenaLocation } from "./functions/DeleteArenaLocation";
import { listAllClients } from "./functions/ListAllClients";
import { deleteClient } from "./functions/DeleteClient";
import { deleteMachine } from "./functions/DeleteMachine";
import { deleteNewProduct } from "../PRODUCTS/functions/DeleteNewProduct";
import { registerNewProduct } from "../PRODUCTS/functions/RegisterNewProduct";
import { updateClient } from "./functions/UpdateClient";
import { updateNewProduct } from "./functions/UpdateNewProduct";
import { updateArenaLocation } from "./functions/UpdateArenaLocation";
import ITransaction from "../../entities/ITransaction";
import IUserAdm from "../../entities/IUserAdm";
import createAdm from "./functions/CreateAdm";
import firebaseUploadAdmProfile from "./firebase/FirebaseUploadAdmProfile";
import { FilePhoto } from "../../../utils/Firebase/FirebaseOperations";
import firebaseDeleteAdmProfile from "./firebase/FirebaseDeleteAdmProfile";
import firebaseUploadProductCover from "../PRODUCTS/firebase/FirebaseUploadProductCover";
import firebaseDeleteProductCover from "../PRODUCTS/firebase/FirebaseDeleteProductCover";
import getAdminInfo from "./functions/GetAdminInfo";
import getAdminInfoByEmail from "./functions/GetAdminInfoByEmail";
import listAllMachines from "./functions/ListAllMachines";
import { listProductsByOwner } from "../PRODUCTS/functions/ListProductsByOwner";
import { updateAdministrator } from "./functions/UpdateAdministrator";
import { listAllAdmins } from "./functions/ListAllAdms";
import { listAllLocations } from "./functions/ListAllLocations";
import findSession from "./functions/FindSession";
import findLastSession from "./functions/FindLastSession";
import { addHourToClient } from "./functions/AddHourToClient";


class MainUserAdm implements IUserAdm_usecases {

    CreateAdm(data: IUserAdm): Promise<AdmResponses> {//revisado
        return createAdm(data)
    }

    GetAdminInfo(data: any, params: params): Promise<AdmResponses> {
        return getAdminInfo(params.adm_id)
    }

    GetAdminInfoByEmail(data: any, params: params): Promise<AdmResponses> {
        return getAdminInfoByEmail(params.email)
    }

    addCreditToClient(data: ITransaction): Promise<AdmResponses> {//revisado
        return addCreditToClient(data)
    }

    AddHourToClient(data: ITransaction, params: params): Promise<AdmResponses> {
        return addHourToClient(data, params.horas)
    }

    createArenaLocation(data: IArenaLocal): Promise<AdmResponses> {//revisado
        return createArenaLocation(data)
    }

    createMachine(data: IMachines): Promise<AdmResponses> {//revisado
        return createMachine(data)
    }

    createNewClient(data: IUserClient): Promise<AdmResponses> {//revisado
        return createNewClient(data)
    }

    login(data: Partial<IUserAdm>): Promise<AdmResponses> {//revisado
        return login(data)
    }

    logout(accessToken: string): Promise<AdmResponses> {
        return logout(accessToken)
    }

    //SESSIONS..............................................................................
    createNewSession(data: ISessions): Promise<AdmResponses> {//revisado
        return createNewSession(data)
    }

    findSession(data: any, params: params): Promise<AdmResponses> {
        return findSession(params.client_id)
    }

    findLastSession(data: any, params: params): Promise<AdmResponses> {
        return findLastSession(params.client_id)
    }

    deleteArenaLocation(data: any, params: params): Promise<AdmResponses> {//revisado
        return deleteArenaLocation(params.local_id)
    }

    listAllAdmins(data: any, params: params): Promise<AdmResponses> {
        return listAllAdmins(params.local_id)
    }

    listAllClients(data: any, params: params): Promise<AdmResponses> {//revisado
        return listAllClients(params.adm_id)
    }

    listAllMachines(data: any, params: params): Promise<AdmResponses> {
        return listAllMachines(params.adm_id)
    }

    listAllLocations(data: any, params: params): Promise<AdmResponses> {
        return listAllLocations(params.adm_id)
    }

    deleteClient(data: any, params: params): Promise<AdmResponses> {//revisado
        return deleteClient(params.client_id)
    }

    deleteMachine(data: any, params: params): Promise<AdmResponses> {//revisado
        return deleteMachine(params.machine_id)
    }

    deleteNewProduct(data: any, params: params): Promise<AdmResponses> {//revisado
        return deleteNewProduct(params.product_id)
    }

    //PRODUCTS
    registerNewProduct(data: IProducts): Promise<AdmResponses> {//revisado
        return registerNewProduct(data)
    }

    updateAdm(data: IUserAdm, params: params): Promise<AdmResponses> {
        return updateAdministrator(params.adm_id, data)
    }

    updateClient(data: IUserClient, params: params): Promise<AdmResponses> {//revisado
        return updateClient(params.client_id, data)
    }

    updateNewProduct(data: IProducts, params: params): Promise<AdmResponses> {//revisado
        return updateNewProduct(params.product_id, data)
    }

    listProducts(data: any, params: params): Promise<AdmResponses> {
        return listProductsByOwner(params.owner_id)
    }

    updateArenaLocation(data: IArenaLocal, params: params): Promise<AdmResponses> {//revisado
        return updateArenaLocation(params.local_id, data)
    }

    pauseSession(session_status: SESSION_STATUS): void {

    }

    resumeSession(session_status: SESSION_STATUS): void {

    }
    uploadAdminProfile(data: any, params: params, File: FilePhoto): Promise<AdmResponses> {
        return firebaseUploadAdmProfile(params.adm_id, File)
    }
    deleteAdminProfile(data: any, params: params): Promise<AdmResponses> {
        return firebaseDeleteAdmProfile(params)
    }
    uploadProductCoverImg(data: any, params: params, File: FilePhoto): Promise<AdmResponses> {
        return firebaseUploadProductCover(File)
    }
    deleteProductCoverImg(data: any, params: params): Promise<AdmResponses> {
        return firebaseDeleteProductCover(params)
    }
}

export default MainUserAdm