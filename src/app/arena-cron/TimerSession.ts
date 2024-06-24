import ISessions from "../entities/ISessions";


//(currentInterval: any, data: ISessions, reject: any) 

class TimerSessions {
    private alreadyExecuted = false;
    private allIntervalsSession: any = []


    public saveSessionInstance(data: ISessions, interval: any, reject: any) {

        this.allIntervalsSession.filter((interval: any) => {
            if (interval.id === data.machine_id) {

                this.alreadyExecuted = true
                return reject({
                    status_code: 400,
                    body: 'Máquina já está em execução',
                })

            }
        })

        if (this.alreadyExecuted) { return false; }

        this.allIntervalsSession.push({
            interval: interval,
            id: data.machine_id
        })

        this.allIntervalsSession.forEach((session: any) => {
            console.log("session play: ", session.id)
        })

    }

    public stopMachine(params: any) {

        for (const [index, interval] of this.allIntervalsSession.entries()) {
            if (interval.id === params.machine_id) {
                clearInterval(interval.interval);
                this.allIntervalsSession.splice(index, 1); // Remove o item do array
                break; // Sai do loop após encontrar e remover o intervalo
            }
        }

    }

}

export default TimerSessions;