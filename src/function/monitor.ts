/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Function
 * @description Monitor
 */

import { MONITOR_STATUS } from "../interface/monitor";
import { IMonitorModel } from "../model/monitor";

export const getMonthKey = (month: number = new Date().getUTCMonth()): keyof IMonitorModel => {

    switch (month) {
        case 0: return 'january';
        case 1: return 'february';
        case 2: return 'march';
        case 3: return 'april';
        case 4: return 'may';
        case 5: return 'june';
        case 6: return 'july';
        case 7: return 'august';
        case 8: return 'september';
        case 9: return 'october';
        case 10: return 'november';
        case 11: return 'december';
        default: return 'other';
    }
};

export const parseMonitorStatus = (status: string) => {

    const splited: string[] = status.split('');
    return splited.map((single: string) => {
        if (single === '0') {
            return MONITOR_STATUS.FAILED;
        } else if (single === '1') {
            return MONITOR_STATUS.HEALTHY;
        }

        return MONITOR_STATUS.EMPTY;
    });
};

export const stringifyMonitorStatus = (statuses: MONITOR_STATUS[]): string => {

    return statuses.map((single: MONITOR_STATUS) => {
        if (single === MONITOR_STATUS.FAILED) {
            return '0';
        } else if (single === MONITOR_STATUS.HEALTHY) {
            return '1';
        }

        return '-';
    }).join('');
};

export const getRecentData = (monitor: IMonitorModel): {
    readonly yesterday: MONITOR_STATUS[];
    readonly today: MONITOR_STATUS[];
} => {

    const now: Date = new Date();
    const today: number = now.getUTCDate();
    const key: keyof IMonitorModel = getMonthKey();

    const thisMonth: string[] = monitor[key] as string[];
    const todayString: string = thisMonth[today];

    if (thisMonth[today - 1]) {

        const yesterdayString: string = thisMonth[today - 1];
        return {
            yesterday: parseMonitorStatus(yesterdayString),
            today: parseMonitorStatus(todayString),
        };
    }

    const thisMonthNumber = now.getUTCMonth();
    if (thisMonthNumber !== 0) {

        const lastMonthKey: keyof IMonitorModel = getMonthKey(thisMonthNumber - 1);
        const lastMonth: string[] = monitor[lastMonthKey] as string[];
        const lastDayString: string = lastMonth[lastMonth.length - 1];

        return {
            yesterday: parseMonitorStatus(lastDayString),
            today: parseMonitorStatus(todayString),
        };
    }

    return {
        yesterday: [],
        today: parseMonitorStatus(todayString),
    };
};
