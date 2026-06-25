import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createDiary, getDiary } from '../db/queries/diary.js';
import dotenv from "dotenv";
dotenv.config();

export const createMyDiary = async (req, res) => {
  try {
    const { diaryName, email, password } = req.body;

    if (!diaryName || !email || !password) {
      return res.status(400).json({
        error: 'diaryName, email, and password are required',
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await createDiary(diaryName, email, passwordHash);

    res.status(201).json({
      message: 'Diary successfully created',
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create diary' });
  }
};

export const accessMyDiary = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const diary = await getDiary(email);

    if (!diary) {
      return res.status(401).json({ error: 'Email or password is incorrect' });
    }

    const isValid = await bcrypt.compare(password, diary.password);

    if (!isValid) {
      return res.status(401).json({ error: 'Email or password is incorrect' });
    }

    const token = jwt.sign(
      { id: diary.id, diaryName:diary.diaryName },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      message: 'access granted',
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

