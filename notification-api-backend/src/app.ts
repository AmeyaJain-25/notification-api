import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import routes from './routes';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);

app.get('/', async (req, res) => {
  res.send('OK');
});

app.all('*', (_req, res) => {
  return res.status(404).json({
    statusCode: 404,
    success: false,
    message: 'Route not found',
  });
});

app.use((err: Error, _req: Request, res: Response) => {
  if (err instanceof Error) {
    console.error(err);
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    statusCode: 500,
    success: false,
    message: 'Internal Server Error',
  });
});

export default app;
