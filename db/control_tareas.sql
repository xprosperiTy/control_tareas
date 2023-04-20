-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2023 at 06:20 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `control_tareas`
--

-- --------------------------------------------------------

--
-- Table structure for table `tareas`
--

CREATE TABLE `tareas` (
  `id` int(11) NOT NULL,
  `titulo` text NOT NULL,
  `descripcion` text NOT NULL,
  `status` text NOT NULL,
  `fecha_entrega` date NOT NULL,
  `comentarios` text NOT NULL,
  `responsable` int(11) NOT NULL,
  `tags` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tareas`
--

INSERT INTO `tareas` (`id`, `titulo`, `descripcion`, `status`, `fecha_entrega`, `comentarios`, `responsable`, `tags`) VALUES
(1, 'Ensayo', 'Realizar un ensayo sobre la naturaleza', 'En proceso', '2023-04-19', 'se hara de 30 hojas', 1, '#literatura #letras'),
(2, 'Comprar alimentos', 'Comprar ', 'En proceso', '2023-04-20', '', 1, '#comida'),
(3, 'Investigar sobre la IA', 'Metodos para la creacion de IA', 'Casi terminado', '2023-04-20', '', 2, '#IA'),
(5, 'RTB', 'RTB', 'Completada', '2023-04-20', '1', 2, '#rtb'),
(7, 'fg', 'fg', 'Casi completo', '2023-04-20', '1', 2, '#fg'),
(8, 'fg', 'fg', 'Completado', '2023-04-20', '1', 2, '#fg'),
(9, 'd', 'fe', 'Completado', '2023-04-20', '5', 2, ''),
(10, 'Llenar formularios', 'Llenar', 'Completado', '2023-04-20', '1', 1, '#llenar');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `correo` text NOT NULL,
  `contrasenia` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `contrasenia`) VALUES
(1, 'Herson A.', 'hersonjehovani@gmail.com', '567'),
(2, 'Pedro', 'pedrohdz@gmail.com', '890'),
(3, 'Juan Ortiz', 'juanortz13@hotmail.com', '890'),
(4, 'Raul Garfias', 'raulgarf@hotmail.com', '456'),
(5, 'Gabriel Ramos', 'gaboram@hotmail.com', '345');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `responsable` (`responsable`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`responsable`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
