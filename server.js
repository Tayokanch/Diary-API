import express from 'express';
import http from 'http';
import compression from 'compression'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
import { pool, initDb } from './src/db/index.js'
import diaryRouter from './src/router/diaryRouter.js'
import journalRouter from './src/router/journalRouter.js'
import healthRouter from './src/router/healthRouter.js'
const app = express();

app.use(compression());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


const PORT = process.env.API_PORT

await initDb();

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));



app.use('/', diaryRouter)
app.use('/', journalRouter)
app.use('/', healthRouter)