/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Group
 */

import { ObjectID } from "bson";
import { IGroupConfig } from "../interface/group";
import { GroupModel, IGroupModel } from "../model/group";

export const createUnsavedGroup = (name: string, description?: string): IGroupModel => {

    const config: IGroupConfig = {
        name,
        description,
    };
    return new GroupModel(config);
};

export const getGroupById = async (id: ObjectID): Promise<IGroupModel | null> =>
    await GroupModel.findOne({
        _id: id,
    });

export const getGroupsByIds = async (ids: ObjectID[]): Promise<IGroupModel[]> =>
    await GroupModel.find({
        _id: {
            $in: ids,
        },
    });

export const getGroupByName = async (name: string): Promise<IGroupModel | null> =>
    await GroupModel.findOne({
        name,
    });

export const getGroupByNames = async (names: string[]): Promise<IGroupModel[]> =>
    await GroupModel.find({
        name: {
            $in: names,
        },
    });

export const isGroupDuplicatedByName = async (name: string): Promise<boolean> => {
    const group: IGroupModel | null = await getGroupByName(name);
    return Boolean(group);
};

export const isGroupDuplicatedById = async (id: ObjectID): Promise<boolean> => {
    const group: IGroupModel | null = await getGroupById(id);
    return Boolean(group);
};

export const getTotalActiveGroupPages = async (limit: number): Promise<number> =>
    (await GroupModel.estimatedDocumentCount({
        active: true,
    })) / limit;

export const getActiveGroupPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const regexp: RegExp = new RegExp(keyword, 'i');
    return (await GroupModel.estimatedDocumentCount({
        name: {
            $regex: regexp,
        },
        active: true,
    })) / limit;
};

export const getGroupPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const regexp: RegExp = new RegExp(keyword, 'i');
    return (await GroupModel.estimatedDocumentCount({
        name: {
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

export const getSelectedGroupsByPage = async (limit: number, page: number, keyword?: string): Promise<IGroupModel[]> => {

    if (keyword) {
        return await getGroupsByPage(keyword, limit, page);
    }
    return await getAllGroupsByPage(limit, page);
};

export const getAllActiveGroups = async (): Promise<IGroupModel[]> =>
    await GroupModel.find({
        active: true,
    });

export const getAllGroups = async (): Promise<IGroupModel[]> =>
    await GroupModel.find({});

export const getActiveGroupsByPage = async (keyword: string, limit: number, page: number): Promise<IGroupModel[]> => {

    if (page < 0) {
        return [];
    }

    const regexp: RegExp = new RegExp(keyword, 'i');
    const groups: IGroupModel[] = await GroupModel.find({
        name: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return groups;
};

export const getGroupsByPage = async (keyword: string, limit: number, page: number): Promise<IGroupModel[]> => {

    if (page < 0) {
        return [];
    }

    const regexp: RegExp = new RegExp(keyword, 'i');
    const groups: IGroupModel[] = await GroupModel.find({
        name: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return groups;
};


export const getAllActiveGroupsByPage = async (limit: number, page: number): Promise<IGroupModel[]> => {

    if (page < 0) {
        return [];
    }

    const groups: IGroupModel[] = await GroupModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return groups;
};

export const getAllGroupsByPage = async (limit: number, page: number): Promise<IGroupModel[]> => {

    if (page < 0) {
        return [];
    }

    const groups: IGroupModel[] = await GroupModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 });
    return groups;
};
