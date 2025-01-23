-- migrate:up
INSERT INTO user_types 
    (id, type)
VALUES
    (1, 'مسؤول'),
    (2, 'مدخل بيانات');
-- migrate:down
DELETE FROM user_types WHERE id IN (1,2);

