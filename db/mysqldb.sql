-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Aug 18, 2020 at 08:49 AM
-- Server version: 5.7.31
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+09:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mysqldb`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` bigint(20) NOT NULL,
  `firstName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `lastReview` int(11) DEFAULT NULL,
  `manager` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `firstName`, `lastName`, `email`, `lastReview`, `manager`) VALUES
(8, 'Tamer', 'Elsayed', 't.elsay3d@gmail.com', NULL, '西村圭太'),
(9, 'Ron', 'Sullivan', 'ron.sullivan@company.com', NULL, 'Gertrude Elliott'),
(10, 'Lucas', 'Mckinney', 'Lucas.mckinney@company.com', NULL, 'S. Smith'),
(11, 'John', 'Smith', 'john@company.com', NULL, 'Will Kross'),
(12, 'Charlie', 'Schmidt', 'charlie.schmidt@company.com', NULL, 'Gertrude Elliott');

-- --------------------------------------------------------

--
-- Table structure for table `reviewer_employee`
--

CREATE TABLE `reviewer_employee` (
  `employee` bigint(20) NOT NULL,
  `reviewer` bigint(20) NOT NULL,
  `reviewId` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) NOT NULL,
  `date` int(11) NOT NULL,
  `manager` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `employee` bigint(20) NOT NULL,
  `review` varchar(10000) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `reviewer_employee`
--
ALTER TABLE `reviewer_employee`
  ADD KEY `employee` (`employee`),
  ADD KEY `reviewer` (`reviewer`),
  ADD KEY `reviewId` (`reviewId`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee` (`employee`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reviewer_employee`
--
ALTER TABLE `reviewer_employee`
  ADD CONSTRAINT `reviewer_employee_ibfk_1` FOREIGN KEY (`employee`) REFERENCES `employees` (`id`),
  ADD CONSTRAINT `reviewer_employee_ibfk_2` FOREIGN KEY (`reviewer`) REFERENCES `employees` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`id`) REFERENCES `reviewer_employee` (`reviewId`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
