import pool from '../config/database.js'

// Récupérer toutes les catégories
export const getAllCategories = (req, res) => {
  pool.query('SELECT * FROM categories', (error, results) => {
    if (error) {
      console.error(`Erreur lors de la récupération des catégories : ${error}`);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.status(200).json(results);
  });
};

// Récupérer une catégorie par son ID
export const getCategoryById = (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM categories WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error(`Erreur lors de la récupération de la catégorie : ${error}`);
      res.status(500).send('Erreur serveur');
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Catégorie introuvable' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Créer une nouvelle catégorie
export const createCategory = (req, res) => {
  const { categoryName } = req.body;
  pool.query('INSERT INTO categories (categoryName) VALUES (?)', [categoryName], (error, results) => {
    if (error) {
      console.error(`Erreur lors de la création de la catégorie : ${error}`);
      res.status(500).send('Erreur serveur');
      return;
    }
    const newCategory = { id: results.insertId, categoryName };
    res.status(201).json(newCategory);
  });
};

// Mettre à jour une catégorie
export const updateCategory = (req, res) => {
  const id = req.params.id;
  const { categoryName } = req.body;
  pool.query('UPDATE categories SET categoryName = ? WHERE id = ?', [categoryName, id], (error, results) => {
    if (error) {
      console.error(`Erreur lors de la mise à jour de la catégorie : ${error}`);
      res.status(500).send('Erreur serveur');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Catégorie introuvable' });
    } else {
      const updatedCategory = { id, categoryName };
      res.status(200).json(updatedCategory);
    }
  });
};

// Supprimer une catégorie
export const deleteCategory = (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM categories WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error(`Erreur lors de la suppression de la catégorie : ${error}`);
      res.status(500).send('Erreur serveur');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Catégorie introuvable' });
    } else {
      res.status(200).json({ message: 'Catégorie supprimée avec succès' });
    }
  });
};