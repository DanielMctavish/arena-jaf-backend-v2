import IUserClient from "./IUserClient"

interface IEvents {
    id: string
    title: string
    value: number
    members: IUserClient[]
    description: string
    cover_url: string
    created_at?: Date
    updated_at?: Date
}

export default IEvents;