-- MySQL dump 10.13  Distrib 9.2.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: edunori_dev
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `edunori_dev`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `edunori_dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `edunori_dev`;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_dcd0c8a4b10af9c986e510b9ec` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'gulin9717@gmail.com','imadmin','MATROZIYEVA GULCHIROY','admin','2025-04-14 13:47:06.324396','2025-04-14 13:47:06.324396'),(3,'matroziyevaguli@gmail.com','$2b$10$haW37On08HOa4A2KjZjr/usiV.nixO2yB/j5ZgwEGoQMBvKfGlRau','Guli Admin','admin','2025-04-14 14:18:32.354627','2025-04-14 14:18:32.354627'),(4,'admin@example.com','$2b$10$UOdyUsy8c4YO/Rf6K9mM8OUVmuInlCcugSGlsQY76KHLbl6.JgiZ.','Jane Admin','admin','2025-04-14 15:14:34.234887','2025-04-14 15:14:34.234887'),(6,'adminAki@keymedia.co.kr','$2b$10$T3N/KEqd5uIBnh4bM66Ir.K4npM.PgFPMtIZDvc61z6yaufCNJA6e','Aki Admin','admin','2025-04-14 15:39:58.047350','2025-04-14 15:39:58.047350');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interest_fields`
--

DROP TABLE IF EXISTS `interest_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interest_fields` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_code` int unsigned NOT NULL,
  `category_name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interest_fields`
--

LOCK TABLES `interest_fields` WRITE;
/*!40000 ALTER TABLE `interest_fields` DISABLE KEYS */;
INSERT INTO `interest_fields` VALUES (1,'Ai and smnth',0,''),(2,'AI & Robotics',0,''),(3,'Aki',0,'');
/*!40000 ALTER TABLE `interest_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_interest`
--

DROP TABLE IF EXISTS `user_interest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_interest` (
  `interest_id` int NOT NULL,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`,`interest_id`),
  KEY `IDX_f28696ef036bbcf2da3dad24b4` (`user_id`),
  KEY `IDX_9725646cb2c0e9c6e14fa9ea05` (`interest_id`),
  CONSTRAINT `FK_9725646cb2c0e9c6e14fa9ea052` FOREIGN KEY (`interest_id`) REFERENCES `interest_fields` (`id`),
  CONSTRAINT `FK_f28696ef036bbcf2da3dad24b4f` FOREIGN KEY (`user_id`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_interest`
--

LOCK TABLES `user_interest` WRITE;
/*!40000 ALTER TABLE `user_interest` DISABLE KEYS */;
INSERT INTO `user_interest` VALUES (1,'2d543574-50ee-46f6-b2fa-64d45267da88'),(1,'eddc3205-7bb8-4ed2-a53e-dda0cc7ad1c6'),(2,'2d543574-50ee-46f6-b2fa-64d45267da88'),(2,'eddc3205-7bb8-4ed2-a53e-dda0cc7ad1c6'),(3,'2d543574-50ee-46f6-b2fa-64d45267da88'),(3,'eddc3205-7bb8-4ed2-a53e-dda0cc7ad1c6');
/*!40000 ALTER TABLE `user_interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `uid` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` char(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address1` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_v4` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipcode` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `join_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `last_login` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `login_cnt` int unsigned NOT NULL DEFAULT '0',
  `leave_date` datetime DEFAULT NULL,
  `outmemo` text COLLATE utf8mb4_unicode_ci,
  `refresh_token` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `IDX_6425135effde2ab8322f846493` (`provider_id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2d543574-50ee-46f6-b2fa-64d45267da88','key_edu','testkey','테스터','testkey@keymedia.co.kr','','010-1234-0000',NULL,NULL,NULL,'1.222.123.226',NULL,'2025-04-15 10:07:28.672376','2025-04-15 10:08:13.825000',2,NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyZDU0MzU3NC01MGVlLTQ2ZjYtYjJmYS02NGQ0NTI2N2RhODgiLCJpYXQiOjE3NDQ2NzkyOTMsImV4cCI6MTc0NzI3MTI5M30.dEGH_xf5PUQU2DllHwVq082C4A4gJ8vHi6oAnrT2Now'),('eddc3205-7bb8-4ed2-a53e-dda0cc7ad1c6','kakao','4101648104','김기중','englishbus@keymedia.co.kr',NULL,'',NULL,NULL,NULL,NULL,NULL,'2025-04-14 13:28:11.774423','2025-04-15 10:06:37.803000',6,NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJlZGRjMzIwNS03YmI4LTRlZDItYTUzZS1kZGEwY2M3YWQxYzYiLCJpYXQiOjE3NDQ2NzkxOTcsImV4cCI6MTc0NzI3MTE5N30.r23aPPFnBJth2YdnboGc3CXpJFfMYVz3gPazzKZEKFM');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-16 12:57:19
