import ITransaction from "../entities/ITransaction";

interface ITransactionRepositorie {
    create(data: ITransaction): Promise<ITransaction>
    find(transaction_id: string): Promise<ITransaction | null>
    list(adm_id?: string): Promise<ITransaction[]>
    update(transaction_id: string, data: Partial<ITransaction>): Promise<ITransaction>
    delete(transaction_id: string): Promise<ITransaction>
}


export default ITransactionRepositorie; 