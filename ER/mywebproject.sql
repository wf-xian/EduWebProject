/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : mywebproject

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2019-01-12 12:55:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for fmessage
-- ----------------------------
DROP TABLE IF EXISTS `fmessage`;
CREATE TABLE `fmessage` (
  `FMNo` int(11) NOT NULL AUTO_INCREMENT,
  `FromNo` varchar(20) NOT NULL,
  `ToNo` varchar(20) NOT NULL,
  `DateTime` datetime NOT NULL,
  `Message` varchar(500) NOT NULL,
  PRIMARY KEY (`FMNo`),
  KEY `fmessage_ibfk_1` (`FromNo`),
  KEY `fmessage_ibfk_2` (`ToNo`),
  CONSTRAINT `fmessage_ibfk_1` FOREIGN KEY (`FromNo`) REFERENCES `usertable` (`UNo`),
  CONSTRAINT `fmessage_ibfk_2` FOREIGN KEY (`ToNo`) REFERENCES `usertable` (`UNo`)
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for friends
-- ----------------------------
DROP TABLE IF EXISTS `friends`;
CREATE TABLE `friends` (
  `UFNo` int(11) NOT NULL AUTO_INCREMENT,
  `UNo` varchar(20) NOT NULL,
  `FNo` varchar(20) NOT NULL,
  `State` varchar(15) NOT NULL,
  `isChatting` varchar(20) NOT NULL DEFAULT '',
  `unRead` int(11) DEFAULT '0',
  PRIMARY KEY (`UFNo`),
  KEY `friends_ibfk_1` (`UNo`),
  KEY `friends_ibfk_2` (`FNo`),
  CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`UNo`) REFERENCES `usertable` (`UNo`),
  CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`FNo`) REFERENCES `usertable` (`UNo`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for gmessage
-- ----------------------------
DROP TABLE IF EXISTS `gmessage`;
CREATE TABLE `gmessage` (
  `GMSNo` int(11) NOT NULL AUTO_INCREMENT,
  `GNo` int(11) unsigned zerofill NOT NULL,
  `FromNo` varchar(20) NOT NULL,
  `DateTime` datetime NOT NULL,
  `Message` varchar(500) NOT NULL,
  PRIMARY KEY (`GMSNo`),
  KEY `GNo` (`GNo`),
  CONSTRAINT `gmessage_ibfk_1` FOREIGN KEY (`GNo`) REFERENCES `grouptable` (`GNo`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for groupmembers
-- ----------------------------
DROP TABLE IF EXISTS `groupmembers`;
CREATE TABLE `groupmembers` (
  `GMNo` int(11) NOT NULL AUTO_INCREMENT,
  `GNo` int(11) unsigned zerofill NOT NULL,
  `UNo` varchar(20) NOT NULL,
  `State` varchar(15) NOT NULL,
  `isChatting` varchar(20) NOT NULL,
  `unRead` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`GMNo`),
  KEY `UNo` (`UNo`),
  KEY `GNo` (`GNo`) USING BTREE,
  CONSTRAINT `groupmembers_ibfk_1` FOREIGN KEY (`GNo`) REFERENCES `grouptable` (`GNo`),
  CONSTRAINT `groupmembers_ibfk_2` FOREIGN KEY (`UNo`) REFERENCES `usertable` (`UNo`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for grouptable
-- ----------------------------
DROP TABLE IF EXISTS `grouptable`;
CREATE TABLE `grouptable` (
  `GNo` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `GName` varchar(30) NOT NULL,
  `BuildDate` datetime NOT NULL,
  PRIMARY KEY (`GNo`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for usertable
-- ----------------------------
DROP TABLE IF EXISTS `usertable`;
CREATE TABLE `usertable` (
  `UNo` varchar(20) NOT NULL,
  `UEmail` varchar(30) NOT NULL,
  `UName` varchar(30) NOT NULL,
  `UPsw` varchar(20) NOT NULL,
  PRIMARY KEY (`UNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
