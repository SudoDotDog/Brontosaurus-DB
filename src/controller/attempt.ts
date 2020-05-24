/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Attempt
 */

import { ObjectID } from "bson";
import { IAttemptConfig } from "../interface/attempt";
import { AttemptModel, IAttemptModel } from "../model/attempt";

export const createUnsavedAttempt = (config: IAttemptConfig): IAttemptModel => {

    return new AttemptModel({
        ...config,
        at: new Date(),
    });
};

export const getAttemptsByAccount = async (account: ObjectID | string): Promise<IAttemptModel[]> => {

    return await AttemptModel.find({
        account,
    });
};

export const getAttemptsByAccountAndPage = async (account: ObjectID | string, limit: number, page: number): Promise<IAttemptModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    return await AttemptModel.find({
        account,
    });
};
