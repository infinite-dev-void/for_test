-- migrate:up
CREATE VIEW view_users AS
    SELECT
        u.id,
        u.user_name,
        u.password,
        u.type AS type_id,
        t.type AS type,
        u.status AS status_id,
        s.status AS status
    FROM users AS u

    INNER JOIN user_types AS t
    ON u.type=t.id

    INNER JOIN user_statuses AS s
    ON u.status=s.id
-- migrate:down
DROP VIEW view_users;

