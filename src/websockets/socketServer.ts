import websocket from "ws"
import PrismaMachineRepositorie from "../app/repositories/PrismaRepositories/PrismaMachineRepositorie"

const prismaMachine = new PrismaMachineRepositorie()


function startWebSocketServer() {
    const wss = new websocket.WebSocket.Server({
        port: 3330
    })


    function countInactivity(machineId: string) {
        return setTimeout(async () => {
            await prismaMachine.update(machineId, { status: "DESCONECTED" });
        }, 5000);
    }

    wss.on('connection', (ws) => {
        let inactivityTimer: NodeJS.Timeout;

        ws.on('message', async (message: Buffer) => {

            const data = JSON.parse(message.toString());
            console.log('observando message ->> ', data.machineID);

            try {
                // Convertendo o buffer para uma string JSON
                if (data.message === 'message-machine-activity') {
                    console.log('condição atendida -> ', data.message);
                    
                    await prismaMachine.update(data.machineID, { status: "CONECTED" });
                    // Reinicia o timer de inatividade
                    clearTimeout(inactivityTimer);
                    inactivityTimer = countInactivity(data.machineID);

                }
            } catch (error: any) {
                console.error('Error processing message:', error.message);
            }
        });
    });

}

export default startWebSocketServer;