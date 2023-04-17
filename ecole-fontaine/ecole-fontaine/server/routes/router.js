import express from 'express';
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
  
} from "../controllers/ArticleController.js";

import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/CategoryController.js';

import { getAllCommentsForArticle, addCommentToArticle, updateComment, deleteComment } from '../controllers/CommentController.js';

import {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUserByEmail,
    login
  } from '../controllers/UserController.js';

const router = express.Router();

// Récupérer tous les articles
router.get('/article', getAllArticles);

// Récupérer un article par son ID
router.get('/getarticle/:id', getArticleById);

// Créer un nouvel article
router.post('/createarticle', createArticle);

// Mettre à jour un article
router.put('/updatearticle/:id', updateArticle);

// Supprimer un article
router.delete('/deletearticle/:id', deleteArticle);

// Rechercher des articles
router.get('/search/:query', searchArticles);

//category

// Récupérer toutes les catégories
router.get('/categories', getAllCategories);

// Récupérer une catégorie par son ID
router.get('/categories/:id', getCategoryById);

// Créer une nouvelle catégorie
router.post('/categories', createCategory);

// Mettre à jour une catégorie
router.put('/categories/:id', updateCategory);

// Supprimer une catégorie
router.delete('/categories/:id', deleteCategory);


//comments

// Récupérer tous les commentaires pour un article donné
router.get('/articles/:id/comments', getAllCommentsForArticle);

// Ajouter un commentaire à un article
router.post('/articles/:id/comments', addCommentToArticle);

// Mettre à jour un commentaire
router.put('/comments/:id', updateComment);

// Supprimer un commentaire
router.delete('/comments/:id', deleteComment);

//user

// Récupérer tous les utilisateurs
router.get('/users', getAllUsers);

// Créer un nouvel utilisateur
router.post('/users', createUser);

// Mettre à jour les informations d'un utilisateur
router.put('/users/:id', updateUser);

// Supprimer un utilisateur
router.delete('/users/:id', deleteUser);

// Récupérer un utilisateur par son ID
router.get('/users/:id', getUserById);

// Récupérer un utilisateur par son adresse e-mail
router.get('/users/email/:email', getUserByEmail);

// Connexion
router.post('/login', login);

export default router;