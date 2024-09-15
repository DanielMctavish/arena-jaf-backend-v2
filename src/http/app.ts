import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import TimerSessions from '../app/arena-cron/TimerSession';

import administratorRoutes from './routes/AdministratorRoutes';
import clientRoutes from './routes/ClientRoutes';
import productRoutes from './routes/ProductRoutes';
import transactionsRoutes from './routes/TransactionRoutes';
import sessionsRoutes from "./routes/SessionsRoutes"
import machineRoutes from './routes/MachinesRoutes';

const app = express();
const serverHttp: any = http.createServer(app);
const timerSessionInstance = new TimerSessions()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

app.get('/check', (req, res) => {
    res.send('arena JAF | Oficial route');
});

app.use('/adm', administratorRoutes);
app.use('/client', clientRoutes);
app.use('/product', productRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/sessions', sessionsRoutes);
app.use('/machines', machineRoutes);



serverHttp.listen(process.env.PORT, () => {
    console.clear()
    console.log('[ Arena 1.0] Server running on PORT: ', process.env.PORT)
});

export { timerSessionInstance }

