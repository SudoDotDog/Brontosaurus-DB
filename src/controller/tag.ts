/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Tag
 */

import { ObjectID } from "bson";
import { fitAnchor } from "../data/common";
import { ITag, ITagConfig } from "../interface/tag";
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

export const getTagById = async (id: ObjectID): Promise<ITagModel | null> => {

    return await TagModel.findOne({
        _id: id,
    });
};

export const getTagByIdLean = async (id: ObjectID): Promise<ITag | null> => {

    return await TagModel.findOne({
        _id: id,
    }).lean();
};

export const getTagIdByName = async (name: string): Promise<ObjectID | null> => {

    const anchor: string = fitAnchor(name);
    const tag: ITagModel | null = await TagModel.findOne({
        anchor,
    }, {
        _id: 1,
    });
    if (tag) {
        return tag._id;
    }
    return null;
};

export const getTagIdsByNames = async (names: string[]): Promise<ObjectID[]> => {

    const anchors: string[] = names.map((name: string) => fitAnchor(name));
    const tags: ITagModel[] = await TagModel.find({
        anchor: {
            $in: anchors,
        },
    }, {
        _id: 1,
    });
    return tags.map((tag: ITagModel) => tag._id);
};

export const getTagsByIds = async (ids: ObjectID[]): Promise<ITagModel[]> => {

    return await TagModel.find({
        _id: {
            $in: ids,
        },
    });
};

export const getTagsByIdsLean = async (ids: ObjectID[]): Promise<ITag[]> => {

    return await TagModel.find({
        _id: {
            $in: ids,
        },
    }).lean();
};

export const getTagByName = async (name: string): Promise<ITagModel | null> => {

    const anchor: string = fitAnchor(name);
    return await TagModel.findOne({
        anchor,
    });
};

export const getTagByNameLean = async (name: string): Promise<ITag | null> => {

    const anchor: string = fitAnchor(name);
    return await TagModel.findOne({
        anchor,
    }).lean();
};

export const getTagByNames = async (names: string[]): Promise<ITagModel[]> => {

    const anchors: string[] = names.map((name: string) => fitAnchor(name));
    return await TagModel.find({
        anchor: {
            $in: anchors,
        },
    });
};

export const getTagByNamesLean = async (names: string[]): Promise<ITag[]> => {

    const anchors: string[] = names.map((name: string) => fitAnchor(name));
    return await TagModel.find({
        anchor: {
            $in: anchors,
        },
    }).lean();
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

export const getTotalTagPages = async (limit: number): Promise<number> => {

    return (await TagModel.estimatedDocumentCount({})) / limit;
};

export const getTotalActiveTagPages = async (limit: number): Promise<number> => {

    return (await TagModel.countDocuments({
        active: true,
    })) / limit;
};

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

export const getSelectedActiveTagsByPageLean = async (limit: number, page: number, keyword?: string): Promise<ITag[]> => {

    if (keyword) {
        return await getActiveTagsByPageLean(keyword, limit, page);
    }
    return await getAllActiveTagsByPageLean(limit, page);
};

export const getSelectedTagsByPage = async (limit: number, page: number, keyword?: string): Promise<ITagModel[]> => {

    if (keyword) {
        return await getTagsByPage(keyword, limit, page);
    }
    return await getAllTagsByPage(limit, page);
};

export const getSelectedTagsByPageLean = async (limit: number, page: number, keyword?: string): Promise<ITag[]> => {

    if (keyword) {
        return await getTagsByPageLean(keyword, limit, page);
    }
    return await getAllTagsByPageLean(limit, page);
};

export const getAllActiveTags = async (): Promise<ITagModel[]> => {

    return await TagModel.find({
        active: true,
    });
};

export const getAllActiveTagsLean = async (): Promise<ITag[]> => {

    return await TagModel.find({
        active: true,
    }).lean();
};

export const getAllTags = async (): Promise<ITagModel[]> => TagModel.find({});
export const getAllTagsLean = async (): Promise<ITag[]> => TagModel.find({}).lean();

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

export const getActiveTagsByPageLean = async (keyword: string, limit: number, page: number): Promise<ITag[]> => {

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
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
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

export const getTagsByPageLean = async (keyword: string, limit: number, page: number): Promise<ITag[]> => {

    if (page < 0) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const tags: ITagModel[] = await TagModel.find({
        anchor: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
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

export const getAllActiveTagsByPageLean = async (limit: number, page: number): Promise<ITag[]> => {

    if (page < 0) {
        return [];
    }

    const tags: ITagModel[] = await TagModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
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

export const getAllTagsByPageLean = async (limit: number, page: number): Promise<ITag[]> => {

    if (page < 0) {
        return [];
    }

    const tags: ITagModel[] = await TagModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return tags;
};
