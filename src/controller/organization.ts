/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Organization
 */

import { ObjectID } from "bson";
import { OrganizationAddress, OrganizationDetail } from "../interface/organization";
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
        address: organization.address,
        logo: organization.logo,
    };
};

export const getOrganizationsByIds = async (ids: ObjectID[]): Promise<IOrganizationModel[]> =>
    await OrganizationModel.find({
        _id: {
            $in: ids,
        },
    });

export const getOrganizationByName = async (name: string): Promise<IOrganizationModel | null> =>
    await OrganizationModel.findOne({
        name,
    });

export const getOrganizationByNames = async (names: string[]): Promise<IOrganizationModel[]> =>
    await OrganizationModel.find({
        name: {
            $in: names,
        },
    });

export const getOrganizationsByOwner = async (owner: ObjectID): Promise<IOrganizationModel[]> =>
    await OrganizationModel.find({
        owner,
    });

export const createUnsavedOrganization = (
    name: string,
    owner: ObjectID,
    address?: OrganizationAddress,
    logo?: string): IOrganizationModel =>
    new OrganizationModel({
        owner,
        name,
        address,
        logo,
    });

export const isOrganizationDuplicatedByName = async (name: string): Promise<boolean> => {
    const organization: IOrganizationModel | null = await getOrganizationByName(name);
    return Boolean(organization);
};

export const isOrganizationDuplicatedById = async (id: ObjectID): Promise<boolean> => {
    const organization: IOrganizationModel | null = await getOrganizationById(id);
    return Boolean(organization);
};

export const getTotalActiveOrganizationPages = async (limit: number): Promise<number> =>
    (await OrganizationModel.estimatedDocumentCount({
        active: true,
    })) / limit;

export const getSelectedActiveOrganizationsByPage = async (limit: number, page: number, keyword?: string): Promise<IOrganizationModel[]> => {

    if (keyword) {
        return await getActiveOrganizationsByPage(keyword, limit, page);
    }
    return await getAllActiveOrganizationsByPage(limit, page);
};

export const getActiveOrganizationsByPage = async (keyword: string, limit: number, page: number): Promise<IOrganizationModel[]> => {

    if (page < 0) {
        return [];
    }

    const regexp: RegExp = new RegExp(keyword, 'i');
    const organizations: IOrganizationModel[] = await OrganizationModel.find({
        name: {
            $regex: regexp,
        },
        active: true,
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
