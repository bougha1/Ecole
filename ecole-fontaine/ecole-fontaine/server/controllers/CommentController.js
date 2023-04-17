import pool from '../config/database.js';

// Récupérer tous les commentaires d'un article
export const getAllCommentsForArticle = (req, res) => {
  const { id } = req.params;

  pool.query('SELECT * FROM comments WHERE article_id = ?', [id], (error, rows) => {
    if (error) {
      console.error(`Erreur lors de la récupération des commentaires : ${error}`);
      res.status(500).send('Erreur serveur');
    } else {
      res.status(200).json(rows);
    }
  });
};

// Ajouter un commentaire à un article
export const addCommentToArticle = (req, res) => {
  const { article_id, user_id, content } = req.body;

  pool.query('INSERT INTO comments (article_id, user_id, content) VALUES (?, ?, ?)', [article_id, user_id, content], (error) => {
    if (error) {
      console.error(`Erreur lors de l'ajout du commentaire : ${error}`);
      res.status(500).send('Erreur serveur');
    } else {
      res.status(201).json({ message: 'Commentaire ajouté avec succès' });
    }
  });
};

// Mettre à jour un commentaire
export const updateComment = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  pool.query('UPDATE comments SET content = ? WHERE id = ?', [content, id], (error, result) => {
    if (error) {
      console.error(`Erreur lors de la mise à jour du commentaire : ${error}`);
      res.status(500).send('Erreur serveur');
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Commentaire introuvable' });
    } else {
      res.status(200).json({ message: 'Commentaire mis à jour avec succès' });
    }
  });
};

// Supprimer un commentaire
export const deleteComment = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM comments WHERE id = ?', [id], (error, result) => {
    if (error) {
      console.error(`Erreur lors de la suppression du commentaire : ${error}`);
      res.status(500).send('Erreur serveur');
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Commentaire introuvable' });
    } else {
      res.status(200).json({ message: 'Commentaire supprimé avec succès' });
    }
  });
};