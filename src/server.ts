import 'dotenv/config';

import express, { Response } from 'express';
import { testDbConnection } from './config/database.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import CollaboratorRoutes from './routes/collaborator.routes.js';
import DirectorRoutes from './routes/director.routes.js';
import UserRoutes from './routes/user.routes.js';
import RatingRoutes from './routes/rating.routes.js';
import AuthRoutes from './routes/auth.routes.js';
import MovieRoutes from './routes/movie.routes.js';
import cors from 'cors';
import logger from './config/logger.js';
import { RequestEmpty } from './types/type.js';
import submissionRoutes from './routes/submission.routes.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

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

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.get('/', (_req: RequestEmpty, res: Response) => {
  res.send('Bienvenue sur MarsAI, le festival des futurs souhaitables !');
});

app.use('/users', UserRoutes);
app.use('/movies', MovieRoutes);
app.use('/collaborators', CollaboratorRoutes);
app.use('/directors', DirectorRoutes);
app.use('/rating', RatingRoutes);
app.use('/auth', AuthRoutes);
app.use('/submissions', submissionRoutes);

app.use(errorMiddleware);
