INSERT INTO products (product_name, price)
VALUES ('OldLace Long', 108.63),
('Snow Talk', 33.96),
('Cornsilk Care', 96.21),
('Turquoise Admit', 130.53),
('White Fish', 63.22),
('RosyBrown Once', 132.29),
('MidnightBlue Finally', 123.44),
('PowderBlue Four', 182.17),
('DeepPink Serious', 195.99),
('DarkSeaGreen Here', 36.37),
('DarkOrchid Tax', 54.26),
('DeepPink Majority', 42.02),
('Cyan North', 119.51),
('Tomato Fly', 31.49),
('DodgerBlue Cold', 70.32),
('Chartreuse Much', 136.63),
('LightGray Century', 82.92),
('DarkGray Good', 27.44),
('OrangeRed Weight', 82.84),
('LightCyan Including', 136.45),
('LimeGreen Loss', 59.34),
('MistyRose Plant', 163.67),
('WhiteSmoke Read', 111.16),
('LightSkyBlue Face', 14.22),
('BlueViolet Themselves', 142.31),
('Yellow Local', 82.37),
('Snow Right', 149.21),
('LightBlue Issue', 24.51),
('Moccasin Thing', 82.89),
('DimGray Eye', 112.49),
('CadetBlue Affect', 171.43),
('LightBlue Theory', 157.06),
('MediumAquaMarine Compare', 159.2),
('LavenderBlush Their', 80.64),
('MintCream Number', 21.4),
('LightSalmon Hundred', 58.22),
('WhiteSmoke Seem', 27.76),
('MediumSeaGreen Sit', 91.82),
('White Sort', 132.05),
('Crimson Fire', 61.91),
('Linen Choose', 14.07),
('LightGreen Look', 105.81),
('DimGray Success', 69.18),
('SlateBlue Bar', 153.69),
('SkyBlue Item', 117.57),
('Linen Teacher', 120.2),
('AntiqueWhite There', 123.15),
('LightSlateGray Must', 77.4),
('DarkMagenta Image', 15.71),
('MidnightBlue Possible', 11.61);
INSERT INTO customers (first_name, last_name, phone, email, date_of_birth, city, street, zip)
VALUES ('Michelle','Wood',3049662155510,'hdunn@example.net','1983-08-10', 'Anitaland', '1622 Howard Mall', 45616),
('Melissa','Moyer',6668014131426,'erica08@example.com','1969-12-17', 'Lake Jessicashire', '070 Melissa Spurs', 32170),
('Frank','Alexander',1218185317817,'pcarlson@example.net','2001-06-07', 'West Rachelmouth', '9720 Green Walks', 01008),
('Thomas','Schmidt',6940648864271,'melissa31@example.org','1959-11-13', 'Christinafurt', '374 Jones Key', 47022),
('Michael','Martin',2328793887411,'fergusonlisa@example.org','1975-06-18', 'Garciaberg', '892 Paul Burgs Apt. 366', 71591),
('Mark','Henderson',3608961354743,'melinda32@example.org','1972-12-22', 'Annashire', '8701 Jason Hills', 68776),
('Molly','Kelly',7759658001619,'raygoodwin@example.org','1980-07-17', 'Lake Peter', '4978 Thomas Parkways Suite 887', 85970),
('Christopher','Johnson',9278337935119,'christina14@example.net','1975-02-14', 'Tabithaview', '449 Catherine Forks Suite 585', 08304),
('Ronald','Parks',7443493381581,'kellywhite@example.org','2004-12-15', 'Pattersonfurt', '1416 Patricia Ridge Apt. 080', 53732),
('Miranda','Aguilar',0906279968497,'susan92@example.com','1977-02-25', 'Haleyville', '64495 Susan Dam', 27626),
('Amber','Harding',8618233852681,'tiffanyfuentes@example.org','1974-09-26', 'West Christinebury', '74461 Webster Fork Apt. 928', 89198),
('Bryan','Daniel',5021480838334,'willie20@example.net','1966-08-02', 'Gonzalezfurt', '755 Barbara Vista Apt. 850', 02716),
('Laura','Smith',9047173423537,'samanthagutierrez@example.net','1955-06-07', 'New Lindaview', '4640 Julie Groves Apt. 686', 16522),
('Jennifer','Schwartz',2160162157650,'bsavage@example.org','1954-03-10', 'Lake Monica', '6612 Anne Oval', 43030),
('Anthony','Vance',0266770803734,'deborah30@example.com','2002-04-20', 'East Eric', '60409 Dakota Dale', 76454),
('Jacob','Paul',4591706216610,'debra79@example.org','1990-04-22', 'South Chad', '54394 Reed Skyway', 99307),
('Robert','Klein',5374822851995,'tobrien@example.org','1978-01-18', 'Fischerton', '7938 Fox Mission Suite 489', 64016),
('Ashley','Lewis',7227577830937,'linashley@example.org','1992-04-07', 'West Jacqueline', '5650 Shields Route', 11125),
('Corey','Young',1101246309338,'rosslori@example.net','1977-05-30', 'Lake Samuelstad', '57268 Katherine Terrace Apt. 029', 70495),
('Felicia','Horton',9031267609222,'cjimenez@example.net','2004-06-07', 'Susanbury', '52409 Davis Field Apt. 650', 55470);
INSERT INTO addresses (country, city, street, zip)
VALUES ('Belize','Garciaburgh','28077 Rodriguez Courts',24945),
('Costa Rica','West Evelyn','788 Burgess Cliff',83988),
('United States Virgin Islands','North Megan','65748 Phillips Points Suite 898',92976),
('Chad','Port Annafort','8170 Vincent Station Apt. 440',29093),
('Congo','Millerland','06599 Kramer Valley Suite 338',54116),
('Burundi','Lake Amandahaven','063 Timothy Cliffs',22782),
('Hungary','East Jenny','4151 Morrow Track',47669),
('Western Sahara','Jeffreyton','460 Benjamin Camp',17604),
('Iraq','North Alyssa','3355 Brian Fork',56629),
('Mali','Loriton','76304 Harmon Canyon Apt. 152',44167);
INSERT INTO orders (customer_id, address_id, order_date, total_price)
VALUES (20,1,'2005-12-05 01:09:48',643.82),
(16,8,'2013-06-16 13:03:17',331.68),
(17,3,'2005-10-25 10:17:08',542.35),
(18,2,'2011-07-04 06:43:56',1131.13),
(4,9,'2014-03-30 01:09:28',1222.84),
(18,4,'2005-02-17 18:48:28',171.43),
(2,3,'2011-06-25 20:11:02',1170.4),
(13,6,'2014-08-29 10:47:56',308.22),
(5,10,'2007-08-21 09:09:53',701.71),
(13,8,'2004-12-28 01:23:33',520.08),
(18,1,'2014-03-23 17:13:51',175.47),
(3,8,'2010-08-15 21:45:31',1642.49),
(4,4,'2014-08-19 14:59:31',241.33),
(11,4,'2005-04-03 15:56:59',1306.64),
(10,5,'2008-03-14 21:07:10',1128.0),
(6,9,'2010-11-09 18:46:50',873.85),
(16,3,'2010-05-26 02:42:48',836.88),
(11,3,'2004-11-21 05:18:02',345.9),
(19,6,'2012-01-20 12:36:44',1367.67),
(16,10,'2006-08-25 14:06:52',325.89),
(7,2,'2014-09-01 15:53:13',109.11),
(3,8,'2009-08-12 13:10:58',822.52),
(13,6,'2013-05-02 20:24:37',1215.93),
(10,1,'2012-02-23 04:06:52',607.6),
(15,6,'2005-11-19 10:56:29',2001.33),
(19,1,'2009-09-03 05:14:07',2197.85),
(4,3,'2010-02-10 05:10:07',1307.35),
(10,4,'2011-02-05 12:59:06',1139.17),
(17,9,'2010-12-18 10:22:53',164.74),
(13,4,'2005-04-15 05:04:43',367.28),
(6,10,'2009-08-01 21:51:42',377.01),
(7,1,'2007-07-31 04:14:45',661.06),
(3,9,'2005-09-02 19:24:29',1074.91),
(8,1,'2010-01-21 23:01:13',154.8),
(12,6,'2011-12-19 20:44:54',338.91),
(3,9,'2014-04-14 09:54:44',2618.37),
(3,1,'2012-08-10 03:22:02',948.91),
(8,1,'2014-07-26 05:01:56',342.86),
(15,6,'2008-01-15 18:58:32',272.9),
(18,5,'2005-05-20 06:37:53',891.87),
(7,3,'2006-07-07 03:26:46',165.68),
(2,9,'2008-08-19 00:20:44',927.94),
(9,3,'2011-12-03 05:24:43',768.45),
(2,1,'2006-04-13 21:19:45',1530.35),
(3,4,'2006-03-05 04:49:44',788.27),
(19,5,'2007-10-25 03:27:54',660.19),
(12,1,'2011-04-19 09:54:30',779.21),
(9,10,'2013-12-10 02:46:19',215.57),
(3,9,'2014-06-30 02:23:42',1061.91),
(9,6,'2006-06-14 22:06:00',2249.48),
(19,1,'2010-01-01 15:08:23',437.42),
(16,1,'2013-07-05 01:28:24',1049.68),
(4,8,'2009-01-27 18:56:34',1216.49),
(2,9,'2004-12-04 18:56:01',219.94),
(13,7,'2011-10-27 16:38:18',486.69),
(17,8,'2014-02-06 11:46:52',850.49),
(18,2,'2008-06-25 16:18:39',586.86),
(5,10,'2012-02-03 02:38:04',93.25),
(9,4,'2013-01-28 19:09:31',207.54),
(4,7,'2011-07-14 18:56:59',679.81),
(2,1,'2007-06-27 10:52:57',1015.49),
(12,9,'2010-09-26 13:35:53',195.99),
(20,6,'2006-05-09 00:59:17',726.31),
(2,5,'2012-08-30 06:13:58',710.96),
(11,10,'2008-10-11 10:23:33',1365.12),
(18,8,'2014-03-04 15:22:55',2002.64),
(12,2,'2010-07-07 12:06:58',1581.96),
(14,2,'2011-11-16 03:08:24',67.92),
(2,1,'2005-11-01 10:45:35',851.06),
(10,6,'2005-10-30 09:14:27',157.06),
(13,2,'2005-05-14 09:04:22',457.35),
(17,6,'2009-08-18 05:10:49',901.53),
(11,9,'2010-10-02 16:50:13',582.22),
(8,8,'2007-12-14 20:15:47',1164.98),
(10,10,'2012-01-15 13:04:39',388.03),
(16,9,'2008-08-15 23:41:55',846.37),
(18,6,'2010-07-21 15:49:50',217.26),
(9,6,'2010-06-30 09:59:40',664.54),
(14,7,'2010-06-29 01:09:43',632.46),
(3,10,'2011-02-20 15:21:35',1383.66),
(20,2,'2011-01-06 18:01:41',818.85),
(10,1,'2007-08-05 05:00:28',337.06),
(8,1,'2011-06-11 10:34:20',355.4),
(8,7,'2008-02-06 00:34:19',1409.95),
(20,6,'2013-10-05 07:25:31',669.07),
(10,2,'2007-07-09 06:12:10',720.13),
(3,6,'2009-11-06 19:20:15',1516.6),
(10,10,'2006-11-10 21:04:39',344.69),
(8,7,'2006-08-21 15:35:46',240.4),
(7,2,'2008-11-06 02:14:15',136.57),
(3,10,'2010-05-18 23:11:29',1544.97),
(7,5,'2008-10-14 13:42:02',692.25),
(5,3,'2008-03-03 03:18:19',1525.74),
(8,7,'2008-07-13 07:13:48',1420.72),
(6,3,'2006-11-29 11:16:38',286.24),
(18,7,'2004-12-26 13:07:03',753.1),
(5,8,'2012-06-25 14:18:22',566.24),
(12,8,'2010-09-19 22:31:35',701.25),
(13,1,'2011-06-22 05:23:46',584.92),
(20,5,'2007-10-13 15:28:40',748.87);
INSERT INTO order_items (order_id, product_id, quantity, sub_price)
VALUES (1,13,4,478.04),
(1,29,2,165.78),
(2,17,4,331.68),
(3,6,3,396.87),
(3,10,4,145.48),
(4,33,4,636.8),
(4,42,3,317.43),
(4,10,4,145.48),
(4,49,2,31.42),
(5,23,2,222.32),
(5,26,4,329.48),
(5,41,4,56.28),
(5,44,4,614.76),
(6,31,1,171.43),
(7,37,1,27.76),
(7,17,1,82.92),
(7,28,4,98.04),
(7,19,2,165.68),
(7,33,5,796.0),
(8,12,3,126.06),
(8,1,1,108.63),
(8,28,3,73.53),
(9,40,5,309.55),
(9,20,2,272.9),
(9,41,4,56.28),
(9,14,2,62.98),
(10,2,1,33.96),
(10,17,3,248.76),
(10,21,4,237.36),
(11,50,3,34.83),
(11,15,2,140.64),
(12,42,3,317.43),
(12,18,4,109.76),
(12,41,2,28.14),
(12,9,4,783.96),
(12,34,5,403.2),
(13,49,5,78.55),
(13,11,3,162.78),
(14,25,1,142.31),
(14,19,2,165.68),
(14,50,3,34.83),
(14,8,4,728.68),
(14,45,2,235.14),
(15,20,3,409.35),
(15,2,2,67.92),
(15,47,3,369.45),
(15,15,4,281.28),
(16,40,4,247.64),
(16,17,3,248.76),
(16,25,1,142.31),
(16,45,2,235.14),
(17,50,1,11.61),
(17,15,3,210.96),
(17,9,1,195.99),
(17,2,5,169.8),
(17,19,3,248.52),
(18,43,5,345.9),
(19,43,1,69.18),
(19,17,4,331.68),
(19,31,1,171.43),
(19,4,4,522.12),
(19,16,2,273.26),
(20,1,3,325.89),
(21,10,3,109.11),
(22,10,4,145.48),
(22,35,3,64.2),
(22,15,4,281.28),
(22,29,4,331.56),
(23,22,2,327.34),
(23,16,3,409.89),
(23,36,2,116.44),
(23,44,2,307.38),
(23,18,2,54.88),
(24,49,5,78.55),
(24,42,5,529.05),
(25,44,3,461.07),
(25,27,5,746.05),
(25,38,4,367.28),
(25,25,3,426.93),
(26,6,5,661.45),
(26,47,5,615.75),
(26,10,5,181.85),
(26,39,5,660.25),
(26,49,5,78.55),
(27,38,4,367.28),
(27,17,1,82.92),
(27,31,5,857.15),
(28,46,4,480.8),
(28,42,5,529.05),
(28,18,1,27.44),
(28,2,3,101.88),
(29,26,2,164.74),
(30,38,4,367.28),
(31,28,4,98.04),
(31,29,1,82.89),
(31,48,1,77.4),
(31,21,2,118.68),
(32,47,3,369.45),
(32,18,4,109.76),
(32,10,5,181.85),
(33,19,5,414.2),
(33,10,2,72.74),
(33,9,3,587.97),
(34,48,2,154.8),
(35,32,1,157.06),
(35,10,5,181.85),
(36,9,5,979.95),
(36,17,5,414.6),
(36,5,3,189.66),
(36,22,3,491.01),
(36,1,5,543.15),
(37,21,4,237.36),
(37,25,5,711.55),
(38,31,2,342.86),
(39,20,2,272.9),
(40,14,3,94.47),
(40,16,4,546.52),
(40,33,1,159.2),
(40,28,2,49.02),
(40,24,3,42.66),
(41,19,2,165.68),
(42,36,1,58.22),
(42,1,5,543.15),
(42,2,3,101.88),
(42,40,1,61.91),
(42,11,3,162.78),
(43,44,5,768.45),
(44,7,2,246.88),
(44,21,5,296.7),
(44,13,3,358.53),
(44,32,4,628.24),
(45,30,1,112.49),
(45,23,1,111.16),
(45,5,5,316.1),
(45,19,3,248.52),
(46,29,1,82.89),
(46,43,4,276.72),
(46,2,4,135.84),
(46,26,2,164.74),
(47,49,3,47.13),
(47,22,4,654.68),
(47,48,1,77.4),
(48,37,3,83.28),
(48,6,1,132.29),
(49,7,1,123.44),
(49,3,2,192.42),
(49,27,5,746.05),
(50,25,2,284.62),
(50,22,5,818.35),
(50,48,5,387.0),
(50,40,5,309.55),
(50,30,4,449.96),
(51,50,2,23.22),
(51,19,5,414.2),
(52,4,4,522.12),
(52,36,1,58.22),
(52,21,1,59.34),
(52,34,3,241.92),
(52,12,4,168.08),
(53,21,1,59.34),
(53,12,4,168.08),
(53,42,2,211.62),
(53,32,4,628.24),
(53,27,1,149.21),
(54,11,1,54.26),
(54,19,2,165.68),
(55,41,4,56.28),
(55,43,4,276.72),
(55,44,1,153.69),
(56,39,3,396.15),
(56,47,3,369.45),
(56,43,1,69.18),
(56,49,1,15.71),
(57,42,1,105.81),
(57,3,5,481.05),
(58,24,4,56.88),
(58,10,1,36.37),
(59,43,3,207.54),
(60,5,4,252.88),
(60,25,3,426.93),
(61,16,1,136.63),
(61,24,1,14.22),
(61,8,4,728.68),
(61,5,1,63.22),
(61,10,2,72.74),
(62,9,1,195.99),
(63,10,3,109.11),
(63,7,5,617.2),
(64,2,1,33.96),
(64,9,2,391.98),
(64,21,3,178.02),
(64,35,5,107.0),
(65,38,3,275.46),
(65,8,3,546.51),
(65,1,5,543.15),
(66,33,4,636.8),
(66,2,2,67.92),
(66,25,4,569.24),
(66,8,4,728.68),
(67,32,3,471.18),
(67,45,4,470.28),
(67,1,2,217.26),
(67,42,4,423.24),
(68,2,2,67.92),
(69,33,2,318.4),
(69,34,4,322.56),
(69,12,5,210.1),
(70,32,1,157.06),
(71,48,5,387.0),
(71,41,5,70.35),
(72,9,4,783.96),
(72,45,1,117.57),
(73,4,3,391.59),
(73,49,1,15.71),
(73,35,5,107.0),
(73,2,2,67.92),
(74,29,2,165.78),
(74,35,1,21.4),
(74,38,2,183.64),
(74,40,4,247.64),
(74,16,4,546.52),
(75,5,1,63.22),
(75,34,3,241.92),
(75,29,1,82.89),
(76,26,5,411.85),
(76,1,4,434.52),
(77,1,2,217.26),
(78,26,5,411.85),
(78,2,5,169.8),
(78,29,1,82.89),
(79,34,2,161.28),
(79,32,3,471.18),
(80,22,4,654.68),
(80,33,3,477.6),
(80,35,4,85.6),
(80,29,2,165.78),
(81,24,3,42.66),
(81,8,2,364.34),
(81,26,5,411.85),
(82,2,1,33.96),
(82,26,2,164.74),
(82,43,2,138.36),
(83,11,2,108.52),
(83,7,2,246.88),
(84,43,4,276.72),
(84,24,3,42.66),
(84,15,3,210.96),
(84,23,1,111.16),
(84,44,5,768.45),
(85,16,4,546.52),
(85,28,5,122.55),
(86,41,2,28.14),
(86,8,3,546.51),
(86,10,4,145.48),
(87,47,5,615.75),
(87,48,2,154.8),
(87,27,5,746.05),
(88,48,3,232.2),
(88,30,1,112.49),
(89,46,2,240.4),
(90,49,2,31.42),
(90,34,1,80.64),
(90,28,1,24.51),
(91,34,5,403.2),
(91,25,2,284.62),
(91,31,5,857.15),
(92,4,2,261.06),
(92,34,4,322.56),
(92,1,1,108.63),
(93,29,4,331.56),
(93,38,5,459.1),
(93,17,2,165.84),
(93,25,4,569.24),
(94,27,1,149.21),
(94,39,5,660.25),
(94,25,4,569.24),
(94,12,1,42.02),
(95,36,2,116.44),
(95,2,5,169.8),
(96,17,2,165.84),
(96,10,4,145.48),
(96,35,4,85.6),
(96,20,2,272.9),
(96,37,3,83.28),
(97,18,2,54.88),
(97,10,4,145.48),
(97,43,1,69.18),
(97,21,5,296.7),
(98,37,1,27.76),
(98,33,1,159.2),
(98,31,3,514.29),
(99,43,5,345.9),
(99,13,2,239.02),
(100,25,2,284.62),
(100,43,3,207.54),
(100,13,1,119.51),
(100,18,5,137.2);