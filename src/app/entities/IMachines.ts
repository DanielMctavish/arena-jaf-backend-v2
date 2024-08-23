import IArenaLocal from "./IArenaLocal";
import ISessions from "./ISessions";
import IUserAdm from "./IUserAdm";
import IUserColab from "./IUserColab";

interface IMachines {
    id?: string;
    nano_id: string
    connection: MACHINE_CONNECTION
    status: MACHINE_STATUS
    type: MACHINE_TYPE
    UserAdm?: IUserAdm;
    userAdmId?: string | any;
    UserColab?: IUserColab | any;
    userColabId?: string | any;
    local?: IArenaLocal | null;
    arenaLocalId?: string | any;
    sessions?: ISessions[];
    created_at?: Date
    updated_at?: Date
}


const MACHINE_CONNECTION: { [x: string]: 'DISCONECTED' | 'CONECTED' } = {
    DISCONECTED: 'DISCONECTED',
    CONECTED: 'CONECTED'
}

const MACHINE_STATUS: { [x: string]: 'RUNNING' | 'STOPED' } = {
    RUNNING: 'RUNNING',
    STOPED: 'STOPED'
}

const MACHINE_TYPE: { [x: string]: 'PC' | 'XBOX' | 'PS5' | 'VR' | 'FLIPERAMA' | 'SIMULATOR' } = {
    PC: 'PC',
    XBOX: 'XBOX',
    PS5: 'PS5',
    VR: 'VR',
    FLIPERAMA: 'FLIPERAMA',
    SIMULATOR: 'SIMULATOR'
}

export type MACHINE_CONNECTION = typeof MACHINE_CONNECTION[keyof typeof MACHINE_CONNECTION]
export type MACHINE_STATUS = typeof MACHINE_STATUS[keyof typeof MACHINE_STATUS]
export type MACHINE_TYPE = typeof MACHINE_TYPE[keyof typeof MACHINE_TYPE]

export default IMachines;
