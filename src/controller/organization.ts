/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Organization
 */

import { ObjectID } from "bson";
import { fitAnchor } from "../data/common";
import { IAccount } from "../interface/account";
import { IOrganization, IOrganizationConfig, OrganizationDetail } from "../interface/organization";
import { AccountModel } from "../model/account";
import { IOrganizationModel, OrganizationModel } from "../model/organization";

export const getOrganizationById = async (id: ObjectID): Promise<IOrganizationModel | null> => {

    return await OrganizationModel.findOne({
        _id: id,
    });
};

export const getOrganizationByIdLean = async (id: ObjectID): Promise<IOrganization | null> => {

    return await OrganizationModel.findOne({
        _id: id,
    }).lean();
};

export const getOrganizationDetailsById = async (id: ObjectID): Promise<OrganizationDetail | null> => {

    const organization: IOrganizationModel | null = await OrganizationModel.findOne({
        _id: id,
    });

    if (!organization) {
        return null;
    }

    const owner: IAccount | null = await AccountModel.findOne({
        _id: organization.owner,
    }).lean();

    if (!owner) {
        return null;
    }

    return {
        name: organization.name,
        owner: owner.username,
    };
};

export const getOrganizationsByIds = async (ids: ObjectID[]): Promise<IOrganizationModel[]> => {

    return await OrganizationModel.find({
        _id: {
            $in: ids,
        },
    });
};

export const getOrganizationsByIdsLean = async (ids: ObjectID[]): Promise<IOrganization[]> => {

    return await OrganizationModel.find({
        _id: {
            $in: ids,
        },
    }).lean();
};

export const getOrganizationByName = async (name: string): Promise<IOrganizationModel | null> => {

    const anchor: string = fitAnchor(name);
    return await OrganizationModel.findOne({
        anchor,
    });
};

export const getOrganizationByNameLean = async (name: string): Promise<IOrganization | null> => {

    const anchor: string = fitAnchor(name);
    return await OrganizationModel.findOne({
        anchor,
    }).lean();
};

export const getOrganizationByNames = async (names: string[]): Promise<IOrganizationModel[]> => {

    const anchors: string[] = names.map((name: string) => fitAnchor(name));
    return await OrganizationModel.find({
        anchor: {
            $in: anchors,
        },
    });
};

export const getOrganizationByNamesLean = async (names: string[]): Promise<IOrganization[]> => {

    const anchors: string[] = names.map((name: string) => fitAnchor(name));
    return await OrganizationModel.find({
        anchor: {
            $in: anchors,
        },
    }).lean();
};

export const getActiveOrganizationsByTags = async (tags: string[]): Promise<IOrganizationModel[]> => {

    return await OrganizationModel.find({
        tags: {
            $in: tags,
        },
        active: true,
    });
};

export const getActiveOrganizationsByTagsLean = async (tags: string[]): Promise<IOrganization[]> => {

    return await OrganizationModel.find({
        tags: {
            $in: tags,
        },
        active: true,
    }).lean();
};

export const getOrganizationsByTags = async (tags: string[]): Promise<IOrganizationModel[]> => {

    return await OrganizationModel.find({
        tags: {
            $in: tags,
        },
    });
};

export const getOrganizationsByTagsLean = async (tags: string[]): Promise<IOrganization[]> => {

    return await OrganizationModel.find({
        tags: {
            $in: tags,
        },
    }).lean();
};

export const getOrganizationsByOwner = async (owner: ObjectID): Promise<IOrganizationModel[]> => {

    return await OrganizationModel.find({
        owner,
    });
};

export const getOrganizationsByOwnerLean = async (owner: ObjectID): Promise<IOrganization[]> => {

    return await OrganizationModel.find({
        owner,
    }).lean();
};

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
export const getAllOrganizationsLean = async (): Promise<IOrganization[]> => OrganizationModel.find({}).lean();

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

export const getSelectedActiveOrganizationsByPageLean = async (limit: number, page: number, keyword?: string): Promise<IOrganization[]> => {

    if (keyword) {
        return await getActiveOrganizationsByPageLean(keyword, limit, page);
    }
    return await getAllActiveOrganizationsByPageLean(limit, page);
};

export const getSelectedOrganizationsByPage = async (limit: number, page: number, keyword?: string): Promise<IOrganizationModel[]> => {

    if (keyword) {
        return await getOrganizationsByPage(keyword, limit, page);
    }
    return await getAllOrganizationsByPage(limit, page);
};

export const getSelectedOrganizationsByPageLean = async (limit: number, page: number, keyword?: string): Promise<IOrganization[]> => {

    if (keyword) {
        return await getOrganizationsByPageLean(keyword, limit, page);
    }
    return await getAllOrganizationsByPageLean(limit, page);
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

export const getActiveOrganizationsByPageLean = async (keyword: string, limit: number, page: number): Promise<IOrganization[]> => {

    if (page < 0) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const organizations: IOrganization[] = await OrganizationModel.find({
        anchor: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
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

export const getOrganizationsByPageLean = async (keyword: string, limit: number, page: number): Promise<IOrganization[]> => {

    if (page < 0) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const organizations: IOrganization[] = await OrganizationModel.find({
        anchor: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
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

export const getAllActiveOrganizationsByPageLean = async (limit: number, page: number): Promise<IOrganization[]> => {

    if (page < 0) {
        return [];
    }

    const organizations: IOrganization[] = await OrganizationModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
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

export const getAllOrganizationsByPageLean = async (limit: number, page: number): Promise<IOrganization[]> => {

    if (page < 0) {
        return [];
    }

    const organizations: IOrganization[] = await OrganizationModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
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

export const getOrganizationIdsByNames = async (names: string[]): Promise<ObjectID[]> => {

    const anchors: string[] = names.map((name: string) => fitAnchor(name));
    const organizations: IOrganizationModel[] = await OrganizationModel.find({
        anchor: {
            $in: anchors,
        },
    }, {
        _id: 1,
    });
    return organizations.map((organization: IOrganizationModel) => organization._id);
};
