CREATE DATABASE IF NOT EXISTS mock_music_website;

USE mock_music_website;

CREATE TABLE IF NOT EXISTS albums (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    published DATE NOT NULL,
    artwork VARCHAR(255) NOT NULL,
    price DECIMAL(4, 2) NOT NULL
);