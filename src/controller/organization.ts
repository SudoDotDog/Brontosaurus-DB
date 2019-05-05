/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Organization
 */

import { ObjectID } from "bson";
import { IOrganizationModel, OrganizationModel } from "../model/organization";

export const getOrganizationById = async (id: ObjectID): Promise<IOrganizationModel | null> =>
    await OrganizationModel.findOne({
        _id: id,
    });

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

export const createUnsavedOrganization = (name: string): IOrganizationModel =>
    new OrganizationModel({

        name,
    });

export const isOrganizationDuplicatedByName = async (name: string): Promise<boolean> => {
    const Organization: IOrganizationModel | null = await getOrganizationByName(name);
    return Boolean(Organization);
};

export const isOrganizationDuplicatedById = async (id: ObjectID): Promise<boolean> => {
    const Organization: IOrganizationModel | null = await getOrganizationById(id);
    return Boolean(Organization);
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
    const Organizations: IOrganizationModel[] = await OrganizationModel.find({
        name: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return Organizations;
};

export const getAllActiveOrganizationsByPage = async (limit: number, page: number): Promise<IOrganizationModel[]> => {

    if (page < 0) {
        return [];
    }

    const Organizations: IOrganizationModel[] = await OrganizationModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return Organizations;
};
