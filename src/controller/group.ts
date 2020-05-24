/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Group
 */

import { ObjectID } from "bson";
import { fitAnchor } from "../data/common";
import { IGroup, IGroupConfig } from "../interface/group";
import { GroupModel, IGroupModel } from "../model/group";

export const createUnsavedGroup = (name: string, description?: string): IGroupModel => {

    const anchor: string = fitAnchor(name);

    const config: IGroupConfig = {
        anchor,
        name,
        description,
    };
    return new GroupModel(config);
};

export const getGroupById = async (id: ObjectID): Promise<IGroupModel | null> => {

    return await GroupModel.findOne({
        _id: id,
    });
};

export const getGroupByIdLean = async (id: ObjectID): Promise<IGroup | null> => {

    return await GroupModel.findOne({
        _id: id,
    }).lean();
};

export const getGroupsByIds = async (ids: ObjectID[]): Promise<IGroupModel[]> => {

    return await GroupModel.find({
        _id: {
            $in: ids,
        },
    });
};

export const getGroupsByIdsLean = async (ids: ObjectID[]): Promise<IGroup[]> => {

    return await GroupModel.find({
        _id: {
            $in: ids,
        },
    }).lean();
};

export const getGroupByName = async (name: string): Promise<IGroupModel | null> => {

    const anchor: string = fitAnchor(name);
    return await GroupModel.findOne({
        anchor,
    });
};

export const getGroupByNameLean = async (name: string): Promise<IGroup | null> => {

    const anchor: string = fitAnchor(name);
    return await GroupModel.findOne({
        anchor,
    }).lean();
};

export const getGroupIdByName = async (name: string): Promise<ObjectID | null> => {

    const anchor: string = fitAnchor(name);
    const group: IGroupModel | null = await GroupModel.findOne({
        anchor,
    }, {
        _id: 1,
    });
    if (group) {
        return group._id;
    }
    return null;
};

export const getGroupIdsByNames = async (names: string[]): Promise<ObjectID[]> => {

    const anchors: string[] = names.map((name: string) => fitAnchor(name));
    const groups: IGroupModel[] = await GroupModel.find({
        anchor: {
            $in: anchors,
        },
    }, {
        _id: 1,
    });
    return groups.map((group: IGroupModel) => group._id);
};

export const getGroupByNames = async (names: string[]): Promise<IGroupModel[]> => {

    const anchors: string[] = names.map((name: string) => fitAnchor(name));
    return await GroupModel.find({
        anchor: {
            $in: anchors,
        },
    });
};

export const getGroupByNamesLean = async (names: string[]): Promise<IGroup[]> => {

    const anchors: string[] = names.map((name: string) => fitAnchor(name));
    return await GroupModel.find({
        anchor: {
            $in: anchors,
        },
    }).lean();
};

export const isGroupDuplicatedByName = async (name: string): Promise<boolean> => {
    const group: IGroupModel | null = await getGroupByName(name);
    return Boolean(group);
};

export const isGroupDuplicatedById = async (id: ObjectID): Promise<boolean> => {
    const group: IGroupModel | null = await getGroupById(id);
    return Boolean(group);
};

export const getSelectedActiveGroupPages = async (limit: number, keyword?: string): Promise<number> => {

    if (keyword) {
        return await getActiveGroupPagesByKeyword(limit, keyword);
    }
    return await getTotalActiveGroupPages(limit);
};

export const getTotalGroupPages = async (limit: number): Promise<number> => {

    return (await GroupModel.estimatedDocumentCount({})) / limit;
};

export const getTotalActiveGroupPages = async (limit: number): Promise<number> => {

    return (await GroupModel.countDocuments({
        active: true,
    })) / limit;
};

export const getActiveGroupPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    return (await GroupModel.countDocuments({
        anchor: {
            $regex: regexp,
        },
        active: true,
    })) / limit;
};

export const getGroupPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    return (await GroupModel.countDocuments({
        anchor: {
            $regex: regexp,
        },
    })) / limit;
};

export const getSelectedActiveGroupsByPage = async (limit: number, page: number, keyword?: string): Promise<IGroupModel[]> => {

    if (keyword) {
        return await getActiveGroupsByPage(keyword, limit, page);
    }
    return await getAllActiveGroupsByPage(limit, page);
};

export const getSelectedActiveGroupsByPageLean = async (limit: number, page: number, keyword?: string): Promise<IGroup[]> => {

    if (keyword) {
        return await getActiveGroupsByPageLean(keyword, limit, page);
    }
    return await getAllActiveGroupsByPageLean(limit, page);
};

export const getSelectedGroupsByPage = async (limit: number, page: number, keyword?: string): Promise<IGroupModel[]> => {

    if (keyword) {
        return await getGroupsByPage(keyword, limit, page);
    }
    return await getAllGroupsByPage(limit, page);
};

export const getSelectedGroupsByPageLean = async (limit: number, page: number, keyword?: string): Promise<IGroup[]> => {

    if (keyword) {
        return await getGroupsByPageLean(keyword, limit, page);
    }
    return await getAllGroupsByPageLean(limit, page);
};

export const getAllActiveGroups = async (): Promise<IGroupModel[]> => {

    return await GroupModel.find({
        active: true,
    });
};

export const getAllActiveGroupsLean = async (): Promise<IGroup[]> => {

    return await GroupModel.find({
        active: true,
    }).lean();
};

export const getAllGroups = async (): Promise<IGroupModel[]> => GroupModel.find({});
export const getAllGroupsLean = async (): Promise<IGroup[]> => GroupModel.find({}).lean();

export const getActiveGroupsByPage = async (keyword: string, limit: number, page: number): Promise<IGroupModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const groups: IGroupModel[] = await GroupModel.find({
        anchor: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return groups;
};

export const getActiveGroupsByPageLean = async (keyword: string, limit: number, page: number): Promise<IGroup[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const groups: IGroup[] = await GroupModel.find({
        anchor: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return groups;
};

export const getGroupsByPage = async (keyword: string, limit: number, page: number): Promise<IGroupModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const groups: IGroupModel[] = await GroupModel.find({
        anchor: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return groups;
};

export const getGroupsByPageLean = async (keyword: string, limit: number, page: number): Promise<IGroup[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const groups: IGroup[] = await GroupModel.find({
        anchor: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return groups;
};

export const getAllActiveGroupsByPage = async (limit: number, page: number): Promise<IGroupModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const groups: IGroupModel[] = await GroupModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return groups;
};

export const getAllActiveGroupsByPageLean = async (limit: number, page: number): Promise<IGroup[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const groups: IGroup[] = await GroupModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return groups;
};

export const getAllGroupsByPage = async (limit: number, page: number): Promise<IGroupModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const groups: IGroupModel[] = await GroupModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 });
    return groups;
};

export const getAllGroupsByPageLean = async (limit: number, page: number): Promise<IGroup[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const groups: IGroup[] = await GroupModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return groups;
};
