import app from "./app.js";
import { testDbConnection } from "./config/database.js";
import logger from "./config/logger.js";


const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await testDbConnection();

    app
      .listen(port, () => {
        logger.info(`Serveur prêt sur http://localhost:${port}`);
      })
      .on('error', (err: Error) => {
        logger.error('Impossible de lancer le serveur Express:', err.message);
        process.exit(1);
      });
  } catch (error) {
    logger.error('Erreur fatale lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

await startServer();
