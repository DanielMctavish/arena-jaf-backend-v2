import IUserAdm from "./IUserAdm"
import IUserClient from "./IUserClient"

interface ITransaction {
    id?: string
    value: number
    transaction_type: TRANSACTION_TYPE
    fluxo: FLOW_TYPE
    product_description?: string | null
    method: METHOD_PAYMENT
    status: STATUS_PAYMENT
    UserAdm?: IUserAdm | any
    userAdmId?: string | any
    Client?: IUserClient | any
    userClientId?: string | any
    created_at?: Date
    updated_at?: Date
}



//métodos para pagamento.......................................................
const METHOD_PAYMENT: { [x: string]: 'CREDITO' | 'PIX' | 'DEBITO' | 'DINHEIRO' | 'LOCAL' } = {
    DEBITO: 'DEBITO',
    CREDITO: 'CREDITO',
    PIX: 'PIX',
    DINHEIRO: 'DINHEIRO',
    LOCAL: 'LOCAL'
}

export type METHOD_PAYMENT = typeof METHOD_PAYMENT[keyof typeof METHOD_PAYMENT]

//status de pagamento.......................................................
const STATUS_PAYMENT: { [x: string]: 'APPROVED' | 'PENDENT' | 'CANCEL' } = {
    APPROVED: 'APPROVED',
    PENDENT: 'PENDENT',
    CANCEL: 'CANCEL'
}

export type STATUS_PAYMENT = typeof STATUS_PAYMENT[keyof typeof STATUS_PAYMENT]

//tipo de transações de pagamento.......................................................
const TRANSACTION_TYPE: { [x: string]: 'PRODUCT' | 'MACHINE_CREDIT' | 'SPLIT' } = {
    PRODUCT: 'PRODUCT',
    MACHINE_CREDIT: 'MACHINE_CREDIT',
    SPLIT: 'SPLIT'
}

const FLOW_TYPE: { [x: string]: 'IN' | 'OUT' } = {
    IN: 'IN',
    OUT: 'OUT',
}

export type TRANSACTION_TYPE = typeof TRANSACTION_TYPE[keyof typeof TRANSACTION_TYPE]
export type FLOW_TYPE = typeof FLOW_TYPE[keyof typeof FLOW_TYPE]

export default ITransaction;