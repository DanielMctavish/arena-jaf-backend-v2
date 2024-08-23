import PrismaTransactionRepositorie from "../../../repositories/PrismaRepositories/PrismaTransactionRepositorie";
import { AdmResponses } from "../../IUserAdm_usecases";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

export const ResumeBalance = async (adm_id: string): Promise<AdmResponses> => {
    const TransactionsRepositorie = new PrismaTransactionRepositorie();

    return new Promise(async (resolve, reject) => {

        try {
            const allTransactions = await TransactionsRepositorie.list(adm_id);

            const today = dayjs().startOf('day');
            const startOfWeek = dayjs().startOf('week');
            const startOfMonth = dayjs().startOf('month');

            const dailySum = allTransactions
                .filter(transaction => transaction.fluxo === 'IN' && dayjs(transaction.created_at).isSame(today, 'day'))
                .reduce((sum, transaction) => sum + transaction.value, 0);

            const weeklySum = allTransactions
                .filter(transaction => transaction.fluxo === 'IN' && dayjs(transaction.created_at).isSameOrAfter(startOfWeek))
                .reduce((sum, transaction) => sum + transaction.value, 0);

            const monthlySum = allTransactions
                .filter(transaction => transaction.fluxo === 'IN' && dayjs(transaction.created_at).isSameOrAfter(startOfMonth))
                .reduce((sum, transaction) => sum + transaction.value, 0);

            const response: AdmResponses = {
                status_code: 200,
                msg: "founded",
                body: {
                    dailySum,
                    weeklySum,
                    monthlySum,
                }
            };
            resolve(response);

        } catch (error: any) {
            reject({ status_code: 500, body: { msg: error.message } });
        }
    });
}
