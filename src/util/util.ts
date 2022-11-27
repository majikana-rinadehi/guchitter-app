import { addDays } from "date-fns";
import format from "date-fns/format";

/**
 * `date`から`days`日後の日付と、`date`をYYYY-MM-DDにして返す
 * @param date 
 * @param days 
 * @returns 
 */
export const getDatesYYYY_MM_DD = (date: Date, days: number): {from: string, to: string} => {
    const from = format(date, 'yyyy-MM-dd')
    const to = format(addDays(date, 1), 'yyyy-MM-dd')
    return {from, to}
}