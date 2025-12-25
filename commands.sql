CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title)
VALUES
('Dan Abramov', 'https://react.dev', 'On let vs const'),
('Laurenz Albe', 'https://postgresql.org', 'Gaps in sequences');
