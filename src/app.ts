import 'dotenv/config';

import express, { Response } from 'express';
import { errorMiddleware } from './middlewares/error.middleware.js';
import CollaboratorRoutes from './routes/collaborator.routes.js';
import DirectorRoutes from './routes/director.routes.js';
import UserRoutes from './routes/user.routes.js';
import RatingRoutes from './routes/rating.routes.js';
import AuthRoutes from './routes/auth.routes.js';
import MovieRoutes from './routes/movie.routes.js';
import cors from 'cors';
import { RequestEmpty } from './types/type.js';
import submissionRoutes from './routes/submission.routes.js';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

export default app;
