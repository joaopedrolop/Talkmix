-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: talkmix
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarios` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Comentario` varchar(280) NOT NULL,
  `Data_comentario` datetime NOT NULL,
  `Usuario_ID` int NOT NULL,
  `Livros_ID` int NOT NULL,
  PRIMARY KEY (`ID`,`Usuario_ID`,`Livros_ID`),
  KEY `fk_Comentarios_Usuario_idx` (`Usuario_ID`),
  KEY `fk_Comentarios_Livros1_idx` (`Livros_ID`),
  CONSTRAINT `fk_Comentarios_Livros1` FOREIGN KEY (`Livros_ID`) REFERENCES `livros` (`ID`),
  CONSTRAINT `fk_Comentarios_Usuario` FOREIGN KEY (`Usuario_ID`) REFERENCES `usuario` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
INSERT INTO `comentarios` VALUES (1,'Excelente livro, recomendo!','2025-12-01 14:30:00',1,1),(2,'Muito interessante e bem escrito.','2025-12-02 10:15:00',2,2),(3,'Achei a história meio lenta.','2025-12-03 16:20:00',3,3),(4,'Receitas ótimas, funcionam mesmo!','2025-12-04 18:00:00',4,4);
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leituras`
--

DROP TABLE IF EXISTS `leituras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leituras` (
  `idLeituras` int NOT NULL AUTO_INCREMENT,
  `Data_leitura` datetime NOT NULL,
  `Usuario_ID` int NOT NULL,
  `Livros_ID` int NOT NULL,
  PRIMARY KEY (`idLeituras`,`Usuario_ID`,`Livros_ID`),
  KEY `fk_Leituras_Usuario1_idx` (`Usuario_ID`),
  KEY `fk_Leituras_Livros1_idx` (`Livros_ID`),
  CONSTRAINT `fk_Leituras_Livros1` FOREIGN KEY (`Livros_ID`) REFERENCES `livros` (`ID`),
  CONSTRAINT `fk_Leituras_Usuario1` FOREIGN KEY (`Usuario_ID`) REFERENCES `usuario` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leituras`
--

LOCK TABLES `leituras` WRITE;
/*!40000 ALTER TABLE `leituras` DISABLE KEYS */;
INSERT INTO `leituras` VALUES (1,'2025-11-01 09:00:00',1,1),(2,'2025-11-05 17:00:00',2,2),(3,'2025-11-10 20:30:00',3,3),(4,'2025-11-15 14:00:00',4,4);
/*!40000 ALTER TABLE `leituras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livros`
--

DROP TABLE IF EXISTS `livros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livros` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ISBN` varchar(15) NOT NULL,
  `Titulo` varchar(255) NOT NULL,
  `Autor` varchar(255) NOT NULL,
  `Editora` varchar(255) DEFAULT NULL,
  `Data_publicacao` datetime DEFAULT NULL,
  `Sinopse` varchar(255) DEFAULT NULL,
  `Numero_pagina` int DEFAULT NULL,
  `Genero` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ISBN_UNIQUE` (`ISBN`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livros`
--

LOCK TABLES `livros` WRITE;
/*!40000 ALTER TABLE `livros` DISABLE KEYS */;
INSERT INTO `livros` VALUES (1,'9780000000011','O Mundo Invisível','João Ribeiro','Editora Alfa','2020-05-12 00:00:00','Um romance sobre descobertas.',320,'Ficção'),(2,'9780000000012','A Arte da Lógica','Maria Duarte','Editora Beta','2018-09-20 00:00:00','Introdução acessível à lógica.',210,'Educação'),(3,'9780000000013','O Último Horizonte','Paulo Lima','Editora Gama','2022-01-15 00:00:00','Sci-fi sobre mundos distantes.',410,'Ficção Científica'),(4,'9780000000014','Culinária Fácil','Fernanda Costa','Editora Delta','2019-11-05 00:00:00','Receitas práticas para o dia a dia.',150,'Culinária');
/*!40000 ALTER TABLE `livros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meta`
--

DROP TABLE IF EXISTS `meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meta` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `N_livros_meta` int NOT NULL,
  `N_livros_lidos_periodo` int NOT NULL,
  `Data_criacao_meta` datetime NOT NULL,
  `Data_finalização_meta` datetime NOT NULL,
  `Usuario_ID` int NOT NULL,
  PRIMARY KEY (`ID`,`Usuario_ID`),
  KEY `fk_Meta_Usuario1_idx` (`Usuario_ID`),
  CONSTRAINT `fk_Meta_Usuario1` FOREIGN KEY (`Usuario_ID`) REFERENCES `usuario` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meta`
--

LOCK TABLES `meta` WRITE;
/*!40000 ALTER TABLE `meta` DISABLE KEYS */;
INSERT INTO `meta` VALUES (1,10,3,'2025-01-01 10:00:00','2025-12-31 23:59:59',1),(2,20,12,'2025-02-05 09:30:00','2025-12-20 23:59:59',2),(3,5,3,'2025-03-10 15:00:00','2025-12-10 23:59:59',3),(4,8,0,'2025-04-01 11:00:00','2025-12-25 23:59:59',4);
/*!40000 ALTER TABLE `meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(225) NOT NULL,
  `Sobrenome` varchar(225) NOT NULL,
  `Senha` varchar(225) NOT NULL,
  `Email` varchar(225) NOT NULL,
  `N_livros_lidos` int DEFAULT NULL,
  `Ultimo_login` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Ana','Silva','senha123','ana.silva@example.com',5,'2025-11-10'),(2,'Bruno','Souza','senha456','bruno.souza@example.com',12,'2025-11-20'),(3,'Carla','Oliveira','senha789','carla.oliveira@example.com',3,'2025-12-01'),(4,'Diego','Pereira','senha000','diego.pereira@example.com',0,'2025-10-03');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-05 13:24:13
