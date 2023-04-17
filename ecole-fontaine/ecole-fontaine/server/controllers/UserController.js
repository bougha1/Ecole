import pool from "../config/database.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

// Récupérer tous les utilisateurs
export const getAllUsers = (req, res) => {
  pool.query('SELECT * FROM user', (error, rows) => {
    if (error) {
      console.error(`Erreur lors de la récupération des utilisateurs : ${error}`);
      res.status(500).send('Erreur serveur');
    } else {
      res.status(200).json(rows);
    }
  });
};

// Créer un nouvel utilisateur
export const createUser = (req, res) => {
  const { nom, prenom, email, password } = req.body;

  bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
    if (error) {
      console.error(`Erreur lors de la création de l'utilisateur : ${error}`);
      res.status(500).send('Erreur serveur');
    } else {
      pool.query(
        'INSERT INTO user (nom, prenom, email, password, admin) VALUES (?, ?, ?, ?, 0)',
        [nom, prenom, email, hashedPassword],
        (error) => {
          if (error) {
            console.error(`Erreur lors de la création de l'utilisateur : ${error}`);
            res.status(500).send('Erreur serveur');
          } else {
            res.status(201).json({ message: 'Utilisateur créé avec succès !' });
          }
        }
      );
    }
  });
};

// Mettre à jour les informations d'un utilisateur
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, password } = req.body;

  bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
    if (error) {
      console.error(`Erreur lors de la mise à jour de l'utilisateur : ${error}`);
      res.status(500).send('Erreur serveur');
    } else {
      pool.query(
        'UPDATE user SET nom = ?, prenom = ?, email = ?, password = ? WHERE id = ?',
        [nom, prenom, email, hashedPassword, id],
        (error) => {
          if (error) {
            console.error(`Erreur lors de la mise à jour de l'utilisateur : ${error}`);
            res.status(500).send('Erreur serveur');
          } else {
            res.status(200).json({ message: 'Utilisateur mis à jour avec succès !' });
          }
        }
      );
    }
  });
};

// Supprimer un utilisateur
export const deleteUser = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM user WHERE id = ?', [id], (error) => {
    if (error) {
      console.error(`Erreur lors de la suppression de l'utilisateur : ${error}`);
      res.status(500).send('Erreur serveur');
    } else {
      res.status(200).json({ message: 'Utilisateur supprimé avec succès !' });
    }
  });
};
// Récupérer un utilisateur par email
export const getUserByEmail = (req, res) => {
  const { email } = req.params;

  pool.query('SELECT * FROM user WHERE email = ?', [email], (error, rows) => {
    if (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur : ${error}`);
      res.status(500).send('Erreur serveur');
    } else {
      if (rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).send('Utilisateur non trouvé');
      }
    }
  });
};
// Récupérer un utilisateur par ID
export const getUserById = (req, res) => {
  const { id } = req.params;

  pool.query('SELECT * FROM user WHERE id = ?', [id], (error, rows) => {
    if (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur : ${error}`);
      res.status(500).send('Erreur serveur');
    } else {
      if (rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).send('Utilisateur non trouvé');
      }
    }
  });
};
// Authentifier un utilisateur
export const login = (req, res) => {
  const { email, password } = req.body;

  pool.query('SELECT * FROM user WHERE email = ?', [email], (error, rows) => {
    if (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur : ${error}`);
      res.status(500).send('Erreur serveur');
    } else {
      if (rows.length > 0) {
        const user = rows[0];

        bcrypt.compare(password, user.password, (error, result) => {
          if (error) {
            console.error(`Erreur lors de l'authentification : ${error}`);
            res.status(500).send('Erreur serveur');
          } else {
            if (result) {
              res.status(200).json({ message: 'Authentification réussie !' });
            } else {
              res.status(401).send('Mot de passe incorrect');
            }
          }
        });
      } else {
        res.status(404).send('Utilisateur non trouvé');
      }
    }
  });
};



