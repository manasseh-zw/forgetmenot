CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Anonymous',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    likes INTEGER NOT NULL DEFAULT 0
); 