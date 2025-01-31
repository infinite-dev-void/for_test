-- migrate:up
INSERT INTO users 
    (id, user_name, password, type, status)
VALUES
    (1, 'admin@immigration-fms.ly', '$argon2id$v=19$m=65536,t=3,p=4$WD2d5Iy+wLy3RqT3tyH2tw$OmSS/jTE4WlgTLE0sMXLSdiHSNrLSjFNLapGwMWEZ54', 1, 1);

-- migrate:down
DELETE FROM users WHERE id=1;

