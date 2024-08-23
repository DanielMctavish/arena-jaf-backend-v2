import { Router } from "express"
import { verifyToken } from "../../security/auth/JWT"
import { ApplyUseCase } from "../middlewares/ApplyUseCase"
import MainMachines from "../../app/usecases/Machines/MainMachines"

const router = Router()
const mainMachine = new MainMachines()

router.post('/start-machine', verifyToken, ApplyUseCase(mainMachine.Start))
router.post('/stop-machine', verifyToken, ApplyUseCase(mainMachine.Stop))
router.get("/find-machine", verifyToken, ApplyUseCase(mainMachine.FindMachine))

export default router;