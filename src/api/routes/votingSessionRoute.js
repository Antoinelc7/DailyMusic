module.exports = (server) => {
    const auth = require("../middlewares/auth");
    const votingSessionController = require("../controllers/votingSessionController");

        // Créer une nouvelle session
    server.post("/votingSession", auth, votingSessionController.createSession)
        /**
         * @swagger
         * /votingSession:
         *   post:
         *     summary: Créer une nouvelle session de vote
         *     tags:
         *       - VotingSessions
         *     parameters:
         *       - in: header
         *         name: Authorization
         *         required: true
         *         schema:
         *           type: string
         *         description: Le token d'authentification (Bearer {{token}}).
         *       - in: body
         *         name: votingSession
         *         description: Les détails de la nouvelle session de vote.
         *         required: true
         *         schema:
         *           type: object
         *           required: true
         *           properties:
         *             music_id:
         *               type: string
         *           example:
         *             module_name: ma session de vote
         *     responses:
         *       '201':
         *         description: Session de vote créée avec succès
         *       '400':
         *         description: Requête invalide
         *       '401':
         *         description: Non autorisé (token invalide)
         *       '500':
         *         description: Erreur serveur
         */
        .delete("/votingSession/:sessionId", auth, votingSessionController.deleteSession)
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
             *       - in: header
             *         name: Authorization
             *         required: true
             *         schema:
             *           type: string
             *         description: Le token d'authentification (Bearer {{token}}).
             *     responses:
             *       '200':
             *         description: Session de vote supprimée avec succès
             *       '404':
             *         description: Session de vote introuvable
             *       '500':
             *         description: Erreur serveur
             */
        .get("/votingSession/", auth, votingSessionController.getAllSessions)
            /**
             * @swagger
             * /votingSession/:
             *   get:
             *     summary: Obtenir toutes les sessions de vote
             *     tags:
             *       - VotingSessions
             *     parameters:
             *       - in: header
             *         name: Authorization
             *         required: true
             *         schema:
             *           type: string
             *         description: Le token d'authentification (Bearer {{token}}).
             *     responses:
             *       '200':
             *         description: Liste de sessions de vote obtenue avec succès
             *       '404':
             *         description: Aucune session de vote trouvée
             *       '500':
             *         description: Erreur serveur
             */
        .get("/votingSession/:sessionId", auth, votingSessionController.getSession);
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
             *       - in: header
             *         name: Authorization
             *         required: true
             *         schema:
             *           type: string
             *         description: Le token d'authentification (Bearer {{token}}).
             *     responses:
             *       '200':
             *         description: Session de vote obtenue avec succès
             *       '404':
             *         description: Session de vote introuvable
             *       '500':
             *         description: Erreur serveur
             */
}