CREATE USER IF NOT EXISTS 'sampleuser1'@'localhost' IDENTIFIED BY 'apples';
USE `sportsdb`;
GRANT INSERT,UPDATE,DELETE,SELECT ON athletes TO 'sampleuser1'@'localhost' IDENTIFIED BY 'apples'; 