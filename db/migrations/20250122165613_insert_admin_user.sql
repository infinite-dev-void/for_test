-- migrate:up
INSERT INTO users 
    (id, user_name, password, type, status)
VALUES
    (1, 'ahmed_admin', '$argon2id$v=19$m=65536,t=3,p=4$RZV/8Ftup+9nLs7g+9TedA$mjF0QEjBRQRVunnWCMJDIJKqcsxeDZq0LFHjY+7ysDs', 1, 1);

-- migrate:down
DELETE FROM users WHERE id=1;

