/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Raw
 * @description Organization
 */

import { IOrganizationModel, OrganizationModel } from "../model/organization";

export const getOrganizationByRawName = async (name: string): Promise<IOrganizationModel | null> =>
    await OrganizationModel.findOne({
        name,
    });

export const getOrganizationByRawNames = async (names: string[]): Promise<IOrganizationModel[]> =>
    await OrganizationModel.find({
        name: {
            $in: names,
        },
    });

export const getActiveOrganizationPagesByRawKeyword = async (limit: number, keyword: string): Promise<number> => {

    const regexp: RegExp = new RegExp(keyword, 'i');
    return (await OrganizationModel.countDocuments({
        name: {
            $regex: regexp,
        },
        active: true,
    })) / limit;
};

export const getOrganizationPagesByRawKeyword = async (limit: number, keyword: string): Promise<number> => {

    const regexp: RegExp = new RegExp(keyword, 'i');
    return (await OrganizationModel.countDocuments({
        name: {
            $regex: regexp,
        },
    })) / limit;
};

export const getActiveOrganizationsByRawPage = async (keyword: string, limit: number, page: number): Promise<IOrganizationModel[]> => {

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

export const getOrganizationsByRawPage = async (keyword: string, limit: number, page: number): Promise<IOrganizationModel[]> => {

    if (page < 0) {
        return [];
    }

    const regexp: RegExp = new RegExp(keyword, 'i');
    const organizations: IOrganizationModel[] = await OrganizationModel.find({
        name: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return organizations;
};
