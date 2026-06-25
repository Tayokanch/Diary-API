import express from 'express'
import { createJournalController, getJournalsController, updateJournalontroller, deleteJournalController} from '../controller/journalController.js'
import { generalAuth } from '../middleware/auth.js';


const router = express.Router();
router.post('/create-journal', generalAuth, createJournalController);
router.get('/get-journal', generalAuth, getJournalsController);
router.put('/update-journal', generalAuth, updateJournalontroller )
router.delete('/delete-journal/:journalID', generalAuth, deleteJournalController);

export default router