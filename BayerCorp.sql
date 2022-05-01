-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 30-04-2022 a las 22:56:19
-- Versión del servidor: 8.0.28-0ubuntu0.20.04.3
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `BayerCorp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Auto`
--

CREATE TABLE `Auto` (
  `idAuto` int NOT NULL,
  `Color` varchar(10) NOT NULL,
  `Tipo_Vehiculo` varchar(8) DEFAULT NULL,
  `Placa` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Auto`
--

INSERT INTO `Auto` (`idAuto`, `Color`, `Tipo_Vehiculo`, `Placa`) VALUES
(1, 'Blue', 'Sedan', 'AABB11'),
(2, 'Red', 'Coupe', 'AABB22'),
(3, 'Yellow', 'F-350', 'AABB33'),
(4, 'Green', 'Coupe', 'AABB44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Auto_Vivienda`
--

CREATE TABLE `Auto_Vivienda` (
  `Auto_idAuto` int NOT NULL,
  `Vivienda_idVivienda` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Auto_Vivienda`
--

INSERT INTO `Auto_Vivienda` (`Auto_idAuto`, `Vivienda_idVivienda`) VALUES
(1, 1),
(2, 2),
(4, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Ingreso`
--

CREATE TABLE `Ingreso` (
  `idIngreso` int NOT NULL,
  `Fecha_y_hora` datetime NOT NULL,
  `Comentario` text,
  `idVivienda` int NOT NULL,
  `idAuto` int DEFAULT NULL,
  `Placa` varchar(10) NOT NULL,
  `Color` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Ingreso`
--

INSERT INTO `Ingreso` (`idIngreso`, `Fecha_y_hora`, `Comentario`, `idVivienda`, `idAuto`, `Placa`, `Color`) VALUES
(1, '2022-04-29 21:53:00', 'Vehículo se dirige por 3 horas a la Vivienda 5', 5, NULL, 'AABB66', 'Red'),
(2, '2022-04-29 22:54:00', NULL, 2, 2, 'AABB22', 'Red'),
(3, '2022-04-29 21:54:48', 'Vehiculo con conductor ebrio.', 1, 1, 'AABB11', 'Blue');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Vivienda`
--

CREATE TABLE `Vivienda` (
  `idVivienda` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Vivienda`
--

INSERT INTO `Vivienda` (`idVivienda`) VALUES
(1),
(2),
(3),
(4),
(5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Auto`
--
ALTER TABLE `Auto`
  ADD PRIMARY KEY (`idAuto`),
  ADD UNIQUE KEY `idAuto_UNIQUE` (`idAuto`),
  ADD UNIQUE KEY `Placa_UNIQUE` (`Placa`);

--
-- Indices de la tabla `Auto_Vivienda`
--
ALTER TABLE `Auto_Vivienda`
  ADD PRIMARY KEY (`Auto_idAuto`,`Vivienda_idVivienda`),
  ADD KEY `fk_Auto_has_Vivienda_Vivienda1_idx` (`Vivienda_idVivienda`),
  ADD KEY `fk_Auto_has_Vivienda_Auto1_idx` (`Auto_idAuto`);

--
-- Indices de la tabla `Ingreso`
--
ALTER TABLE `Ingreso`
  ADD PRIMARY KEY (`idIngreso`,`idVivienda`),
  ADD UNIQUE KEY `idIngreso_UNIQUE` (`idIngreso`),
  ADD KEY `fk_Ingreso_Vivienda1_idx` (`idVivienda`),
  ADD KEY `fk_Ingreso_Auto1_idx` (`idAuto`);

--
-- Indices de la tabla `Vivienda`
--
ALTER TABLE `Vivienda`
  ADD PRIMARY KEY (`idVivienda`),
  ADD UNIQUE KEY `idVivienda_UNIQUE` (`idVivienda`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Ingreso`
--
ALTER TABLE `Ingreso`
  MODIFY `idIngreso` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Auto_Vivienda`
--
ALTER TABLE `Auto_Vivienda`
  ADD CONSTRAINT `fk_Auto_has_Vivienda_Auto1` FOREIGN KEY (`Auto_idAuto`) REFERENCES `Auto` (`idAuto`),
  ADD CONSTRAINT `fk_Auto_has_Vivienda_Vivienda1` FOREIGN KEY (`Vivienda_idVivienda`) REFERENCES `Vivienda` (`idVivienda`);

--
-- Filtros para la tabla `Ingreso`
--
ALTER TABLE `Ingreso`
  ADD CONSTRAINT `fk_Ingreso_Auto1` FOREIGN KEY (`idAuto`) REFERENCES `Auto` (`idAuto`),
  ADD CONSTRAINT `fk_Ingreso_Vivienda1` FOREIGN KEY (`idVivienda`) REFERENCES `Vivienda` (`idVivienda`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
