import express, { NextFunction, Request, Response } from 'express';
import userRoutes from './routes/user.routes.js';
import dotenv from 'dotenv';
import movieRouter from './routes/movie.router.js';
import { testDbConnection } from './config/database.js';
import festivalRoutes from './routes/festival.route.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const startServer = async () => {
  try {
    await testDbConnection();

    app
      .listen(port, () => {
        console.log(`🚀 Serveur prêt sur http://localhost:${port}`);
      })
      .on('error', (err: Error) => {
        console.error('❌ Impossible de lancer le serveur Express:', err.message);
        process.exit(1);
      });
  } catch (error) {
    console.error('💥 Erreur fatale lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();

app.get('/', (_req: Request, res: Response) => {
  res.send('Serveur MarsAI en mode ESM (EcmaScript Modules) !');
});

app.use('/users', userRoutes);
app.use('/movies', movieRouter);
app.use('/festivals', festivalRoutes);

app.use(errorMiddleware);
