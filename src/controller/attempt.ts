/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Attempt
 */

import { randomUnique } from "@sudoo/random";
import { ObjectID } from "bson";
import { IAttemptConfig } from "../interface/attempt";
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
    }).skip(page * limit).limit(limit);

    return attempts;
};
