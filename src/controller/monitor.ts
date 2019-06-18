/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Monitor
 */

import { ObjectID } from "bson";
import { IMonitorConfig } from "../interface/import";
import { IApplicationModel, IMonitorModel, MonitorModel } from "../model/import";
import { getApplicationByKey } from "./application";

export const createUnsavedMonitor = (application: ObjectID, healthCheck: string): IMonitorModel => {

    const now: Date = new Date();
    const config: IMonitorConfig = {
        application,
        healthCheck,
        year: now.getUTCFullYear().toString(),
    };

    return new MonitorModel(config);
};

export const getCurrentMonitorByKey = async (key: string): Promise<IMonitorModel | null> => {

    const application: IApplicationModel = await getApplicationByKey(key);

    return await getCurrentMonitorById(application._id);
};

export const getCurrentMonitorById = async (id: ObjectID | string): Promise<IMonitorModel | null> => {

    const now: Date = new Date();
    const monitor: IMonitorModel | null = await MonitorModel.findOne({
        application: id,
        year: now.getUTCFullYear(),
    });

    return monitor;
};
