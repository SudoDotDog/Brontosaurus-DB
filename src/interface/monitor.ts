/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Monitor
 */

import { ObjectID } from "bson";

export enum MONITOR_STATUS {

    HEALTHY = "HEALTHY",
    FAILED = "FAILED",
    EMPTY = "EMPTY",
}

export interface IMonitorConfig {

    application: ObjectID;
    healthCheck: string;
    year: string;
}

export interface IMonitor extends IMonitorConfig {

    january: string[];
    february: string[];
    march: string[];
    april: string[];
    may: string[];
    june: string[];
    july: string[];
    august: string[];
    september: string[];
    october: string[];
    november: string[];
    december: string[];
    other: string[];

    createdAt: Date;
    updatedAt: Date;
}
