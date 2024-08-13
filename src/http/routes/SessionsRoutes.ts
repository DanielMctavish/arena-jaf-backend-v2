import { Router } from 'express'
//import multer from "multer"
import { ApplyUseCase } from '../middlewares/ApplyUseCase';
import { verifyToken } from '../../security/auth/JWT';
import mainSessions from '../../app/usecases/SESSIONS/MainSession';


const MainSessions = new mainSessions()
const router = Router();

router.get("/list-sessions", verifyToken, ApplyUseCase(MainSessions.listAllSessions))//in progress....

export default router;
