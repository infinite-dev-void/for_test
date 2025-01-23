-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL UNIQUE KEY,
    password TEXT NOT NULL,
    type TINYINT NOT NULL,
    status TINYINT NOT NULL
);
-- migrate:down
DROP TABLE users;

