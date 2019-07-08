/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Raw
 * @description Group
 */

import { GroupModel, IGroupModel } from "../model/group";

export const getGroupByRawName = async (name: string): Promise<IGroupModel | null> =>
    await GroupModel.findOne({
        name,
    });

export const getGroupByRawNames = async (names: string[]): Promise<IGroupModel[]> =>
    await GroupModel.find({
        name: {
            $in: names,
        },
    });

export const getActiveGroupPagesByRawKeyword = async (limit: number, keyword: string): Promise<number> => {

    const regexp: RegExp = new RegExp(keyword, 'i');
    return (await GroupModel.countDocuments({
        name: {
            $regex: regexp,
        },
        active: true,
    })) / limit;
};

export const getGroupPagesByRawKeyword = async (limit: number, keyword: string): Promise<number> => {

    const regexp: RegExp = new RegExp(keyword, 'i');
    return (await GroupModel.countDocuments({
        name: {
            $regex: regexp,
        },
    })) / limit;
};

export const getActiveGroupsByRawPage = async (keyword: string, limit: number, page: number): Promise<IGroupModel[]> => {

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

export const getGroupsByRawPage = async (keyword: string, limit: number, page: number): Promise<IGroupModel[]> => {

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
