-- MySQL dump 10.13  Distrib 5.6.22, for osx10.8 (x86_64)
--
-- Host: 46.101.40.23    Database: projet_android
-- ------------------------------------------------------
-- Server version	5.5.47-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category_service`
--

DROP TABLE IF EXISTS `category_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_service` (
  `id_category_service` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `image` varchar(50) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `order` int(11) NOT NULL,
  PRIMARY KEY (`id_category_service`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_service`
--

LOCK TABLES `category_service` WRITE;
/*!40000 ALTER TABLE `category_service` DISABLE KEYS */;
INSERT INTO `category_service` VALUES (1,'Appliance Repair','1422618574serviceappliancerepair2x.jpg',1,3),(2,'Carpet Cleaning Service','1422868163.jpg',1,0),(3,'Electrical Services','1423488805.jpg',1,0),(4,'Garagedoor Service','1423488846.jpg',1,0),(5,'Handyman Service','1423488877.jpg',1,0),(6,'Heating & AC Service','1423488922.jpg',1,0),(7,'Holiday Lighting Service','1423488957.jpg',1,0),(8,'Housecleaning Service','1423488992.jpg',1,0),(9,'Plumbing Service','1423489020.jpg',1,0),(10,'Moving Service','1424064244.jpg',1,0),(11,'tests','1431684589.jpg',0,9),(12,'TIGER','1432386101.jpg',1,0),(13,'Test','1434546052.jpg',0,0),(14,'Travels','1438527158.jpg',0,0),(15,'Travels','1438529797.jpg',0,0);
/*!40000 ALTER TABLE `category_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commentaire` (
  `id_commentaire` int(11) NOT NULL AUTO_INCREMENT,
  `commentaire` varchar(255) NOT NULL,
  `id_service` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_commentaire`),
  KEY `fk_commentaire_service1_idx` (`id_service`),
  KEY `fk_commentaire_user1_idx` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaire`
--

LOCK TABLES `commentaire` WRITE;
/*!40000 ALTER TABLE `commentaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id_message` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `id_sender` int(11) NOT NULL,
  `id_reciver` int(11) NOT NULL,
  `readed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `readed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id_message`),
  KEY `fk_message_user1_idx` (`id_sender`),
  KEY `fk_message_user2_idx` (`id_reciver`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id_order` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_service` int(11) NOT NULL,
  `payment_code` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `code_valid` tinyint(1) NOT NULL DEFAULT '0',
  `created_dat` datetime DEFAULT NULL,
  PRIMARY KEY (`id_order`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  KEY `fk_user_has_service_service1_idx` (`id_service`),
  KEY `fk_user_has_service_user1_idx` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service` (
  `id_service` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `image` varchar(255) NOT NULL,
  `address` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `latitude` double NOT NULL,
  `longituge` double NOT NULL,
  `publication_date` datetime NOT NULL,
  `id_category_service` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `id_provider` int(11) NOT NULL,
  PRIMARY KEY (`id_service`,`id_provider`),
  KEY `fk_service_category_service_idx` (`id_category_service`),
  KEY `fk_service_user1_idx` (`id_provider`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'1','Test',55,'ima ',' ll','city',55,99,'0000-00-00 00:00:00',1,0,1),(2,'Service :P','description',22,'imqge.png','address','Montpellier',20.045545454,-81.02222556,'2016-04-17 03:39:14',1,1,1),(3,'demenagement','aide  audemagemen',50,'cam','avvenue paul valery','montpllier',55.2323,121.12151,'2016-04-17 03:54:53',2,1,2),(4,'demenagement','aide  audemagemen',50,'cam','avvenue paul valery','montpllier',55.2323,121.12151,'2016-04-17 03:55:08',2,1,2),(5,'demenagement','aide  audemagemen',50,'cam','avvenue paul valery','montpllier',55.2323,121.12151,'2016-04-17 03:56:57',2,1,2),(6,'demenagement','aide  audemagemen',50,'cam','avvenue paul valery','montpllier',55.2323,121.12151,'2016-04-17 17:18:42',2,1,2);
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `pseudo` varchar(45) NOT NULL,
  `password_hash` text NOT NULL,
  `api_key` varchar(32) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `pseudo_UNIQUE` (`pseudo`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'jimmy','ikbal','0651550144','myappeu@gmail.com','Jimka','$2a$10$2ad61e84c523bae253649uEYZmREK3Oaz8TT5jskCCfNojGQzWR4.','a0c6a95f7e8cd8f48e9e1ce5b3c6a264',1,'2016-04-17 02:43:17'),(2,'Mariam','Maiga','02555555','ikbal@gmail.com','bella','$2a$10$9af31c8cab50cfd913a76uYgw5dQRS6Vs8BTRHKH5Bn34Jk9vZVu.','3a426711d304594acb486a82de9376ce',1,'2016-04-17 06:52:16'),(6,'first_name','last_name','675657657','email@asasas.com','pseudo','$2a$10$f146b0a63d07c792d8bc4uRlaqDd9ZqkpTwxzG6LYZ3IEYUNgN6WW','5f86972545037e4bfd27a66f636b06d2',1,'2016-04-27 12:56:51'),(7,'ikb','gggj','0852','fvjjj@gmail.com','Jimmy','$2a$10$91de063b40a84715dd3d2e3R6l.yDK1v4eHjarY8bd1AcJLBQdFw6','3c0e9ae925cea8cad88ecca94491d79a',1,'2016-04-27 16:05:58');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'projet_android'
--

--
-- Dumping routines for database 'projet_android'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-02 16:14:24
