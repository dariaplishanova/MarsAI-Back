import express, { Response } from 'express';
import dotenv from 'dotenv';
import { testDbConnection } from './config/database.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import FestivalRoutes from './routes/festival.route.js';
import CollaboratorRoutes from './routes/collaborator.route.js';
import DirectorRoutes from './routes/director.route.js';
import UserRoutes from './routes/user.routes.js';
import RatingRoutes from './routes/rating.route.js';
import AuthRoutes from './routes/auth.route.js';
import MovieRoutes from './routes/movie.router.js';
import cors from 'cors';
import logger from './config/logger.js';
import { RequestEmpty } from './types/type.js';

dotenv.config();

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
app.use('/festivals', FestivalRoutes);
app.use('/collaborators', CollaboratorRoutes);
app.use('/directors', DirectorRoutes);
app.use('/rating', RatingRoutes);
app.use('/auth', AuthRoutes);

app.use(errorMiddleware);
