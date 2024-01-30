/**
 * @openapi
 * components:
 *   schemas:
 *      Vote:
 *          type: object
 *          properties:
 *              user_id:
 *                  type: string
 *                  description: L'ID de l'utilisateur qui a émis le vote.
 *              music_id:
 *                  type: string
 *                  description: L'ID de la musique pour laquelle le vote est émis.
 *              session_id:
 *                  type: string
 *                  description: L'ID de la session de vote associée au vote.
 *              score:
 *                  type: number
 *                  description: Le score du vote.
 *              vote_date:
 *                  type: string
 *                  format: date-time
 *                  description: La date et l'heure du vote.
 *              voters:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: La liste des utilisateurs qui ont voté pour ce vote.
 */

module.exports = (server) => {
    const auth = require("../middlewares/auth");
    const voteController = require("../controllers/voteController");

    /**
     * @swagger
     * /votingSession/{sessionId}/votes:
     *   post:
     *     security:
     *       - BearerAuth: []
     *     summary: Créer un vote
     *     tags:
     *       - Votes
     *     parameters:
     *       - in: path
     *         name: sessionId
     *         required: true
     *         schema:
     *           type: string
     *         description: L'ID de la session de vote.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Vote'
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
    server.post("/votingSession/:sessionId/votes", auth, voteController.createVote)
    
    /**
     * @swagger
     * /votingSession/{sessionId}/votes/{voteId}:
     *   put:
     *     security:
     *       - BearerAuth: []
     *     summary: Mettre à jour un vote par son ID
     *     tags:
     *       - Votes
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
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Vote'
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
        .put("/votingSession/:sessionId/votes/:voteId", auth, voteController.updateVote)

    /**
     * @swagger
     * /votingSession/{sessionId}/votes/{voteId}:
     *   delete:
     *     security:
     *       - BearerAuth: []
     *     summary: Supprimer un vote par son ID dans une session de vote.
     *     tags:
     *       - Votes
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
        .delete("/votingSession/:sessionId/votes/:voteId", auth, voteController.deleteVote)

    /**
     * @swagger
     * /votingSession/{sessionId}/votes:
     *   get:
     *     security:
     *       - BearerAuth: []
     *     summary: Obtenir tous les votes dans une session de vote.
     *     tags:
     *       - Votes
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
        .get("/votingSession/:sessionId/votes", auth, voteController.getAllVotes)

   /**
     * @swagger
     * /votingSession/{sessionId}/votes/{voteId}:
     *   get:
     *     security:
     *       - BearerAuth: []
     *     summary: Obtenir un vote par son ID dans une session de vote.
     *     tags:
     *       - Votes
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
        .get("/votingSession/:sessionId/votes/:voteId", auth, voteController.getVoteById);
};