CREATE DATABASE IF NOT EXISTS adsss;
USE adsss;

DROP TABLE IF EXISTS inscriptions;
CREATE TABLE inscriptions (
  id smallint unsigned not null auto_increment,
  reference varchar(255) not null,
  firstName varchar(255) not null,
  lastName varchar(255) not null,
  email varchar(255) not null,
  club varchar(255) not null,
  comment varchar(255) not null,
  address varchar(500) not null,
  total smallint unsigned not null,
  meeting smallint unsigned not null,
  dinner smallint unsigned not null,
  sleeping smallint unsigned not null,
  camping smallint unsigned not null,
  picknick smallint unsigned not null,
  breakfast smallint unsigned not null,
  constraint inscriptions_key primary key (id)
);
