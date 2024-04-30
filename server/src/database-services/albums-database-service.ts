import mysql from 'mysql2';
import dotenv from 'dotenv';
import { Album } from '../../../client/src/scripts/Music';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export const getAlbums = async () => {
    const [result] = await pool.query("SELECT * FROM albums");
    const albums = result as Album[];

    return albums
}

export const getAlbum = async (id: number) => {
    const [result] = await pool.query(`
    SELECT *
    FROM albums
    WHERE id = ?
    `, [id]);
    
    const album = (result as Album[])[0];

    return album;
}