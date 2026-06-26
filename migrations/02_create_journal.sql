CREATE TABLE IF NOT EXISTS journals (
    id SERIAL PRIMARY KEY,
    diary_id INT REFERENCES diary(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    note TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);