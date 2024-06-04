CREATE TABLE problems (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    num INTEGER() NOT NULL UNIQUE,
    description MEDIUMTEXT NOT NULL,
    difficulty VARCHAR(255) NOT NULL,
    url VARCHAR(512) NOT NULL,
    topics TEXT[],
    createdAt TIMESTAMP NOT NULL,
    subQuestions JSONB NOT NULL
);