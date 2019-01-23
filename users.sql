-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2019 at 05:36 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dob` date NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `loggedIn` int(11) NOT NULL DEFAULT '0',
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `Email`, `Password`, `dateCreated`, `dob`, `Gender`, `loggedIn`, `isAdmin`) VALUES
(1, 'Ashish', 'Subedi', 'ashishsubedi10@gmail.com', '123456789', '2018-12-08 00:00:00', '0000-00-00', '0', 0, 0),
(3, 'Neha', 'Malla', 'nehamalla99@gmail.com', 'iamdumbass', '2018-12-08 01:08:12', '0000-00-00', '0', 0, 0),
(4, 'Rashika', 'Karki', 'rashikakarki9841@gmail.com', 'iamrashika', '2018-12-08 01:08:12', '0000-00-00', '0', 0, 0),
(8, 'Neha ', 'Malla', 'iamdumbass@gmail.com', 'iamdumbassssss', '0000-00-00 00:00:00', '0000-00-00', 'on', 0, 0),
(10, 'Neha', 'Malla', 'iamdumbass@gmail.com', 'iamdumbasssss', '0000-00-00 00:00:00', '0000-00-00', 'male', 0, 0),
(11, 'Ashish', 'Subedi', 'asd@da.cs', 'asdasdasd', '0000-00-00 00:00:00', '0000-00-00', 'male', 0, 0),
(16, 'Neha', 'Mata', 'ihateyou@gmail.com', 'dumbestperosnEverrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', '2018-12-10 18:16:33', '2018-12-04', 'others', 0, 0),
(17, 'Prithivi', 'Shrestha', 'prithivi@gmail.com', 'asdasdasda', '2018-12-12 05:20:32', '0000-00-00', 'male', 0, 0),
(19, 'test', 'test', 'test@test.test', 'teasdteatasfa', '2018-12-17 09:04:34', '0000-00-00', 'male', 0, 0),
(20, 'test', 'test', 'test@test.test', '', '2018-12-17 09:08:43', '0000-00-00', 'male', 0, 0),
(21, 'ASdasd', 'asdasd', 'asdasd@gma.c', 'asdasdsa', '2018-12-18 04:35:59', '2018-12-06', 'male', 0, 0),
(22, 'Tew', 'teas', 'asdasd@gma.c', 'asdasd', '2018-12-18 05:05:32', '0000-00-00', 'male', 0, 0),
(23, 'Nischal', 'Bhandari', 'nbhn333@gmail.com', 'qwertyuiop', '2018-12-25 18:30:34', '2000-07-09', 'male', 0, 0),
(25, 'Ashish', 'Subedi', 'ashishsubedi@gmail.com', '$2a$08$x.6UJiIOgjPovBbzeLAIOuj5lgr3mI.PNlvrqPc.j7nwM5r5nxakO', '2019-01-17 11:22:29', '0000-00-00', 'male', 0, 0),
(26, 'Neha', 'Malla', 'nehamalla@gmail.com', '$2a$08$kYtZGgNB9NtzpWzqVIokLOLr2jDq.iypg/yDyfHFh1ejQlXyY.3o6', '2019-01-17 11:25:40', '2019-01-16', 'male', 1, 1),
(27, 'Ashish ', 'Subedi', 'ashishsubedi10@gmail.com', '$2a$08$JAKiSepdenq3JAbxs/8bpeoAHFRCl1OlW4SuAdpHpfDC4iS5BMJ2K', '2019-01-20 14:22:17', '2019-01-07', 'male', 0, 0),
(28, 'Neha', 'Malla', 'nehamalla@gmail.com', '$2a$08$Y1c9dB9UshRVMCrVI9xa6eBjCSThr/L4spN3hbaJzXyZrI1AXUZZi', '2019-01-20 14:23:37', '2019-01-08', 'male', 0, 0),
(29, 'Neha', 'Malla', 'nehamalla@gmail.com', '$2a$08$UPl5b0XwESqzUQyN8LxYsOsWVs.5OrA9Zs85lBBvPIlZv9jVKMKmC', '2019-01-20 14:24:26', '2019-01-08', 'male', 0, 0),
(30, 'Neh', 'Mal', 'nehamalla@gmail.com', '$2a$08$R2GLkSNhfdPYdHA77JamKuf9kKBjM0vnJa/uu3WKTrZNzZGdoHV..', '2019-01-20 14:24:57', '2019-01-02', 'male', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
