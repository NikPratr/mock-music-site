CREATE DATABASE IF NOT EXISTS mock_music_website;

USE mock-music-website;

CREATE TABLE IF NOT EXISTS albums (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    published DATE NOT NULL,
    artwork VARCHAR(255) NOT NULL,
    price DECIMAL(4, 2) NOT NULL
)