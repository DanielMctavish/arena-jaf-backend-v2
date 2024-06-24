import { Server } from 'socket.io';
import http from 'http';

const PORT = process.env.SOCKET_PORT || 3001;
const serverHttp = http.createServer();

interface IMessengerServiceBody {
    body: Object,
    timer: number
}

let socketMain: any;

const ioSocket = new Server(serverHttp, {
    cors: {
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    }
});

ioSocket.on('connection', (socket) => {
    socketMain = socket;

    socket.on('disconnect', () => {
        console.log('User disconnected [ID]-> ', socket.id);
    });

    socket.on('session-machine-running', (message) => {
        console.log('Message received from client:', message);
        // Handle the message
    });
});

serverHttp.listen(PORT, () => {
    console.log(`[ Socket.io Server ] running on PORT: ${PORT}`);
});

const serverSendMessage = (messageType: string, data: IMessengerServiceBody) => {
    try {
        if (socketMain) {
            socketMain.emit(messageType, {
                sessionID: socketMain.id, // todas as vezes que um cliente se conectar ele gera este ID
                data
            });
        } else {
            throw new Error('socketMain is undefined');
        }
    } catch (error: any) {
        console.log('Error at server send message -> ', error.message);
        if (socketMain) {
            socketMain.close(); // Fechar a conexão do WebSocket
        }
    }
}

export { serverSendMessage, IMessengerServiceBody };
