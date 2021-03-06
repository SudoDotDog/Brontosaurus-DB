/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Account
 */

import { Basics } from "@brontosaurus/definition";
import { _Random } from "@sudoo/bark/random";
import { ObjectID } from "bson";
import { fitAnchor } from "../data/common";
import { IAccount, IAccountConfig } from "../interface/account";
import { AccountModel, IAccountModel } from "../model/account";
import { garblePassword } from "../util/auth";
import { parseObjectIDList } from "../util/object-id";
import { parseInfo } from "../util/token";

export const createOnLimboUnsavedAccount = (
    username: string,
    password: string,
    namespace: ObjectID,
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
        namespace,
        displayName,
        password: garblePassword(password, salt),
        previousPasswords: [],
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
    namespace: ObjectID,
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
        namespace,
        displayName,
        password: garblePassword(password, salt),
        previousPasswords: [],
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

export const getAccountsByOrganization = async (organization: string | ObjectID): Promise<IAccountModel[]> => {

    return await AccountModel.find({
        organization: organization as ObjectID,
    }).sort({ _id: -1 });
};

export const getAccountsByOrganizationAndPage = async (organization: string | ObjectID, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0 || limit < 1) {
        return [];
    }

    return await AccountModel.find({
        organization: organization as ObjectID,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
};

export const getAccountsByOrganizationLean = async (organization: string | ObjectID): Promise<IAccount[]> => {

    return await AccountModel.find({
        organization: organization as ObjectID,
    }).sort({ _id: -1 }).lean();
};

export const getAccountsByOrganizationAndPageLean = async (organization: string | ObjectID, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0 || limit < 1) {
        return [];
    }

    return await AccountModel.find({
        organization: organization as ObjectID,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
};

export const getAccountsByOrganizationPages = async (organization: ObjectID | string, limit: number): Promise<number> => {

    if (limit <= 0) {
        return Infinity;
    }

    const count: number = await AccountModel.countDocuments({
        organization: organization as ObjectID,
    });
    return Math.ceil(count / limit);
};

export const getAccountsByGroup = async (group: string | ObjectID): Promise<IAccountModel[]> => {

    return await AccountModel.find({
        groups: group as ObjectID,
    }).sort({ _id: -1 });
};

export const getAccountsByGroupAndPage = async (group: string | ObjectID, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0 || limit < 1) {
        return [];
    }

    return await AccountModel.find({
        groups: group as ObjectID,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
};

export const getAccountsByGroupLean = async (group: string | ObjectID): Promise<IAccount[]> => {

    return await AccountModel.find({
        groups: group as ObjectID,
    }).sort({ _id: -1 }).lean();
};

export const getAccountsByGroupAndPageLean = async (group: string | ObjectID, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0 || limit < 1) {
        return [];
    }

    return await AccountModel.find({
        groups: group as ObjectID,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
};

export const getAccountsByGroupPages = async (group: ObjectID | string, limit: number): Promise<number> => {

    if (limit <= 0) {
        return Infinity;
    }

    const count: number = await AccountModel.countDocuments({
        groups: group as ObjectID,
    });
    return Math.ceil(count / limit);
};

export const getAccountsByTag = async (tag: string | ObjectID): Promise<IAccountModel[]> => {

    return await AccountModel.find({
        tags: tag as ObjectID,
    }).sort({ _id: -1 });
};

export const getAccountsByTagAndPage = async (tag: string | ObjectID, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0 || limit < 1) {
        return [];
    }

    return await AccountModel.find({
        tags: tag as ObjectID,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
};

export const getAccountsByTagLean = async (tag: string | ObjectID): Promise<IAccount[]> => {

    return await AccountModel.find({
        tags: tag as ObjectID,
    }).sort({ _id: -1 }).lean();
};

export const getAccountsByTagAndPageLean = async (tag: string | ObjectID, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0 || limit < 1) {
        return [];
    }

    return await AccountModel.find({
        tags: tag as ObjectID,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
};

export const getAccountsByTagPages = async (tag: ObjectID | string, limit: number): Promise<number> => {

    if (limit <= 0) {
        return Infinity;
    }

    const count: number = await AccountModel.countDocuments({
        tags: tag as ObjectID,
    });
    return Math.ceil(count / limit);
};

export const getAccountsByNamespace = async (namespace: string | ObjectID): Promise<IAccountModel[]> => {

    return await AccountModel.find({
        namespace: namespace as ObjectID,
    }).sort({ _id: -1 });
};

export const getAccountsByNamespaceAndPage = async (namespace: string | ObjectID, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0 || limit < 1) {
        return [];
    }

    return await AccountModel.find({
        namespace: namespace as ObjectID,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
};

export const getAccountsByNamespaceLean = async (namespace: string | ObjectID): Promise<IAccount[]> => {

    return await AccountModel.find({
        namespace: namespace as ObjectID,
    }).sort({ _id: -1 }).lean();
};

export const getAccountsByNamespaceAndPageLean = async (namespace: string | ObjectID, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0 || limit < 1) {
        return [];
    }

    return await AccountModel.find({
        namespace: namespace as ObjectID,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
};

export const getAccountsByNamespacePages = async (namespace: ObjectID | string, limit: number): Promise<number> => {

    if (limit <= 0) {
        return Infinity;
    }

    const count: number = await AccountModel.countDocuments({
        namespace: namespace as ObjectID,
    });
    return Math.ceil(count / limit);
};

export const getAccountsByDecorator = async (decorator: string | ObjectID): Promise<IAccountModel[]> => {

    return await AccountModel.find({
        decorators: decorator as ObjectID,
    }).sort({ _id: -1 });
};

export const getAccountsByDecoratorAndPage = async (decorator: string | ObjectID, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0 || limit < 1) {
        return [];
    }

    return await AccountModel.find({
        decorators: decorator as ObjectID,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
};

export const getAccountsByDecoratorLean = async (decorator: string | ObjectID): Promise<IAccount[]> => {

    return await AccountModel.find({
        decorators: decorator as ObjectID,
    }).sort({ _id: -1 }).lean();
};

export const getAccountsByDecoratorAndPageLean = async (decorator: string | ObjectID, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0 || limit < 1) {
        return [];
    }

    return await AccountModel.find({
        decorators: decorator as ObjectID,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
};

export const getAccountsByDecoratorPages = async (decorator: ObjectID | string, limit: number): Promise<number> => {

    if (limit <= 0) {
        return Infinity;
    }

    const count: number = await AccountModel.countDocuments({
        decorators: decorator as ObjectID,
    });
    return Math.ceil(count / limit);
};

export const getActiveAccountsByGroups = async (groups: Array<string | ObjectID>): Promise<IAccountModel[]> => {

    return await AccountModel.find({
        groups: {
            $in: parseObjectIDList(groups),
        },
        active: true,
    });
};

export const getActiveAccountsByGroupsLean = async (groups: Array<string | ObjectID>): Promise<IAccount[]> => {

    return await AccountModel.find({
        groups: {
            $in: parseObjectIDList(groups),
        },
        active: true,
    }).lean();
};

export const getAccountsByGroups = async (groups: Array<string | ObjectID>): Promise<IAccountModel[]> => {

    return await AccountModel.find({
        groups: {
            $in: parseObjectIDList(groups),
        },
    });
};

export const getAccountsByGroupsLean = async (groups: Array<string | ObjectID>): Promise<IAccount[]> => {

    return await AccountModel.find({
        groups: {
            $in: parseObjectIDList(groups),
        },
    }).lean();
};

export const getAccountByUsernameAndNamespace = async (username: string, namespace: ObjectID): Promise<IAccountModel | null> => {

    const anchor: string = fitAnchor(username);
    return await AccountModel.findOne({
        anchor,
        namespace,
    });
};

export const getAccountByUsernameAndNamespaceLean = async (username: string, namespace: ObjectID): Promise<IAccount | null> => {

    const anchor: string = fitAnchor(username);
    return await AccountModel.findOne({
        anchor,
        namespace,
    }).lean();
};

export const getActiveAccountByUsernameAndNamespace = async (username: string, namespace: ObjectID): Promise<IAccountModel | null> => {

    const anchor: string = fitAnchor(username);
    return await AccountModel.findOne({
        active: true,
        anchor,
        namespace,
    });
};

export const getActiveAccountByUsernameAndNamespaceLean = async (username: string, namespace: ObjectID): Promise<IAccount | null> => {

    const anchor: string = fitAnchor(username);
    return await AccountModel.findOne({
        active: true,
        anchor,
        namespace,
    }).lean();
};

export const getAllAccounts = async (): Promise<IAccountModel[]> => AccountModel.find({});
export const getAllAccountsLean = async (): Promise<IAccount[]> => AccountModel.find({}).lean();

export const getAccountById = async (id: ObjectID | string): Promise<IAccountModel | null> => {

    return await AccountModel.findOne({
        _id: id,
    });
};

export const getAccountByIdLean = async (id: ObjectID | string): Promise<IAccount | null> => {

    return await AccountModel.findOne({
        _id: id,
    }).lean();
};

export const getTotalAccountPages = async (limit: number): Promise<number> => {

    if (limit <= 0) {
        return Infinity;
    }

    return (await AccountModel.estimatedDocumentCount({})) / limit;
};

export const getSelectedActiveAccountPages = async (limit: number, keyword?: string): Promise<number> => {

    if (limit <= 0) {
        return Infinity;
    }

    if (keyword) {
        return await getActiveAccountPagesByKeyword(limit, keyword);
    }
    return await getTotalActiveAccountPages(limit);
};

export const getSelectedAccountPages = async (limit: number, keyword?: string): Promise<number> => {

    if (limit <= 0) {
        return Infinity;
    }

    if (keyword) {
        return await getAccountPagesByKeyword(limit, keyword);
    }
    return await getTotalAccountPages(limit);
};

export const getTotalActiveAccountPages = async (limit: number): Promise<number> => {

    if (limit <= 0) {
        return Infinity;
    }

    return (await AccountModel.countDocuments({
        active: true,
    })) / limit;
};

export const getActiveAccountsByTags = async (tags: Array<string | ObjectID>): Promise<IAccountModel[]> => {

    return await AccountModel.find({
        tags: {
            $in: parseObjectIDList(tags),
        },
        active: true,
    });
};

export const getActiveAccountsByTagsLean = async (tags: Array<string | ObjectID>): Promise<IAccount[]> => {

    return await AccountModel.find({
        tags: {
            $in: parseObjectIDList(tags),
        },
        active: true,
    }).lean();
};

export const getAccountsByTags = async (tags: Array<string | ObjectID>): Promise<IAccountModel[]> => {

    return await AccountModel.find({
        tags: {
            $in: parseObjectIDList(tags),
        },
    });
};

export const getAccountsByTagsLean = async (tags: Array<string | ObjectID>): Promise<IAccount[]> => {

    return await AccountModel.find({
        tags: {
            $in: parseObjectIDList(tags),
        },
    }).lean();
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

    if (limit < 1) {
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

export const getStandaloneActiveAccountsByPageLean = async (keyword: string, limit: number, page: number): Promise<IAccount[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
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
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return accounts;
};

export const getSelectedActiveAccountsByPage = async (limit: number, page: number, keyword?: string): Promise<IAccountModel[]> => {

    if (keyword) {
        return await getActiveAccountsByPage(keyword, limit, page);
    }
    return await getAllActiveAccountsByPage(limit, page);
};


export const getSelectedActiveAccountsByPageLean = async (limit: number, page: number, keyword?: string): Promise<IAccount[]> => {

    if (keyword) {
        return await getActiveAccountsByPageLean(keyword, limit, page);
    }
    return await getAllActiveAccountsByPageLean(limit, page);
};

export const getSelectedAccountsByPage = async (limit: number, page: number, keyword?: string): Promise<IAccountModel[]> => {

    if (keyword) {
        return await getAccountsByPage(keyword, limit, page);
    }
    return await getAllAccountsByPage(limit, page);
};

export const getSelectedAccountsByPageLean = async (limit: number, page: number, keyword?: string): Promise<IAccount[]> => {

    if (keyword) {
        return await getAccountsByPageLean(keyword, limit, page);
    }
    return await getAllAccountsByPageLean(limit, page);
};

export const getActiveAccountsByPage = async (keyword: string, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
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

export const getActiveAccountsByPageLean = async (keyword: string, limit: number, page: number): Promise<IAccount[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const accounts: IAccountModel[] = await AccountModel.find({
        anchor: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return accounts;
};

export const getAccountsByPage = async (keyword: string, limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
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

export const getAccountsByPageLean = async (keyword: string, limit: number, page: number): Promise<IAccount[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const accounts: IAccountModel[] = await AccountModel.find({
        anchor: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return accounts;
};

export const getAllActiveAccountsByPage = async (limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const accounts: IAccountModel[] = await AccountModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return accounts;
};

export const getAllActiveAccountsByPageLean = async (limit: number, page: number): Promise<IAccount[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const accounts: IAccountModel[] = await AccountModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return accounts;
};

export const getAllAccountsByPage = async (limit: number, page: number): Promise<IAccountModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const accounts: IAccountModel[] = await AccountModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 });
    return accounts;
};

export const getAllAccountsByPageLean = async (limit: number, page: number): Promise<IAccount[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const accounts: IAccountModel[] = await AccountModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return accounts;
};

export const isAccountDuplicatedByUsernameAndNamespace = async (username: string, namespace: ObjectID): Promise<boolean> => {

    const account: IAccountModel | null = await getAccountByUsernameAndNamespace(username, namespace);
    return Boolean(account);
};

export const resetAccountPassword = async (username: string, namespace: ObjectID, newPassword: string): Promise<IAccountModel | null> => {

    const account: IAccountModel | null = await getAccountByUsernameAndNamespace(username, namespace);

    if (!account) {
        return null;
    }

    account.setPassword(newPassword, 'reset');

    await account.save();
    return account;
};

export const getAccountCountByOrganization = async (organizationId: ObjectID): Promise<number> => {

    return await AccountModel.countDocuments({
        organization: organizationId,
        active: true,
    });
};

export const getActiveAccountByGroupAndOrganization = async (group: ObjectID, organization: ObjectID): Promise<IAccountModel[]> => {

    return await AccountModel.find({
        groups: group,
        organization,
        active: true,
    });
};

export const getActiveAccountByGroupAndOrganizationLean = async (group: ObjectID, organization: ObjectID): Promise<IAccount[]> => {

    return await AccountModel.find({
        groups: group,
        organization,
        active: true,
    }).lean();
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

export const getActiveAccountsByGroupLean = async (group: ObjectID): Promise<IAccount[]> => {

    return await AccountModel.find({
        groups: group,
        active: true,
    }).lean();
};

export const getAccountsByQuery = async (query: Record<string, any>): Promise<IAccountModel[]> => {

    return await AccountModel.find(query);
};

export const getAccountsByQueryLean = async (query: Record<string, any>): Promise<IAccount[]> => {

    return await AccountModel.find(query).lean();
};

export const getAccountsByUsernames = async (usernames: string[]): Promise<IAccountModel[]> => {

    const anchors: string[] = usernames.map((username: string) => fitAnchor(username));
    return await AccountModel.find({
        anchor: {
            $in: anchors,
        },
    });
};

export const getAccountsByUsernamesLean = async (usernames: string[]): Promise<IAccount[]> => {

    const anchors: string[] = usernames.map((username: string) => fitAnchor(username));
    return await AccountModel.find({
        anchor: {
            $in: anchors,
        },
    }).lean();
};

export const getAccountsByIds = async (ids: string[] | ObjectID[]): Promise<IAccountModel[]> => {

    return await AccountModel.find({
        _id: {
            $in: ids,
        },
    });
};

export const getAccountsByIdsLean = async (ids: string[] | ObjectID[]): Promise<IAccount[]> => {

    return await AccountModel.find({
        _id: {
            $in: ids,
        },
    }).lean();
};
