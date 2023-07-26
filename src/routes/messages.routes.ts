import { Router } from "express";
import messagesController from '../controllers/messages.controller';

const router = Router();

router.get('/messages/:id', messagesController.getMessage);
router.get('/messages', messagesController.getMessages);

export default router;