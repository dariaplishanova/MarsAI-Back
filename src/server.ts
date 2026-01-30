import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import festivalRoutes from './routes/festival.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Serveur MarsAI en mode ESM (EcmaScript Modules) !');
});

app.use("/festivals", festivalRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port} - Connexion à la base de donnée réalisé avec succés ✅ `);
});