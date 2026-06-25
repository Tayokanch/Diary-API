import express from 'express';
import { createMyDiary, accessMyDiary} from '../controller/diaryController.js';

const router = express.Router();
router.post('/user/create-diary', createMyDiary);
router.post('/user/access-diary', accessMyDiary )

export default router