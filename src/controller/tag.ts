/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Tag
 */

import { ObjectID } from "bson";
import { fitAnchor } from "../data/common";
import { ITagConfig } from "../interface/tag";
import { ITagModel, TagModel } from "../model/tag";

export const createUnsavedTag = (name: string, description?: string): ITagModel => {

    const anchor: string = fitAnchor(name);

    const config: ITagConfig = {
        anchor,
        name,
        description,
    };
    return new TagModel(config);
};

export const getTagById = async (id: ObjectID): Promise<ITagModel | null> =>
    await TagModel.findOne({
        _id: id,
    });

export const getTagsByIds = async (ids: ObjectID[]): Promise<ITagModel[]> =>
    await TagModel.find({
        _id: {
            $in: ids,
        },
    });

export const getTagByName = async (name: string): Promise<ITagModel | null> => {

    const anchor: string = fitAnchor(name);
    return await TagModel.findOne({
        anchor,
    });
};

export const getTagByNames = async (names: string[]): Promise<ITagModel[]> => {

    const anchors: string[] = names.map((name: string) => fitAnchor(name));
    return await TagModel.find({
        anchor: {
            $in: anchors,
        },
    });
};

export const isTagDuplicatedByName = async (name: string): Promise<boolean> => {
    const tag: ITagModel | null = await getTagByName(name);
    return Boolean(tag);
};

export const isTagDuplicatedById = async (id: ObjectID): Promise<boolean> => {
    const tag: ITagModel | null = await getTagById(id);
    return Boolean(tag);
};

export const getSelectedActiveTagPages = async (limit: number, keyword?: string): Promise<number> => {

    if (keyword) {
        return await getActiveTagPagesByKeyword(limit, keyword);
    }
    return await getTotalActiveTagPages(limit);
};

export const getTotalTagPages = async (limit: number): Promise<number> =>
    (await TagModel.estimatedDocumentCount({})) / limit;

export const getTotalActiveTagPages = async (limit: number): Promise<number> =>
    (await TagModel.countDocuments({
        active: true,
    })) / limit;

export const getActiveTagPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    return (await TagModel.countDocuments({
        anchor: {
            $regex: regexp,
        },
        active: true,
    })) / limit;
};

export const getTagPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    return (await TagModel.countDocuments({
        anchor: {
            $regex: regexp,
        },
    })) / limit;
};

export const getSelectedActiveTagsByPage = async (limit: number, page: number, keyword?: string): Promise<ITagModel[]> => {

    if (keyword) {
        return await getActiveTagsByPage(keyword, limit, page);
    }
    return await getAllActiveTagsByPage(limit, page);
};

export const getSelectedTagsByPage = async (limit: number, page: number, keyword?: string): Promise<ITagModel[]> => {

    if (keyword) {
        return await getTagsByPage(keyword, limit, page);
    }
    return await getAllTagsByPage(limit, page);
};

export const getAllActiveTags = async (): Promise<ITagModel[]> =>
    await TagModel.find({
        active: true,
    });

export const getAllTags = async (): Promise<ITagModel[]> => TagModel.find({});

export const getActiveTagsByPage = async (keyword: string, limit: number, page: number): Promise<ITagModel[]> => {

    if (page < 0) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const tags: ITagModel[] = await TagModel.find({
        anchor: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return tags;
};

export const getTagsByPage = async (keyword: string, limit: number, page: number): Promise<ITagModel[]> => {

    if (page < 0) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const tags: ITagModel[] = await TagModel.find({
        anchor: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return tags;
};

export const getAllActiveTagsByPage = async (limit: number, page: number): Promise<ITagModel[]> => {

    if (page < 0) {
        return [];
    }

    const tags: ITagModel[] = await TagModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return tags;
};

export const getAllTagsByPage = async (limit: number, page: number): Promise<ITagModel[]> => {

    if (page < 0) {
        return [];
    }

    const tags: ITagModel[] = await TagModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 });
    return tags;
};
