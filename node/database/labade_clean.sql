CREATE DATABASE  IF NOT EXISTS `reservaalmuerzos`  
USE `reservaalmuerzos`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: reservaalmuerzos
-- ------------------------------------------------------
-- Server version	8.0.33












--
-- Table structure for table `almuerzo`
--

DROP TABLE IF EXISTS `almuerzo`;


CREATE TABLE `almuerzo` (
  `ID_Almuerzo` int NOT NULL AUTO_INCREMENT,
  `ID_Comida` int NOT NULL,
  `ID_Postre` int DEFAULT NULL,
  `ID_Jugo` int DEFAULT NULL,
  `ID_Ensalada` int DEFAULT NULL,
  `PrecioTotal` int NOT NULL,
  PRIMARY KEY (`ID_Almuerzo`),
  KEY `ID_Comida` (`ID_Comida`),
  KEY `ID_Postre` (`ID_Postre`),
  KEY `ID_Jugo` (`ID_Jugo`),
  KEY `ID_Ensalada` (`ID_Ensalada`),
  CONSTRAINT `almuerzo_ibfk_1` FOREIGN KEY (`ID_Comida`) REFERENCES `comida` (`ID_Comida`),
  CONSTRAINT `almuerzo_ibfk_2` FOREIGN KEY (`ID_Postre`) REFERENCES `postre` (`ID_Postre`),
  CONSTRAINT `almuerzo_ibfk_3` FOREIGN KEY (`ID_Jugo`) REFERENCES `jugo` (`ID_Jugo`),
  CONSTRAINT `almuerzo_ibfk_4` FOREIGN KEY (`ID_Ensalada`) REFERENCES `ensalada` (`ID_Ensalada`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `almuerzo`
--

LOCK TABLES `almuerzo` WRITE;


UNLOCK TABLES;

--
-- Table structure for table `comida`
--

DROP TABLE IF EXISTS `comida`;


CREATE TABLE `comida` (
  `ID_Comida` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `ID_TipoComida` int DEFAULT NULL,
  `Descripcion` varchar(200) DEFAULT NULL,
  `Precio` int DEFAULT NULL,
  PRIMARY KEY (`ID_Comida`),
  KEY `ID_TipoComida` (`ID_TipoComida`),
  CONSTRAINT `comida_ibfk_1` FOREIGN KEY (`ID_TipoComida`) REFERENCES `tipocomida` (`ID_TipoComida`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `comida`
--

LOCK TABLES `comida` WRITE;

INSERT INTO `comida` VALUES (1,'Pollo Asado con Puré de Papas',1,'Pechuga de pollo marinada y asada acompañada de puré de papas cremoso.',4500),(2,'Ensalada César con Pollo',1,'Ensalada clásica con lechuga romana, crutones, queso parmesano y pollo a la plancha.',5200),(3,'Pastel de Choclo',1,'Base de carne y pollo con cebolla, cubierto con crema de choclo y horneado.',6900);

UNLOCK TABLES;

--
-- Table structure for table `ensalada`
--

DROP TABLE IF EXISTS `ensalada`;


CREATE TABLE `ensalada` (
  `ID_Ensalada` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` varchar(200) DEFAULT NULL,
  `Precio` int DEFAULT NULL,
  PRIMARY KEY (`ID_Ensalada`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `ensalada`
--

LOCK TABLES `ensalada` WRITE;

INSERT INTO `ensalada` VALUES (1,'Ensalada Chilena','Ensalada de tomates, cebolla y cilantro, aderezada con aceite de oliva.',1800);

UNLOCK TABLES;

--
-- Table structure for table `estadopedido`
--

DROP TABLE IF EXISTS `estadopedido`;


CREATE TABLE `estadopedido` (
  `ID_Estado` int NOT NULL AUTO_INCREMENT,
  `Estado` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_Estado`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `estadopedido`
--

LOCK TABLES `estadopedido` WRITE;

INSERT INTO `estadopedido` VALUES (1,'Pendiente'),(2,'En Preparación'),(3,'Listo para Entrega'),(4,'Entregado'),(5,'Cancelado');

UNLOCK TABLES;

--
-- Table structure for table `jugo`
--

DROP TABLE IF EXISTS `jugo`;


CREATE TABLE `jugo` (
  `ID_Jugo` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` varchar(200) DEFAULT NULL,
  `Precio` int DEFAULT NULL,
  PRIMARY KEY (`ID_Jugo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `jugo`
--

LOCK TABLES `jugo` WRITE;

INSERT INTO `jugo` VALUES (1,'Jugo de Naranja','Jugo de naranja natural exprimido.',1000);

UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;


CREATE TABLE `pedido` (
  `ID_Pedido` int NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int NOT NULL,
  `ID_Almuerzo` int NOT NULL,
  `ID_Estado` int NOT NULL,
  `FechaPedido` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_Pedido`),
  KEY `ID_Usuario` (`ID_Usuario`),
  KEY `ID_Almuerzo` (`ID_Almuerzo`),
  KEY `ID_Estado` (`ID_Estado`),
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuario` (`ID_Usuario`),
  CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`ID_Almuerzo`) REFERENCES `almuerzo` (`ID_Almuerzo`),
  CONSTRAINT `pedido_ibfk_3` FOREIGN KEY (`ID_Estado`) REFERENCES `estadopedido` (`ID_Estado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;


UNLOCK TABLES;

--
-- Table structure for table `postre`
--

DROP TABLE IF EXISTS `postre`;


CREATE TABLE `postre` (
  `ID_Postre` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` varchar(200) DEFAULT NULL,
  `Precio` int DEFAULT NULL,
  PRIMARY KEY (`ID_Postre`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `postre`
--

LOCK TABLES `postre` WRITE;

INSERT INTO `postre` VALUES (1,'Leche Asada','Postre típico chileno horneado a base de leche, huevos y azúcar.',1500);

UNLOCK TABLES;

--
-- Table structure for table `tipocomida`
--

DROP TABLE IF EXISTS `tipocomida`;


CREATE TABLE `tipocomida` (
  `ID_TipoComida` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID_TipoComida`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `tipocomida`
--

LOCK TABLES `tipocomida` WRITE;

INSERT INTO `tipocomida` VALUES (1,'Normal','Comida estándar sin restricciones.'),(2,'Vegetariano','Comida sin carne.'),(3,'Hipocalórico','Comida baja en calorías.');

UNLOCK TABLES;

--
-- Table structure for table `tipocuenta`
--

DROP TABLE IF EXISTS `tipocuenta`;


CREATE TABLE `tipocuenta` (
  `ID_TipoCuenta` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID_TipoCuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `tipocuenta`
--

LOCK TABLES `tipocuenta` WRITE;

INSERT INTO `tipocuenta` VALUES (1,'Administrador','Gestión completa del sistema.'),(2,'Usuario','Cliente que realiza reservas de almuerzos.'),(3,'Cocinero','Usuario que solo puede ver y gestionar los pedidos.');

UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;


CREATE TABLE `usuario` (
  `ID_Usuario` int NOT NULL AUTO_INCREMENT,
  `PrimerNombre` varchar(50) NOT NULL,
  `ApellidoPaterno` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Contraseña` varchar(100) NOT NULL,
  `ID_TipoCuenta` int DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`ID_Usuario`),
  UNIQUE KEY `Email` (`Email`),
  KEY `ID_TipoCuenta` (`ID_TipoCuenta`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`ID_TipoCuenta`) REFERENCES `tipocuenta` (`ID_TipoCuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;

INSERT INTO `usuario` VALUES (1,'Juan','Pérez','juan.perez@gmail.com','12345',2,'912345678'),(2,'Ana','Torres','ana.torres@gmail.com','67890',1,'912345679'),(3,'Roberto','Díaz','roberto.diaz@gmail.com','abcde',3,'912345670');

UNLOCK TABLES;










-- Dump completed on 2024-10-01 10:08:36
