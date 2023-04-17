
import mysql from "mysql";

let pool = mysql.createPool({
  connectionLimit: 10000,
  host: 'db.3wa.io',
  user: 'bouchrabelamri',
  password: '9a389ed8c3ae3f71be20c6bc5dcad4a2',
  database: 'bouchrabelamri_blog'
});

// Connexion à la DB
pool.getConnection((err, connection) => {
	console.log("Connected to the database");
	if (err) throw err;
});

export default pool;





