-- Luo tietokanta ja taulu
DROP DATABASE IF EXISTS `sportsdb`;
CREATE DATABASE IF NOT EXISTS `sportsdb`;
USE `sportsdb`;

CREATE TABLE IF NOT EXISTS `athletes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `nickname` VARCHAR(100) DEFAULT NULL,
  `birth_date` DATE NOT NULL,
  `weight` DECIMAL(5,2) NOT NULL,
  `image_url` TEXT DEFAULT NULL,
  `sport` VARCHAR(100) NOT NULL,
  `achievements` TEXT DEFAULT NULL,
  `created_at` DATE NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- Esimerkkirivit
INSERT INTO athletes 
(first_name, last_name, nickname, birth_date, weight, image_url, sport, achievements, `created_at`)
VALUES
('Usain', 'Bolt', 'Usain', '1986-08-21', 94, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Usain_Bolt_-_240422_190118_%28cropped%29.jpg/800px-25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Usain_Bolt_-_240422_190118_%28cropped%29.jpg', '100 m juoksu', 'Olympiakulta 2008; Olympiakulta 2012', '2025-10-16'),
('Michael', 'Phelps', 'Michael', '1985-06-30', 88, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Michael_Phelps_August_2016.jpg/800px-Michael_Phelps_August_2016.jpg', 'Uinti', 'Olympiakulta 2004; Olympiakulta 2008; Olympiakulta 2012', '2025-10-16'),
('Serena', 'Williams', 'Serena', '1981-09-26', 70, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Serena_Williams_at_2013_US_Open_2.jpg/800px-Serena_Williams_at_2013_US_Open_2.jpg', 'Tennis', 'Grand Slam -voittoja 23 kertaa', '2025-10-16'),
('Lionel', 'Messi', 'Leo', '1987-06-24', 72, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Lionel_Messi_20180626.jpg/800px-Lionel_Messi_20180626.jpg', 'Jalkapallo', 'Ballon d\'Or -palkinto 7 kertaa', '2025-10-16'),
('Simone', 'Biles', 'Simone', '1997-03-14', 47, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Simone_Biles_Rio_2016b.jpg/800px-Simone_Biles_Rio_2016b.jpg', 'Voimistelu', 'Olympiakulta 2016; Maailmanmestaruus 2018', '2025-10-16'),
('Cristiano', 'Ronaldo', 'CR7', '1985-02-05', 83, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/800px-Cristiano_Ronaldo_2018.jpg', 'Jalkapallo', 'Ballon d\'Or -palkinto 5 kertaa', '2025-10-16'),
('Katie', 'Ledecky', 'Katie', '1997-03-17', 70, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Katie_Ledecky_Rio_2016b.jpg/800px-Katie_Ledecky_Rio_2016b.jpg', 'Uinti', 'Olympiakulta 2016; Maailmanmestaruus 2017', '2025-10-16'),
('Roger', 'Federer', 'FedEx', '1981-08-08', 85, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Roger_Federer_%28Australian_Open_2017%29_2.jpg/800px-Roger_Federer_%28Australian_Open_2017%29_2.jpg', 'Tennis', 'Grand Slam -voittoja 20 kertaa', '2025-10-16'),
('Neymar', 'Jr', 'Neymar', '1992-02-05', 68, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Neymar_2018.jpg/800px-Neymar_2018.jpg', 'Jalkapallo', 'Copa America -voitto 2019', '2025-10-16'),
('Allyson', 'Felix', 'Allyson', '1985-11-18', 55, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Allyson_Felix_Rio_2016b.jpg/800px-Allyson_Felix_Rio_2016b.jpg', 'Yleisurheilu', 'Olympiakulta 2012; Olympiakulta 2016', '2025-10-16'),
('LeBron', 'James', 'King James', '1984-12-30', 113, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/LeBron_James_Lakers.jpg/800px-LeBron_James_Lakers.jpg', 'Koripallo', 'NBA-mestaruus 4 kertaa; MVP 4 kertaa', '2025-10-16'),
('Megan', 'Rapinoe', 'Megan', '1985-07-05', 64, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Megan_Rapinoe_USWNT_2019.jpg/800px-Megan_Rapinoe_USWNT_2019.jpg', 'Jalkapallo', 'MM-kulta 2019; Olympiakulta 2012', '2025-10-16'),
('Tom', 'Brady', 'TB12', '1977-08-03', 102, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Tom_Brady_2017.jpg/800px-Tom_Brady_2017.jpg', 'Amerikkalainen jalkapallo', 'Super Bowl -voitto 7 kertaa; MVP 3 kertaa', '2025-10-16'),
('Caeleb', 'Dressel', 'Caeleb', '1996-08-16', 88, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Caeleb_Dressel_Rio_2016b.jpg/800px-Caeleb_Dressel_Rio_2016b.jpg', 'Uinti', 'Olympiakulta 2016; Maailmanmestaruus 2017', '2025-10-16'),
('Ashleigh', 'Barty', 'Ash', '1996-04-24', 64, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Ashleigh_Barty_at_Wimbledon_2019.jpg/800px-Ashleigh_Barty_at_Wimbledon_2019.jpg', 'Tennis', 'Grand Slam -voittoja 3 kertaa; WTA-rankingin ykkönen', '2025-10-16');