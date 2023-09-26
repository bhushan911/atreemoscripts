-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: atreemo
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `leadsfact`
--

DROP TABLE IF EXISTS `leadsfact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leadsfact` (
  `LeadsFactID` int NOT NULL,
  `LeadID` int DEFAULT NULL,
  `CtcID` int DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreatedBy` text,
  `ClaimedBy` text,
  `CategoryName` text,
  `SubCategoryName` text,
  `Status` text,
  `IsWalkin` tinyint DEFAULT NULL,
  `LeadSource` text,
  `Revenue` double DEFAULT NULL,
  `PostSaesCallDate` datetime DEFAULT NULL,
  `SiteID` int DEFAULT NULL,
  `SiteName` text,
  `Region` text,
  `FollowUpDate` datetime DEFAULT NULL,
  `SourceName` text,
  `Priority` text,
  `EventDate` datetime DEFAULT NULL,
  `EventEndDate` datetime DEFAULT NULL,
  `ProvisionalEventDate` datetime DEFAULT NULL,
  `ProvisionalEventEndDate` datetime DEFAULT NULL,
  `SaleType` text,
  `EstimatedRevenue` double DEFAULT NULL,
  `CallMade` tinyint DEFAULT NULL,
  `ClaimedDate` datetime DEFAULT NULL,
  `FirstCallDate` datetime DEFAULT NULL,
  `FirstCallMadeBy` text,
  `FirstCallType` text,
  `LastCallDate` datetime DEFAULT NULL,
  `LastCallMadeBy` text,
  `LastCallType` text,
  `AppointmentDate` datetime DEFAULT NULL,
  `Brand` text,
  `MasterID` int DEFAULT NULL,
  `IsMaster` tinyint DEFAULT NULL,
  `LastModifiedOn` datetime DEFAULT NULL,
  `Deleted` tinyint DEFAULT NULL,
  `ModifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`LeadsFactID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-26 16:06:29
