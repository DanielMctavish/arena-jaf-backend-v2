import IArenaLocal from "./IArenaLocal";
import IUserClient from "./IUserClient";

interface IArenaEvents {
    id?: string;
    responsible_name: string;
    cpf: string;
    address: string;
    whatsapp: string;
    event_type: EVENT_TYPE;
    event_price: number;
    // Relacionamento com o local
    Local: IArenaLocal;
    localId: string;
    
    // Campos específicos para corujão
    is_overnight?: boolean;
    client?: IUserClient;
    client_id?: string;
    overnight_price?: number;
    
    created_at?: Date;
    updated_at?: Date;
}

const EVENT_TYPE: { [x: string]: 'VIP' | 'PREMIUM' | 'PRO' | 'GOLD' } = {
    VIP: 'VIP',
    PREMIUM: 'PREMIUM',
    PRO: 'PRO',
    GOLD: 'GOLD'
}

export type EVENT_TYPE = typeof EVENT_TYPE[keyof typeof EVENT_TYPE];

export default IArenaEvents; 