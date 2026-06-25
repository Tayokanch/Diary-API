
import { pool } from '../index.js';

export const createDiary = async (diaryName, email, password) => {
  await pool.query(
    `INSERT INTO diary (diary_name, email, password)
     VALUES ($1, $2, $3)`,
    [diaryName, email, password]
  );
};


export const getDiary = async (email) => {
  const result = await pool.query(
    'SELECT id, diary_name, email, password FROM diary WHERE email = $1',
    [email]
  );
  return result.rows[0];
};
