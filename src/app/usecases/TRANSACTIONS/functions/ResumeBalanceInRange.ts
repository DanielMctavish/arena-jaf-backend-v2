import PrismaTransactionRepositorie from "../../../repositories/PrismaRepositories/PrismaTransactionRepositorie";
import { AdmResponses } from "../../IUserAdm_usecases";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const ResumeBalanceInRange = async (
    adm_id: string,
    startDate: string,
    endDate: string
): Promise<AdmResponses> => {
    const TransactionsRepositorie = new PrismaTransactionRepositorie();

    return new Promise(async (resolve, reject) => {

        try {
            const allTransactions = await TransactionsRepositorie.list(adm_id);

            const start = dayjs(startDate).startOf('day');
            const end = dayjs(endDate).endOf('day');

            const rangeSum = allTransactions
                .filter(transaction => 
                    transaction.fluxo === 'IN' &&
                    dayjs(transaction.created_at).isSameOrAfter(start) &&
                    dayjs(transaction.created_at).isSameOrBefore(end)
                )
                .reduce((sum, transaction) => sum + transaction.value, 0);

            const response: AdmResponses = {
                status_code: 200,
                msg: "founded",
                body: {
                    rangeSum,
                    startDate: start.format('YYYY-MM-DD'),
                    endDate: end.format('YYYY-MM-DD'),
                }
            };
            resolve(response);

        } catch (error: any) {
            reject({ status_code: 500, body: { msg: error.message } });
        }
    });
}
