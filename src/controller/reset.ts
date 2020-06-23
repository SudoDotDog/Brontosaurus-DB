/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Reset
 */

import { randomUnique } from "@sudoo/random";
import { ObjectID } from "bson";
import { IResetConfig } from "../interface/reset";
import { ResetModel, IResetModel } from "../model/reset";

export const createUnsavedReset = (config: IResetConfig): IResetModel => {

    const identifier: string = randomUnique();
    return new ResetModel({
        ...config,
        at: new Date(),
        identifier,
    });
};

export const getResetById = async (resetId: ObjectID | string): Promise<IResetModel | null> => {

    const reset: IResetModel | null = await ResetModel.findOne({
        _id: resetId,
    });

    return reset;
};

export const getResetsByAccount = async (account: ObjectID | string): Promise<IResetModel[]> => {

    const resets: IResetModel[] = await ResetModel.find({
        account,
    });

    return resets;
};

export const getResetsByAccountAndPage = async (account: ObjectID | string, limit: number, page: number): Promise<IResetModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const resets: IResetModel[] = await ResetModel.find({
        account,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });

    return resets;
};

export const getResetCountByAccount = async (account: ObjectID | string): Promise<number> => {

    return (await ResetModel.countDocuments({
        account,
    }));
};

export const getSelectedAccountResetPages = async (account: ObjectID | string, limit: number): Promise<number> => {

    if (limit <= 0) {
        return Infinity;
    }

    return (await ResetModel.countDocuments({
        account,
    })) / limit;
};
