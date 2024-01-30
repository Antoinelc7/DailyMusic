/**
 * @openapi
 * components:
 *   schemas:
 *      User:
 *          type: object
 *          required:
 *              - email
 *              - password
 *              - role
 *          properties:
 *              email:
 *                  type: string
 *                  description: L'email de l'utilisateur
 *                  unique: true
 *              password:
 *                  type: string
 *                  description: Le mot de passe de l'utilisateur
 *              role:
 *                  type: boolean
 *                  default: false
 *                  description: Le role de l'utilisateur
 */

module.exports = (server) => {
    const userController = require("../controllers/userController");

    /**
    * @swagger
    * /user/register:
    *   post:
    *     summary: Enregistre un nouvel utilisateur
    *     tags: [Utilisateurs]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/User'
    *         description: Les détails de l'utilisateur
    *     responses:
    *       201:
    *         description: Utilisateur enregistré avec succès
    *       401:
    *         description: Requête invalide
    *       500:
    *         description: Erreur serveur
    */
    server.post("/user/register", userController.userRegister);

    /**
    * @swagger
    * /user/login:
    *   post:
    *     summary: Connecte l'utilisateur
    *     tags: [Utilisateurs]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/User'
    *         description: Les détails de l'utilisateur
    *     responses:
    *       200:
    *         description: Connexion réussie
    *       401:
    *         description: Email ou mot de passe incorrect
    *       500:
    *         description: Utilisateur non trouvé ou erreur serveur
    */
    server.post("/user/login", userController.userLogin);

    // vvv   A SUPPRIMER EN PROD   vvv
    const auth = require("../middlewares/auth");
    server.get("/user/getall", userController.userGetAll);
    server.get('/user/myInfos', auth, userController.userGetTokenInfos)
}