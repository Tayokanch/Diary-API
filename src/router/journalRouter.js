import express from 'express'
import { createJournalController, getJournalsController, updateJournalontroller, deleteJournalController} from '../controller/journalController.js'
import { generalAuth } from '../middleware/auth.js';


const router = express.Router();
router.post('/user/create-journal', generalAuth, createJournalController);
router.get('/user/get-journal', generalAuth, getJournalsController);
router.put('/user/update-journal', generalAuth, updateJournalontroller )
router.delete('/user/delete-journal/:journalID', generalAuth, deleteJournalController);

export default router