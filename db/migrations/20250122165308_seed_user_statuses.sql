-- migrate:up
INSERT INTO user_statuses
    (id, status)
VALUES
    (1, 'نشط'),
    (2, 'ليس نشط');

-- migrate:down
DELETE FROM user_statuses WHERE id IN(1, 2);
