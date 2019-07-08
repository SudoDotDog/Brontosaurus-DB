/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Raw
 * @description Account
 */

import { AccountModel, IAccountModel } from "../model/account";

export const getAccountByRawUsername = async (username: string): Promise<IAccountModel | null> =>
    await AccountModel.findOne({
        username,
    });

export const getActiveAccountPagesByRawKeyword = async (limit: number, keyword: string): Promise<number> => {

    const regexp: RegExp = new RegExp(keyword, 'i');
    return (await AccountModel.countDocuments({
        username: {
            $regex: regexp,
        },
        active: true,
    })) / limit;
};

export const getAccountPagesByRawKeyword = async (limit: number, keyword: string): Promise<number> => {

    const regexp: RegExp = new RegExp(keyword, 'i');
    return (await AccountModel.countDocuments({
        username: {
            $regex: regexp,
        },
    })) / limit;
};

export const getActiveAccountsByRawPage = async (keyword: string, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0) {
        return [];
    }

    const regexp: RegExp = new RegExp(keyword, 'i');
    const accounts: IAccountModel[] = await AccountModel.find({
        username: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return accounts;
};

export const getAccountsByRawPage = async (keyword: string, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0) {
        return [];
    }

    const regexp: RegExp = new RegExp(keyword, 'i');
    const accounts: IAccountModel[] = await AccountModel.find({
        username: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return accounts;
};
