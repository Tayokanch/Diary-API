import {pool} from '../index.js'

export const createMyJournal = async (diaryID, topic, note) => {
  await pool.query(
    `INSERT INTO journals (diary_id, topic, note)
     VALUES ($1, $2, $3)`,
    [diaryID, topic, note]
  );
};

export const getMyJournal = async (diaryID)=>{
    const notes = await pool.query(
        `SELECT id, topic, note, created_at, updated_at FROM journals WHERE diary_id = $1`,
        [diaryID]
    )
    return notes.rows;
    //I expect this to be an array

}

export const updateJournal = async (journalID, topic, note) => {
  const query = `
    UPDATE journals
    SET topic = $2,
        note = $3,
        updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `;

  const values = [journalID, topic, note];

  const result = await pool.query(query, values);
  return result.rows[0];
};


export const deleteJournal = async (journalID) => {
  const result = await pool.query(
    'DELETE FROM journals WHERE id = $1 RETURNING *',
    [journalID]
  );

  return result.rows[0];
};
