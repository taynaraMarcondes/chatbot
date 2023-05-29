CREATE DATABASE athan;
use athan;

CREATE TABLE clients(
    id INT NOT NULL AUTO_INCREMENT,
    client_name VARCHAR(100) NOT NULL,
    document BIGINT NOT NULL,
    birthdate VARCHAR(15) NOT NULL,
    email VARCHAR(50) NOT NULL,

    PRIMARY KEY (id)
);