-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2022 at 01:29 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tasks`
--

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(11) NOT NULL,
  `title` varchar(60) DEFAULT 'Untitled',
  `note` varchar(1000) DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `status` enum('In Progress','Done','Overdue') NOT NULL DEFAULT 'In Progress',
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `title`, `note`, `deadline`, `status`, `user_id`) VALUES
(1, 'Task Two Edit', 'Description for Task One', '2022-09-08 17:26:47', 'Done', 2),
(2, 'Task Three Edit Twice', 'Description for Task Three', '2022-10-01 23:00:00', 'In Progress', 3),
(4, 'Task Four', 'Description for Task Four', '2022-09-14 02:35:20', 'Done', 3),
(5, 'Task Six Edited', 'Note for task 6', '0000-00-00 00:00:00', 'Overdue', 3),
(6, 'Task Seven', 'Update description for task seven', '0000-00-00 00:00:00', 'Done', 3),
(9, 'New Task', 'Okay', '2022-09-28 22:30:00', 'In Progress', 2),
(10, 'First Task', 'user 6', '2022-10-01 22:23:17', 'Done', 6),
(11, 'Create Directions.txt', 'Add instructions', '2022-09-20 23:30:00', 'Done', 14),
(12, 'Export Database', '', '2022-09-28 14:30:00', 'Done', 14),
(13, 'Deploy to Github', '', '0000-00-00 00:00:00', 'Overdue', 14);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `full_name`, `email`, `password`) VALUES
(1, 'User One', 'one@user.com', 'user123'),
(2, 'User Two', 'two@user.com', '$2b$10$ReDh4Y7Wr67OscXLr3ErHOcLUUioUf1v.0YQH09q/kCWVXSRHoBte'),
(3, 'User Three', 'three@user.com', '$2b$10$EP0FklPqh6BLn2mv25ry5e9Gcs4BbtrsNFliZKN4dq236z80pLJWK'),
(4, 'Four', 'four@user.com', '$2b$10$hS.M7sBUVQgyanTq3Z3fVuplL8qCycklEd8lCl70gIGQNj0hIkFey'),
(5, 'User Five', 'five@user.com', '$2b$10$laWLM3STLdLivHzNRhu.tOvDwcCUiQZstNwuOJKdwbacE/03pSnMa'),
(6, 'User Six', 'six@user.com', '$2b$10$DzrRYeGlXzDZqCBfYiDBZew5WKE98XQZjvZxB9AyV3quNqZYjL5zS'),
(7, 'User Seven', 'seven@user.com', '$2b$10$idU62HF5MBz4Kfk75gLT2.whxtT2QTrMacg9vFD/bKBa9/eBMtfx2'),
(8, 'User Eight', 'eight@user.com', '$2b$10$iA/bMwHJ20PbU9c1rIseROI7LzwLenNeFq/pCQ4KyTjlZ7L5LwpI6'),
(9, 'User Nine', 'ninth@user.com', '$2b$10$mz1yxx0iM2paNJ5Rh8VBNecYSis.ijrEJO/52pjdipRBG22TiYtv2'),
(10, 'User Ten', 'ten@user.com', '$2b$10$xIg4Pi53Dhc5rVved4YXiuCNi.2lTSYsGPCg5WkUoluJRrIOe07PG'),
(11, 'User Eleven', 'eleven@user.com', '$2b$10$gIt0ef5ScNJdVAin1.nZJe5pYM1RiFyF9CyerIaDw6mXrpPrSoXIq'),
(12, 'User Twelve', 'twelve@user.com', '$2b$10$ff6S2wpaxZyf4G4CoU1fwOCgNVrEl/srJvOrUQ/Zon7cw5yqj2HuS'),
(13, 'User Thirteen', 'thirteen@user.com', '$2b$10$yab438gOLJOnEQXkAP79MOD3V56WqCGD32OPFSXRz1PkiRMj78Lwy'),
(14, 'Mariefher Grace Villanueva', 'mariefherv@gmail.com', '$2b$10$Z7T6fftyLhEYrN37G3R3n.4RfcuRxtoChCesjUdEcr6FmIoMbOPuy');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `FK` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
