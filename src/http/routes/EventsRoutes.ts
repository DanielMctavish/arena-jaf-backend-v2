import { Router } from 'express'
import { ApplyUseCase } from '../middlewares/ApplyUseCase';
import { verifyToken } from '../../security/auth/JWT';
import MainEvents from '../../app/usecases/EVENTS/MainEvents';

const mainEvents = new MainEvents()
const router = Router();

router.post("/create-event", verifyToken, ApplyUseCase(mainEvents.createEvent))
router.get("/find-event", verifyToken, ApplyUseCase(mainEvents.findEvent))
router.get("/list-events", verifyToken, ApplyUseCase(mainEvents.listEvents))
router.patch("/update-event", verifyToken, ApplyUseCase(mainEvents.updateEvent))
router.delete("/delete-event", verifyToken, ApplyUseCase(mainEvents.deleteEvent))

export default router; 