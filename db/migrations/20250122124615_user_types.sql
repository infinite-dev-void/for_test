-- migrate:up
CREATE TABLE user_types (
    id TINYINT NOT NULL PRIMARY KEY,
    type VARCHAR(40)
);
-- migrate:down
DROP TABLE user_types;
