import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';

import administratorRoutes from './routes/AdministratorRoutes';
import clientRoutes from './routes/ClientRoutes';
import productRoutes from './routes/ProductRoutes';
import transactionsRoutes from './routes/TransactionRoutes';
import machineRoutes from './routes/MachinesRoutes';

const app = express();
const serverHttp: any = http.createServer(app);

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
app.use('/machines', machineRoutes);

serverHttp.listen(process.env.PORT , () => {
    console.log('[ Arena 1.0] Server running on PORT: ', process.env.PORT )
});

