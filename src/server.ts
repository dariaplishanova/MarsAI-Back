import express, { Request, Response } from 'express';
import UserRoutes from './routes/user.routes.js';
import dotenv from 'dotenv';
import MovieRouter from './routes/movie.router.js';
import { testDbConnection } from './config/database.js';
import FestivalRoutes from './routes/festival.route.js';
import CollaboratorRoutes from './routes/collaborator.route.js';
import DirectorRoutes from './routes/director.route.js';
import authRoute from './routes/auth.route.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); // Middleware pour lire le JSON

const startServer = async () => {
  try {
    await testDbConnection();

    app
      .listen(port, () => {
        console.log(`🚀 Serveur prêt sur http://localhost:${port}`);
      })
      .on('error', (err: Error) => {
        console.error(
          '❌ Impossible de lancer le serveur Express:',
          err.message
        );
        process.exit(1);
      });
  } catch (error) {
    console.error('💥 Erreur fatale lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();

app.get('/', (req: Request, res: Response) => {
  res.send('Serveur MarsAI en mode ESM (EcmaScript Modules) !');
});

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use('/users', UserRoutes);
app.use('/movies', MovieRouter);
app.use("/festivals", FestivalRoutes);
app.use("/collaborators", CollaboratorRoutes);
app.use("/directors", DirectorRoutes)

app.use('/festivals', FestivalRoutes);
app.use('/collaborators', CollaboratorRoutes);
app.use('/directors', DirectorRoutes);
app.use('/auth', authRoute);
