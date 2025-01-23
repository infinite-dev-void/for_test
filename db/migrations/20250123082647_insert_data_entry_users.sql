-- migrate:up
INSERT INTO users 
    (id, user_name, password, type, status)
VALUES
    (2, 'data_entry1', '$argon2id$v=19$m=65536,t=3,p=4$XVCh4MmVA69pyqPT1voFAg$YgcKCGG5sz4WQKfH5IVgUE5f59tcVH88eAbQ9zfAR7M', 2, 1),
    (3, 'data_entry2', '$argon2id$v=19$m=65536,t=3,p=4$hu3kGQKuE6L8qHu60ZSmEQ$p+S3+NrsrZlF7zHK14H9EiRjTfPM6GgzeeLuak9ytbA', 2, 1),
    (4, 'data_entry3', '$argon2id$v=19$m=65536,t=3,p=4$NbLzg1JKMQ7XkUMMsl/TUA$WMbulioQrS+yWoO9MkE5Ls9IrMQRUT+B/yc9ofIGr6A', 2, 1),
    (5, 'data_entry4', '$argon2id$v=19$m=65536,t=3,p=4$lzJqUh59I48A6sK3CisXVA$a2ySNhFwhmyPCUJFfg1UKiUDAtE4E4f8n6nZDxPT770', 2, 1),
    (6, 'data_entry5', '$argon2id$v=19$m=65536,t=3,p=4$OYwDTmmDUUBf75NuREttuA$i1hNKmkLfPzlgV21HqbNXg3YGy/H14AKGx4yDjhCVaw', 2, 1);

-- migrate:down
DELETE FROM users WHERE id IN (2, 3, 4, 5, 6);

