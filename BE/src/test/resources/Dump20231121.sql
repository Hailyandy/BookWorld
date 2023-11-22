-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bookworld
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'The Girl with the Dragon Tattoo',NULL,NULL,NULL,NULL,2,NULL,3.4),(2,'Harry Potter and the Philosopher’s Stone',NULL,NULL,NULL,NULL,2,NULL,4),(3,'月刊少女野崎くん 15 [Gekkan Shoujo Nozaki-kun 15]',3,'2023-09-12 15:40:02.000000','スクウェア・エニックス','https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691733246i/61997573.jpg',3,'She is a Japanese manga artist known for creating The Magic Touch and Oresama Teacher which have both been serialized on the Hana to Yume magazine./nTsubaki began drawing manga in her first year of high school. She was soon selected to be in the top 10 of Hana to Yume Mangaka Course, and subsequently won the Big Challenge contest.',3),(4,'月刊少女野崎くん 15 [Gekkan Shoujo Nozaki-kun 15]',3,'2023-09-12 15:40:02.000000','スクウェア・エニックス','https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691733246i/61997573.jpg',3,'She is a Japanese manga artist known for creating The Magic Touch and Oresama Teacher which have both been serialized on the Hana to Yume magazine./nTsubaki began drawing manga in her first year of high school. She was soon selected to be in the top 10 of Hana to Yume Mangaka Course, and subsequently won the Big Challenge contest.',4.6),(5,'2 月刊少女野崎くん 15 [Gekkan Shoujo Nozaki-kun 15]',3,'2023-09-12 15:40:02.000000','スクウェア・エニックス','https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691733246i/61997573.jpg',3,'She is a Japanese manga artist known for creating The Magic Touch and Oresama Teacher which have both been serialized on the Hana to Yume magazine./nTsubaki began drawing manga in her first year of high school. She was soon selected to be in the top 10 of Hana to Yume Mangaka Course, and subsequently won the Big Challenge contest.',NULL);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `book_basket`
--

LOCK TABLES `book_basket` WRITE;
/*!40000 ALTER TABLE `book_basket` DISABLE KEYS */;
INSERT INTO `book_basket` VALUES (1,2,'Đang đọc'),(2,2,'Đang đọc');
/*!40000 ALTER TABLE `book_basket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `book_genre`
--

LOCK TABLES `book_genre` WRITE;
/*!40000 ALTER TABLE `book_genre` DISABLE KEYS */;
INSERT INTO `book_genre` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(2,2);
/*!40000 ALTER TABLE `book_genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `book_sale`
--

LOCK TABLES `book_sale` WRITE;
/*!40000 ALTER TABLE `book_sale` DISABLE KEYS */;
/*!40000 ALTER TABLE `book_sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `friendship`
--

LOCK TABLES `friendship` WRITE;
/*!40000 ALTER TABLE `friendship` DISABLE KEYS */;
/*!40000 ALTER TABLE `friendship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Mystery'),(2,'Manga');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pdf`
--

LOCK TABLES `pdf` WRITE;
/*!40000 ALTER TABLE `pdf` DISABLE KEYS */;
/*!40000 ALTER TABLE `pdf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,3,NULL,NULL,3,NULL,2,'Sách rất hay','2023-10-19 14:17:22.622733','2023-10-19 14:17:22.622733',NULL),(2,3,NULL,NULL,3,NULL,2,'Sách rất hay','2023-10-21 15:52:32.363654','2023-10-21 15:52:32.363654',NULL),(3,3,NULL,NULL,3,NULL,2,'Sách rất hay','2023-11-03 10:09:09.678536','2023-11-03 10:09:09.678536',NULL);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `quick_test`
--

LOCK TABLES `quick_test` WRITE;
/*!40000 ALTER TABLE `quick_test` DISABLE KEYS */;
/*!40000 ALTER TABLE `quick_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_USER'),(2,'ROLE_AUTHOR'),(3,'ROLE_ADMIN');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `scoring`
--

LOCK TABLES `scoring` WRITE;
/*!40000 ALTER TABLE `scoring` DISABLE KEYS */;
/*!40000 ALTER TABLE `scoring` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,_binary '\0',NULL,NULL,NULL,'$2a$10$lhN.37qratnsIZrXWk0D.eWaD/aXoc3vFhTXNrnKPR..Zp/YNNc3C',NULL,NULL,NULL,'user@gmail.com',NULL),(2,NULL,_binary '',NULL,NULL,NULL,'$2a$10$3SP4ATSbFwmEQ52J3jyl/uf4TpFzBjNwcjdeLHqAboHiU2ceb20R.',NULL,NULL,NULL,'user1@gmail.com',NULL),(3,NULL,_binary '',NULL,NULL,NULL,'$2a$10$eW9IqiKJa/zq82ZGHhzzEuGIB3/80q8tXty5Otr.jxNHfZZfxafPu',NULL,NULL,NULL,'user2@gmail.com',NULL),(4,NULL,_binary '',NULL,NULL,NULL,'$2a$10$aNtIKirjIJryB2zBiPXw6e1CuODt5jW0mrt9CJ9tSbDBwD7odkFza',NULL,NULL,NULL,'admin@gmail.com',NULL),(5,NULL,_binary '',NULL,'Nam',NULL,'$2a$10$8SeYfBIar3U2/0HQVNVnQe87X3G.eP7FUyYfm0G6vZwyY6fKSNtrq',NULL,NULL,NULL,'author@gmail.com',NULL),(9,NULL,_binary '',NULL,NULL,NULL,'$2a$10$ARkmaPdM6EPc8EDqXcG5o.sUewbeUlNrrW0/vCdMcHrvE7EjIK/o6',NULL,NULL,NULL,'chien9pm@gmail.com','Verified'),(10,NULL,_binary '\0',NULL,NULL,NULL,'$2a$10$3dT.vFY9hAutgsCylC3F6OfhM6Vg1dO3.67Z/ZD0dXmF9kwt1ZpZu',NULL,NULL,NULL,'user3@gmail.com','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5NzU5MDEiLCJpYXQiOjE2OTc1NTk4ODEsImV4cCI6MTY5NzU1OTk0MX0.nAfDKB_HQ9yXJ0KmSXokN8VPoEVcd2zE5wSfwm_AVgg'),(11,NULL,_binary '\0',NULL,NULL,NULL,'$2a$10$NaVetLzHPP2RjktwcwHiS.SWPoxOSMLYn9BTcaMFQsYQzB1aLijqG',NULL,NULL,NULL,'chien9pmt@gmail.com','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3NDM5MjQiLCJpYXQiOjE2OTc2MDg2MDgsImV4cCI6MTY5NzYwODY2OH0.JQvdkapnwcF2ou_BcGj0Kbx9R7LTn8ZiR3_KI1q_fcU');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1),(2,1),(3,1),(9,1),(10,1),(5,2),(4,3);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-21 21:05:44
