/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Organization
 */

import { ObjectID } from "bson";
import { fitAnchor } from "../data/common";
import { IOrganizationConfig, OrganizationDetail } from "../interface/organization";
import { AccountModel, IAccountModel } from "../model/account";
import { IOrganizationModel, OrganizationModel } from "../model/organization";

export const getOrganizationById = async (id: ObjectID): Promise<IOrganizationModel | null> =>
    await OrganizationModel.findOne({
        _id: id,
    });

export const getOrganizationDetailsById = async (id: ObjectID): Promise<OrganizationDetail | null> => {

    const organization: IOrganizationModel | null = await OrganizationModel.findOne({
        _id: id,
    });

    if (!organization) {
        return null;
    }

    const owner: IAccountModel | null = await AccountModel.findOne({
        _id: organization.owner,
    });

    if (!owner) {
        return null;
    }

    return {
        name: organization.name,
        owner: owner.username,
    };
};

export const getOrganizationsByIds = async (ids: ObjectID[]): Promise<IOrganizationModel[]> =>
    await OrganizationModel.find({
        _id: {
            $in: ids,
        },
    });

export const getOrganizationByName = async (name: string): Promise<IOrganizationModel | null> => {

    const anchor: string = fitAnchor(name);
    return await OrganizationModel.findOne({
        anchor,
    });
};

export const getOrganizationByNames = async (names: string[]): Promise<IOrganizationModel[]> => {

    const anchors: string[] = names.map((name: string) => fitAnchor(name));
    return await OrganizationModel.find({
        anchor: {
            $in: anchors,
        },
    });
};

export const getOrganizationsByOwner = async (owner: ObjectID): Promise<IOrganizationModel[]> =>
    await OrganizationModel.find({
        owner,
    });

export const createUnsavedOrganization = (
    name: string,
    owner: ObjectID,
): IOrganizationModel => {

    const anchor: string = fitAnchor(name);

    const config: IOrganizationConfig = {
        anchor,
        owner,
        name,
    };

    return new OrganizationModel(config);
};

export const isOrganizationDuplicatedByName = async (name: string): Promise<boolean> => {
    const organization: IOrganizationModel | null = await getOrganizationByName(name);
    return Boolean(organization);
};

export const isOrganizationDuplicatedById = async (id: ObjectID): Promise<boolean> => {
    const organization: IOrganizationModel | null = await getOrganizationById(id);
    return Boolean(organization);
};

export const getSelectedActiveOrganizationPages = async (limit: number, keyword?: string): Promise<number> => {

    if (keyword) {
        return await getActiveOrganizationPagesByKeyword(limit, keyword);
    }
    return await getTotalActiveOrganizationPages(limit);
};

export const getAllOrganizations = async (): Promise<IOrganizationModel[]> => OrganizationModel.find({});

export const getTotalOrganizationPages = async (limit: number): Promise<number> =>
    (await OrganizationModel.estimatedDocumentCount({})) / limit;

export const getTotalActiveOrganizationPages = async (limit: number): Promise<number> =>
    (await OrganizationModel.countDocuments({
        active: true,
    })) / limit;

export const getActiveOrganizationPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    return (await OrganizationModel.countDocuments({
        anchor: {
            $regex: regexp,
        },
        active: true,
    })) / limit;
};

export const getOrganizationPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    return (await OrganizationModel.countDocuments({
        anchor: {
            $regex: regexp,
        },
    })) / limit;
};

export const getSelectedActiveOrganizationsByPage = async (limit: number, page: number, keyword?: string): Promise<IOrganizationModel[]> => {

    if (keyword) {
        return await getActiveOrganizationsByPage(keyword, limit, page);
    }
    return await getAllActiveOrganizationsByPage(limit, page);
};

export const getSelectedOrganizationsByPage = async (limit: number, page: number, keyword?: string): Promise<IOrganizationModel[]> => {

    if (keyword) {
        return await getOrganizationsByPage(keyword, limit, page);
    }
    return await getAllOrganizationsByPage(limit, page);
};

export const getActiveOrganizationsByPage = async (keyword: string, limit: number, page: number): Promise<IOrganizationModel[]> => {

    if (page < 0) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const organizations: IOrganizationModel[] = await OrganizationModel.find({
        anchor: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return organizations;
};

export const getOrganizationsByPage = async (keyword: string, limit: number, page: number): Promise<IOrganizationModel[]> => {

    if (page < 0) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const organizations: IOrganizationModel[] = await OrganizationModel.find({
        anchor: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return organizations;
};

export const getAllActiveOrganizationsByPage = async (limit: number, page: number): Promise<IOrganizationModel[]> => {

    if (page < 0) {
        return [];
    }

    const organizations: IOrganizationModel[] = await OrganizationModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return organizations;
};

export const getAllOrganizationsByPage = async (limit: number, page: number): Promise<IOrganizationModel[]> => {

    if (page < 0) {
        return [];
    }

    const organizations: IOrganizationModel[] = await OrganizationModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 });
    return organizations;
};

export const getAllOrganizationName = async (): Promise<string[]> => {

    const organizations: IOrganizationModel[] = await OrganizationModel.find({});
    return organizations.map((organization: IOrganizationModel) => organization.name);
};

export const getAllActiveOrganizationName = async (): Promise<string[]> => {

    const organizations: IOrganizationModel[] = await OrganizationModel.find({
        active: true,
    });
    return organizations.map((organization: IOrganizationModel) => organization.name);
};
