import pool from "../config/database.js";

// Récupérer tous les articles
export const getAllArticles = (req, res) => {
  pool.query('SELECT * FROM article ORDER BY id ASC', (error, articles) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    } else {
      res.json(articles);
    }
  });
};

// Récupérer un article par son ID
export const getArticleById = (req, res) => {
  const { id } = req.params;

  pool.query('SELECT * FROM article WHERE id = ?', [id], (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    } else if (rows.length === 0) {
      res.status(404).send('Article introuvable');
    } else {
      res.json(rows[0]);
    }
  });
};

// Créer un nouvel article
export const createArticle = (req, res) => {
  const { title, content, id_user } = req.body;

  pool.query(
    'INSERT INTO article (title, content, id_user) VALUES (?, ?, ?)',
    [title, content, id_user],
    (error, results) => {
      if (error) {
        console.error(`Erreur lors de la création de l'article : ${error}`);
        res.status(500).send('Erreur serveur');
      } else {
        res.status(201).json({ message: 'Article créé avec succès !', id: results.insertId });
      }
    }
  );
};

// Mettre à jour un article
export const updateArticle = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  pool.query('UPDATE article SET title = ?, content = ? WHERE id = ?', [title, content, id], (error) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    } else {
      res.status(200).send('Article mis à jour avec succès');
    }
  });
};

// Supprimer un article
export const deleteArticle = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM article WHERE id = ?', [id], (error) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    } else {
      res.status(200).send('Article supprimé avec succès');
    }
  });
};

// Rechercher des articles
export const filterArticles = (req, res) => {
  const { query } = req.params;

  pool.query(`SELECT * FROM article WHERE title LIKE '%${searchQuery}%' OR content LIKE '%${searchQuery}%' OR category LIKE'%${searchQuery}%'`, (error, rows) => {
    if (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
    } else if (rows.length === 0) {
    res.status(404).send('Aucun article trouvé');
    } else {
    res.json(rows);
    }
    });
};

