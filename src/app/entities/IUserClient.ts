import ISessions from "./ISessions"
import ITransaction from "./ITransaction"
import IUserAdm from "./IUserAdm"

interface IUserClient {
    id: string
    email: string
    saldo: number
    horas?: number
    tel?: string
    address?: string
    nome: string
    cpf: string
    senha: string
    avatar_url: string
    isPlaying: boolean
    Sessions?: ISessions[]
    Transactions?: ITransaction[]
    Administrator?: IUserAdm
    administrator_id: string
    created_at: Date
    updated_at: Date
}


export default IUserClient;