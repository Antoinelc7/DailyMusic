module.exports = (server) => {
    const auth = require("../middlewares/auth");
    const voteController = require("../controllers/voteController");

        // Créer un vote
    server.post("/votingSession/:sessionId/votes", auth, voteController.createVote)
        /**
         * @swagger
         * /votingSession/{sessionId}/votes:
         *   post:
         *     summary: Créer un vote
         *     tags:
         *       - Votes
         * 
         *     parameters:
         *       - in: path
         *         name: sessionId
         *         required: true
         *         schema:
         *           type: string
         *         description: L'ID de la session de vote.
         *       - in: header
         *         name: Authorization
         *         required: true
         *         schema:
         *           type: string
         *         description: Le token d'authentification (Bearer {{token}}).
         *       - in : body
         *         name: music-id
         *         description: L'ID de la musique pour laquelle le vote est émis.
         *         required: true
         *         schema:
         *           type: object
         *           properties:
         *             music_id:
         *               type: string
         *               example: 65b8b6b3b9dc6d83c61f1ae5
         * 
         *     responses:
         *       '201':
         *         description: Vote créé avec succès
         *       '400':
         *         description: Requête invalide
         *       '401':
         *         description: Non autorisé (token invalide)
         *       '500':
         *         description: Erreur serveur
         */


        // Mettre à jour un vote par son ID
        .put("/votingSession/:sessionId/votes/:voteId", auth, voteController.updateVote)
        /**
         * @swagger
         * /votingSession/{sessionId}/votes/{voteId}:
         *   put:
         *     summary: Mettre à jour un vote par son ID
         *     tags:
         *       - Votes
         * 
         *     parameters:
         *       - in: path
         *         name: sessionId
         *         required: true
         *         schema:
         *           type: string
         *         description: L'ID de la session de vote.
         *       - in: path
         *         name: voteId
         *         required: true
         *         schema:
         *           type: string
         *         description: L'ID du vote à mettre à jour.
         *       - in: header
         *         name: Authorization
         *         required: true
         *         schema:
         *           type: string
         *         description: Le token d'authentification (Bearer {{token}}).
         *       - in: body
         *         name: updateVote
         *         description: Les détails de la mise à jour du vote. peut contenir un music_id ainsi que des champs upvote/downvote pour actualiser le score du vote.
         *         required: true
         *         schema:
         *           type: object
         *           properties:
         *             music_id:
         *               type: string
         *             upvote:
         *               type: boolean
         *               description: Indique si l'utilisateur souhaite augmenter le score du vote.
         *             downvote:
         *               type: boolean
         *               description: Indique si l'utilisateur souhaite diminuer le score du vote.
         *           example:
         *             music_id: 65b8b6b3b9dc6d83c61f1ae5
         *             upvote: true
         * 
         *     responses:
         *       '200':
         *         description: Vote mis à jour avec succès.
         *       '400':
         *         description: Requête invalide.
         *       '401':
         *         description: Non autorisé (token invalide).
         *       '403':
         *         description: Vous n'avez pas la permission de modifier ce vote.
         *       '404':
         *         description: Vote non trouvé.
         *       '500':
         *         description: Erreur serveur.
         */



        // Supprimer un vote par son ID
        .delete("/votingSession/:sessionId/votes/:voteId", auth, voteController.deleteVote)
        /**
         * @swagger
         * /votingSession/{sessionId}/votes/{voteId}:
         *   delete:
         *     summary: Supprimer un vote par son ID dans une session de vote.
         *     tags:
         *       - Votes
         *     security:
         *       - BearerAuth: []
         *     parameters:
         *       - in: path
         *         name: sessionId
         *         schema:
         *           type: string
         *         required: true
         *         description: L'ID de la session de vote.
         *       - in: path
         *         name: voteId
         *         schema:
         *           type: string
         *         required: true
         *         description: L'ID du vote à supprimer.
         *     responses:
         *       '204':
         *         description: Vote supprimé avec succès.
         *       '401':
         *         description: Non autorisé, l'utilisateur doit être authentifié.
         *       '403':
         *         description: L'utilisateur n'a pas la permission de supprimer ce vote.
         *       '404':
         *         description: Vote non trouvé.
         *       '500':
         *         description: Erreur serveur.
         */


        // Obtenir tous les votes
        .get("/votingSession/:sessionId/votes", auth, voteController.getAllVotes)
        /**
         * @swagger
         * /votingSession/{sessionId}/votes:
         *   get:
         *     summary: Obtenir tous les votes dans une session de vote.
         *     tags:
         *       - Votes
         *     security:
         *       - BearerAuth: []
         *     parameters:
         *       - in: path
         *         name: sessionId
         *         schema:
         *           type: string
         *         required: true
         *         description: L'ID de la session de vote.
         *     responses:
         *       '200':
         *         description: Liste des votes dans la session de vote.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Vote'
         *       '401':
         *         description: Non autorisé, l'utilisateur doit être authentifié.
         *       '500':
         *         description: Erreur serveur.
         */


        // Obtenir un vote par son ID
        .get("/votingSession/:sessionId/votes/:voteId", auth, voteController.getVoteById);
        /**
         * @swagger
         * /votingSession/{sessionId}/votes/{voteId}:
         *   get:
         *     summary: Obtenir un vote par son ID dans une session de vote.
         *     tags:
         *       - Votes
         *     security:
         *       - BearerAuth: []
         *     parameters:
         *       - in: path
         *         name: sessionId
         *         schema:
         *           type: string
         *         required: true
         *         description: L'ID de la session de vote.
         *       - in: path
         *         name: voteId
         *         schema:
         *           type: string
         *         required: true
         *         description: L'ID du vote à obtenir.
         *     responses:
         *       '200':
         *         description: Détails du vote.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Vote'
         *       '401':
         *         description: Non autorisé, l'utilisateur doit être authentifié.
         *       '404':
         *         description: Vote non trouvé.
         *       '500':
         *         description: Erreur serveur.
         */

 









};