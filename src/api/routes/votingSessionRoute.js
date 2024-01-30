/**
 * @openapi
 * components:
 *   schemas:
 *      VotingSession:
 *          type: object
 *          required:
 *              - module_name
 *              - expiration_date
 *              - musics
 *          properties:
 *              module_name:
 *                  type: string
 *                  description: Le nom du module de la session de vote
 *              expiration_date:
 *                  type: string
 *                  format: date-time
 *                  description: La date d'expiration de la session de vote
 *              musics:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: La liste des IDs de musiques associées à la session de vote
 */

module.exports = (server) => {
    const auth = require("../middlewares/auth");
    const votingSessionController = require("../controllers/votingSessionController");

    /**
     * @swagger
     * /votingSession:
     *   post:
     *     summary: Créer une nouvelle session de vote
     *     tags:
     *       - VotingSessions
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/VotingSession'
     *         description: Les détails de la nouvelle session de vote.
     *     responses:
     *       '201':
     *         description: Session de vote créée avec succès
     *       '400':
     *         description: Requête invalide
     *       '500':
     *         description: Erreur serveur
     */
    server.post("/votingSession", auth, votingSessionController.createSession)
    
    /**
     * @swagger
     * /votingSession/{sessionId}:
     *   delete:
     *     summary: Supprimer une session de vote par ID
     *     tags:
     *       - VotingSessions
     *     parameters:
     *       - in: path
     *         name: sessionId
     *         required: true
     *         schema:
     *           type: string
     *         description: L'ID de la session de vote à supprimer.
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       '200':
     *         description: Session de vote supprimée avec succès
     *       '404':
     *         description: Session de vote introuvable
     *       '500':
     *         description: Erreur serveur
     */
        .delete("/votingSession/:sessionId", auth, votingSessionController.deleteSession)

    /**
     * @swagger
     * /votingSession/:
     *   get:
     *     summary: Obtenir toutes les sessions de vote
     *     tags:
     *       - VotingSessions
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       '200':
     *         description: Liste de sessions de vote obtenue avec succès
     *       '404':
     *         description: Aucune session de vote trouvée
     *       '500':
     *         description: Erreur serveur
     */   
        .get("/votingSession/", auth, votingSessionController.getAllSessions)

    /**
     * @swagger
     * /votingSession/{sessionId}:
     *   get:
     *     summary: Obtenir une session de vote par ID
     *     tags:
     *       - VotingSessions
     *     parameters:
     *       - in: path
     *         name: sessionId
     *         required: true
     *         schema:
     *           type: string
     *         description: L'ID de la session de vote à obtenir.
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       '200':
     *         description: Session de vote obtenue avec succès
     *       '404':
     *         description: Session de vote introuvable
     *       '500':
     *         description: Erreur serveur
     */
        .get("/votingSession/:sessionId", auth, votingSessionController.getSession);
}