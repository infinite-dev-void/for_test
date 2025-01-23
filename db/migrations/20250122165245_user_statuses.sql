-- migrate:up
CREATE TABLE user_statuses (
    id TINYINT NOT NULL PRIMARY KEY,
    status VARCHAR(40) NOT NULL
);

-- migrate:down
DROP TABLE user_statuses;

