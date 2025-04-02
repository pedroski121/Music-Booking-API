import express from 'express';
import connectDB from './config/database';
import 'dotenv/config'
import { routes } from './config/routes';

const PORT:number = Number(process.env.PORT) || 5000;


const app = express();

app.use(express.json());
app.use(routes)


const start = async () => {
    await connectDB();
    app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))
}
start()
