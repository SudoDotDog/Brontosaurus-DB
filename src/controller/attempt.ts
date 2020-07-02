/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Attempt
 */

import { randomUnique } from "@sudoo/random";
import { ObjectID } from "bson";
import { IAttempt, IAttemptConfig } from "../interface/attempt";
import { AttemptModel, IAttemptModel } from "../model/attempt";

export const createUnsavedAttempt = (config: IAttemptConfig): IAttemptModel => {

    const identifier: string = randomUnique();
    return new AttemptModel({
        ...config,
        at: new Date(),
        identifier,
    });
};

export const getAttemptById = async (attemptId: ObjectID | string): Promise<IAttemptModel | null> => {

    const attempt: IAttemptModel | null = await AttemptModel.findOne({
        _id: attemptId,
    });

    return attempt;
};

export const getAttemptByAttemptIdentifier = async (identifier: string): Promise<IAttemptModel | null> => {

    const attempt: IAttemptModel | null = await AttemptModel.findOne({
        identifier,
    });

    return attempt;
};

export const getAttemptsByAccount = async (account: ObjectID | string): Promise<IAttemptModel[]> => {

    const attempts: IAttemptModel[] = await AttemptModel.find({
        account,
    });

    return attempts;
};

export const getAttemptsByAccountAndPage = async (account: ObjectID | string, limit: number, page: number): Promise<IAttemptModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const attempts: IAttemptModel[] = await AttemptModel.find({
        account,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });

    return attempts;
};

export const getAttemptCountByAccount = async (account: ObjectID | string): Promise<number> => {

    return (await AttemptModel.countDocuments({
        account,
    }));
};

export const getSelectedAccountAttemptPages = async (account: ObjectID | string, limit: number): Promise<number> => {

    if (limit <= 0) {
        return Infinity;
    }

    const count: number = await AttemptModel.countDocuments({
        account,
    });
    return Math.ceil(count / limit);
};

export const getAttemptsByQuery = async (query: Record<string, any>): Promise<IAttemptModel[]> => {

    return await AttemptModel.find(query);
};

export const getAttemptsByQueryLean = async (query: Record<string, any>): Promise<IAttempt[]> => {

    return await AttemptModel.find(query).lean();
};
