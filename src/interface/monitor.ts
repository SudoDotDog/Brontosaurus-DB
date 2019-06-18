/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Monitor
 */

import { ObjectID } from "bson";

export interface IMonitorConfig {

    application: ObjectID;
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

    createdAt: Date;
    updatedAt: Date;
}
