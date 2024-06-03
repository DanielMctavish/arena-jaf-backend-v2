import { Router } from 'express'
//import multer from "multer"
import { ApplyUseCase } from '../middlewares/ApplyUseCase';
import { verifyToken } from '../../security/auth/JWT';
import mainTransactions from '../../app/usecases/TRANSACTIONS/MainTransactions';

const main = new mainTransactions()
const router = Router();

router.get("/list-transactions", verifyToken, ApplyUseCase(main.listAllTransactions))//in progress....


export default router;
