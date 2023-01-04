DROP DATABASE IF EXISTS users_db;

CREATE DATABASE users_db;

USE users_db;

SET NAMES utf8;
SET character_set_client = utf8mb4;

CREATE TABLE user_infos (
    user_id VARCHAR(45) NOT NULL PRIMARY KEY,
    user_username VARCHAR(45) NOT NULL, 
    user_ismod TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE user_profile (
    user_id VARCHAR(45) NOT NULL PRIMARY KEY,
    user_username VARCHAR(45) NOT NULL, 
    user_level INT NOT NULL DEFAULT 0,
    user_xp INT NOT NULL DEFAULT 0
);

DROP DATABASE IF EXISTS servers_db;

CREATE DATABASE servers_db;

USE servers_db;

SET NAMES utf8;
SET character_set_client = utf8mb4;

CREATE TABLE server_infos (
    server_id varchar(45) NOT NULL PRIMARY KEY,
    server_name varchar(45) NOT NULL,
    server_owner varchar(45) NOT NULL,
    server_isbeta tinyint(1) Default 0
)