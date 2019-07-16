/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Account
 */

import { Basics } from "@brontosaurus/definition";
import { _Random } from "@sudoo/bark/random";
import { ObjectID } from "bson";
import { fitAnchor } from "../data/common";
import { IAccountConfig } from "../interface/account";
import { AccountModel, IAccountModel } from "../model/account";
import { garblePassword } from "../util/auth";
import { parseInfo } from "../util/token";

export const createOnLimboUnsavedAccount = (
    username: string,
    password: string,
    displayName?: string,
    email?: string,
    phone?: string,
    organization?: ObjectID,
    groups: ObjectID[] = [],
    infos: Record<string, Basics> = {},
    beacons: Record<string, Basics> = {},
    tags: ObjectID[] = [],
): IAccountModel => {

    const infoList: string[] = parseInfo(infos);
    const beaconList: string[] = parseInfo(beacons);

    const salt: string = _Random.unique();
    const mint: string = _Random.unique();
    const anchor: string = fitAnchor(username);

    const config: IAccountConfig = {

        anchor,
        username,
        displayName,
        password: garblePassword(password, salt),
        email,
        phone,
        infos: infoList,
        beacons: beaconList,
        mint,
        salt,
        organization,
        groups,
        tags,
    };
    return new AccountModel({

        limbo: true,
        ...config,
    });
};

export const createUnsavedAccount = (
    username: string,
    password: string,
    displayName?: string,
    email?: string,
    phone?: string,
    organization?: ObjectID,
    groups: ObjectID[] = [],
    infos: Record<string, Basics> = {},
    beacons: Record<string, Basics> = {},
    tags: ObjectID[] = [],
): IAccountModel => {

    const infoList: string[] = parseInfo(infos);
    const beaconList: string[] = parseInfo(beacons);

    const salt: string = _Random.unique();
    const mint: string = _Random.unique();
    const anchor: string = fitAnchor(username);

    const config: IAccountConfig = {

        anchor,
        username,
        displayName,
        password: garblePassword(password, salt),
        email,
        phone,
        infos: infoList,
        beacons: beaconList,
        mint,
        salt,
        organization,
        groups,
        tags,
    };
    return new AccountModel(config);
};

export const getAccountsByOrganization = async (organization: string): Promise<IAccountModel[]> =>
    await AccountModel.find({
        organization,
    });

export const getAccountsByGroup = async (group: string): Promise<IAccountModel[]> =>
    await AccountModel.find({
        groups: group,
    });

export const getAccountByUsername = async (username: string): Promise<IAccountModel | null> => {

    const anchor: string = fitAnchor(username);
    return await AccountModel.findOne({
        anchor,
    });
};

export const getActiveAccountByUsername = async (username: string): Promise<IAccountModel | null> => {

    const anchor: string = fitAnchor(username);
    return await AccountModel.findOne({
        anchor,
        active: true,
    });
};

export const getAllAccounts = async (): Promise<IAccountModel[]> => AccountModel.find({});

export const getAccountById = async (id: ObjectID | string): Promise<IAccountModel | null> =>
    await AccountModel.findOne({
        _id: id,
    });

export const getTotalAccountPages = async (limit: number): Promise<number> =>
    (await AccountModel.estimatedDocumentCount({})) / limit;

export const getSelectedActiveAccountPages = async (limit: number, keyword?: string): Promise<number> => {

    if (keyword) {
        return await getActiveAccountPagesByKeyword(limit, keyword);
    }
    return await getTotalActiveAccountPages(limit);
};

export const getTotalActiveAccountPages = async (limit: number): Promise<number> =>
    (await AccountModel.countDocuments({
        active: true,
    })) / limit;

export const getActiveAccountsByTags = async (tags: string[]): Promise<IAccountModel[]> => {

    return await AccountModel.find({
        tags: {
            $in: tags,
        },
        active: true,
    });
};

export const getAccountsByTags = async (tags: string[]): Promise<IAccountModel[]> => {

    return await AccountModel.find({
        tags: {
            $in: tags,
        },
    });
};

export const getActiveAccountPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    return (await AccountModel.countDocuments({
        anchor: {
            $regex: regexp,
        },
        active: true,
    })) / limit;
};

export const getAccountPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    return (await AccountModel.countDocuments({
        anchor: {
            $regex: regexp,
        },
    })) / limit;
};

export const getStandaloneAcitveAccountPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    return (await AccountModel.countDocuments({
        anchor: {
            $regex: regexp,
        },
        organization: {
            $exists: false,
        },
        active: true,
    })) / limit;
};

export const getStandaloneActiveAccountsByPage = async (keyword: string, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const accounts: IAccountModel[] = await AccountModel.find({
        anchor: {
            $regex: regexp,
        },
        organization: {
            $exists: false,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return accounts;
};

export const getSelectedActiveAccountsByPage = async (limit: number, page: number, keyword?: string): Promise<IAccountModel[]> => {

    if (keyword) {
        return await getActiveAccountsByPage(keyword, limit, page);
    }
    return await getAllActiveAccountsByPage(limit, page);
};

export const getSelectedAccountsByPage = async (limit: number, page: number, keyword?: string): Promise<IAccountModel[]> => {

    if (keyword) {
        return await getAccountsByPage(keyword, limit, page);
    }
    return await getAllAccountsByPage(limit, page);
};

export const getActiveAccountsByPage = async (keyword: string, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const accounts: IAccountModel[] = await AccountModel.find({
        anchor: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return accounts;
};

export const getAccountsByPage = async (keyword: string, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const accounts: IAccountModel[] = await AccountModel.find({
        anchor: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return accounts;
};

export const getAllActiveAccountsByPage = async (limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0) {
        return [];
    }

    const accounts: IAccountModel[] = await AccountModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return accounts;
};

export const getAllAccountsByPage = async (limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0) {
        return [];
    }

    const accounts: IAccountModel[] = await AccountModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 });
    return accounts;
};

export const isAccountDuplicatedByUsername = async (username: string): Promise<boolean> => {

    const account: IAccountModel | null = await getAccountByUsername(username);
    return Boolean(account);
};

export const resetAccountPassword = async (username: string, newPassword: string): Promise<IAccountModel | null> => {

    const account: IAccountModel | null = await getAccountByUsername(username);

    if (!account) {
        return null;
    }

    account.setPassword(newPassword);

    await account.save();
    return account;
};

export const getAccountCountByOrganization = async (organizationId: ObjectID): Promise<number> => {

    return await AccountModel.countDocuments({
        organization: organizationId,
        active: true,
    });
};

export const getActiveAccountCountByGroup = async (group: ObjectID): Promise<number> => {

    return await AccountModel.countDocuments({
        groups: group,
        active: true,
    });
};

export const getActiveAccountsByGroup = async (group: ObjectID): Promise<IAccountModel[]> => {

    return await AccountModel.find({
        groups: group,
        active: true,
    });
};
