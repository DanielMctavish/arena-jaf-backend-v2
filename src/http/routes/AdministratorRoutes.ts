import { Router } from 'express'
import multer from "multer"
const router = Router()
import { verifyToken } from '../../security/auth/JWT'
import { ApplyUseCase } from '../middlewares/ApplyUseCase'
import MainUserAdm from '../../app/usecases/user-adm/MainUserAdm'

const mainAdm = new MainUserAdm()
const upload = multer()

router.post("/create-account", ApplyUseCase(mainAdm.CreateAdm))//testado doc
router.post("/add-credit", verifyToken, ApplyUseCase(mainAdm.addCreditToClient))//testado doc
router.post("/create-local", verifyToken, ApplyUseCase(mainAdm.createArenaLocation))//testado doc
router.post("/create-machine", verifyToken, ApplyUseCase(mainAdm.createMachine))//testado doc
router.post("/create-client", verifyToken, ApplyUseCase(mainAdm.createNewClient))//
router.post("/create-session", verifyToken, ApplyUseCase(mainAdm.createNewSession))//

//Remoções.................................................................................................
router.delete("/delete-client", verifyToken, ApplyUseCase(mainAdm.deleteClient))//
router.delete("/delete-machine", verifyToken, ApplyUseCase(mainAdm.deleteMachine))//testing...
router.delete("/delete-product", verifyToken, ApplyUseCase(mainAdm.deleteNewProduct))//

//Listagens................................................................................................
router.get("/all-clients", verifyToken, ApplyUseCase(mainAdm.listAllClients))//
router.get("/all-machines", verifyToken, ApplyUseCase(mainAdm.listAllMachines))// worked
router.get("/all-admins", verifyToken, ApplyUseCase(mainAdm.listAllAdmins)) //worked
router.get("/all-locations", verifyToken, ApplyUseCase(mainAdm.listAllLocations))// worked
router.get("/find-session", verifyToken, ApplyUseCase(mainAdm.findSession))// in development
router.get("/find-last-session", verifyToken, ApplyUseCase(mainAdm.findLastSession))// in development

//Updates................................................................................................
router.patch("/update-administrator", verifyToken, ApplyUseCase(mainAdm.updateAdm))
router.patch("/update-local", verifyToken, ApplyUseCase(mainAdm.updateArenaLocation))//
router.patch("/update-client", verifyToken, ApplyUseCase(mainAdm.updateClient))//
router.patch("/update-product", verifyToken, ApplyUseCase(mainAdm.updateNewProduct))//

router.get("/admin-info", verifyToken, ApplyUseCase(mainAdm.GetAdminInfo))//testado doc
router.get("/admin-info-email", verifyToken, ApplyUseCase(mainAdm.GetAdminInfoByEmail))//testado doc

//ACCESS........................................................
router.post("/login", ApplyUseCase(mainAdm.login))//testado
router.post("/logout", verifyToken)
//FIREBASE......................................................
router.post("/upload-admin-profile", upload.single('arena-adm-profile'), ApplyUseCase(mainAdm.uploadAdminProfile))
router.delete("/delete-admin-profile", ApplyUseCase(mainAdm.deleteAdminProfile))


export default router;