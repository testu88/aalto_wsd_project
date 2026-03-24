CREATE TABLE books (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL CHECK (length(title) > 0),
    description TEXT,
    published_at DATE,
    page_count INTEGER CHECK (page_count > 0)
);