import { createMyJournal, getMyJournal, updateJournal, deleteJournal } from "../db/queries/journalQueries.js";

export const createJournalController = async (req, res) => {
    try {
        const diaryId = req.diaryID;
        const { topic, note } = req.body;

        if (!diaryId) throw new Error('Diary not exist, create one');
        if (!topic) return res.status(400).json({ error: 'Topic is missing' });
        if (!note) return res.status(400).json({ error: 'Note is missing' });

        const journal = await createMyJournal(diaryId, topic, note);

        res.status(201).json({
            message: 'Journal successfully created',
            journal
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create note' });
    }
};

export const getJournalsController = async (req, res) => {
    try {
        const diaryId = req.diaryID;
        if (!diaryId) throw new Error('Dairy not found, create one');

        const journals = await getMyJournal(diaryId);
        res.status(200).json({
            journals
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
};

export const updateJournalontroller = async (req, res) => {
  try {
    const { journalID, topic, note} = req.body;

    if (!journalID || !topic || note) {
      return res.status(400).json({
        error: 'journalID, topic, and note are required'
      });
    }

    const updatedjournal = await updateJournal(journalID, topic, note);

    if (!updatedjournal) {
      return res.status(404).json({
        error: 'Note not found'
      });
    }

    return res.status(200).json({
      message: `Journal with id ${journalID} has been successfully updated`,
      journal: updatedjournal
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to update note' });
  }
};

export const deleteJournalController = async (req, res) => {
  try {
    const { journalID } = req.params;

    const id = parseInt(journalID, 10);

    const deletedJournal = await deleteJournal(id);

    if (!deletedJournal) {
      return res.status(404).json({
        error: 'Journal not found'
      });
    }

    return res.status(200).json({
      message: `Journal with id ${id} has been successfully deleted`
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to delete note' });
  }
};