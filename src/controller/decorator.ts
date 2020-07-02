/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Decorator
 */

import { ObjectID } from "bson";
import { fitAnchor } from "../data/common";
import { IDecorator, IDecoratorConfig } from "../interface/decorator";
import { DecoratorModel, IDecoratorModel } from "../model/decorator";

export const createUnsavedDecorator = (name: string, description?: string): IDecoratorModel => {

    const anchor: string = fitAnchor(name);

    const config: IDecoratorConfig = {
        anchor,
        name,
        description,
    };
    return new DecoratorModel(config);
};

export const getDecoratorById = async (id: ObjectID): Promise<IDecoratorModel | null> => {

    return await DecoratorModel.findOne({
        _id: id,
    });
};

export const getDecoratorIdByName = async (name: string): Promise<ObjectID | null> => {

    const anchor: string = fitAnchor(name);
    const decorator: IDecoratorModel | null = await DecoratorModel.findOne({
        anchor,
    }, {
        _id: 1,
    });
    if (decorator) {
        return decorator._id;
    }
    return null;
};

export const getDecoratorIdsByNames = async (names: string[]): Promise<ObjectID[]> => {

    const anchors: string[] = names.map((name: string) => fitAnchor(name));
    const decorators: IDecoratorModel[] = await DecoratorModel.find({
        anchor: {
            $in: anchors,
        },
    }, {
        _id: 1,
    });
    return decorators.map((decorator: IDecoratorModel) => decorator._id);
};

export const getDecoratorByIdLean = async (id: ObjectID): Promise<IDecorator | null> => {

    return await DecoratorModel.findOne({
        _id: id,
    }).lean();
};

export const getDecoratorsByIds = async (ids: ObjectID[]): Promise<IDecoratorModel[]> => {

    return await DecoratorModel.find({
        _id: {
            $in: ids,
        },
    });
};

export const getDecoratorsByIdsLean = async (ids: ObjectID[]): Promise<IDecorator[]> => {

    return await DecoratorModel.find({
        _id: {
            $in: ids,
        },
    }).lean();
};

export const getDecoratorByName = async (name: string): Promise<IDecoratorModel | null> => {

    const anchor: string = fitAnchor(name);
    return await DecoratorModel.findOne({
        anchor,
    });
};

export const getDecoratorByNameLean = async (name: string): Promise<IDecorator | null> => {

    const anchor: string = fitAnchor(name);
    return await DecoratorModel.findOne({
        anchor,
    }).lean();
};

export const getDecoratorByNames = async (names: string[]): Promise<IDecoratorModel[]> => {

    const anchors: string[] = names.map((name: string) => fitAnchor(name));
    return await DecoratorModel.find({
        anchor: {
            $in: anchors,
        },
    });
};

export const getDecoratorByNamesLean = async (names: string[]): Promise<IDecorator[]> => {

    const anchors: string[] = names.map((name: string) => fitAnchor(name));
    return await DecoratorModel.find({
        anchor: {
            $in: anchors,
        },
    }).lean();
};

export const isDecoratorDuplicatedByName = async (name: string): Promise<boolean> => {
    const decorator: IDecoratorModel | null = await getDecoratorByName(name);
    return Boolean(decorator);
};

export const isDecoratorDuplicatedById = async (id: ObjectID): Promise<boolean> => {
    const decorator: IDecoratorModel | null = await getDecoratorById(id);
    return Boolean(decorator);
};

export const getSelectedActiveDecoratorPages = async (limit: number, keyword?: string): Promise<number> => {

    if (keyword) {
        return await getActiveDecoratorPagesByKeyword(limit, keyword);
    }
    return await getTotalActiveDecoratorPages(limit);
};

export const getTotalDecoratorPages = async (limit: number): Promise<number> => {

    return (await DecoratorModel.estimatedDocumentCount({})) / limit;
};

export const getTotalActiveDecoratorPages = async (limit: number): Promise<number> => {

    return (await DecoratorModel.countDocuments({
        active: true,
    })) / limit;
};

export const getActiveDecoratorPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    return (await DecoratorModel.countDocuments({
        anchor: {
            $regex: regexp,
        },
        active: true,
    })) / limit;
};

export const getDecoratorPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    return (await DecoratorModel.countDocuments({
        anchor: {
            $regex: regexp,
        },
    })) / limit;
};

export const getSelectedActiveDecoratorsByPage = async (limit: number, page: number, keyword?: string): Promise<IDecoratorModel[]> => {

    if (keyword) {
        return await getActiveDecoratorsByPage(keyword, limit, page);
    }
    return await getAllActiveDecoratorsByPage(limit, page);
};

export const getSelectedActiveDecoratorsByPageLean = async (limit: number, page: number, keyword?: string): Promise<IDecorator[]> => {

    if (keyword) {
        return await getActiveDecoratorsByPageLean(keyword, limit, page);
    }
    return await getAllActiveDecoratorsByPageLean(limit, page);
};

export const getSelectedDecoratorsByPage = async (limit: number, page: number, keyword?: string): Promise<IDecoratorModel[]> => {

    if (keyword) {
        return await getDecoratorsByPage(keyword, limit, page);
    }
    return await getAllDecoratorsByPage(limit, page);
};

export const getSelectedDecoratorsByPageLean = async (limit: number, page: number, keyword?: string): Promise<IDecorator[]> => {

    if (keyword) {
        return await getDecoratorsByPageLean(keyword, limit, page);
    }
    return await getAllDecoratorsByPageLean(limit, page);
};

export const getAllActiveDecorators = async (): Promise<IDecoratorModel[]> => {

    return await DecoratorModel.find({
        active: true,
    });
};

export const getAllActiveDecoratorsLean = async (): Promise<IDecorator[]> => {

    return await DecoratorModel.find({
        active: true,
    }).lean();
};

export const getAllDecorators = async (): Promise<IDecoratorModel[]> => DecoratorModel.find({});
export const getAllDecoratorsLean = async (): Promise<IDecorator[]> => DecoratorModel.find({}).lean();

export const getActiveDecoratorsByPage = async (keyword: string, limit: number, page: number): Promise<IDecoratorModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const decorators: IDecoratorModel[] = await DecoratorModel.find({
        anchor: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return decorators;
};

export const getActiveDecoratorsByPageLean = async (keyword: string, limit: number, page: number): Promise<IDecorator[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const decorators: IDecorator[] = await DecoratorModel.find({
        anchor: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return decorators;
};

export const getDecoratorsByPage = async (keyword: string, limit: number, page: number): Promise<IDecoratorModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const decorators: IDecoratorModel[] = await DecoratorModel.find({
        anchor: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return decorators;
};

export const getDecoratorsByPageLean = async (keyword: string, limit: number, page: number): Promise<IDecorator[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(anchor, 'i');
    const decorators: IDecorator[] = await DecoratorModel.find({
        anchor: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return decorators;
};

export const getAllActiveDecoratorsByPage = async (limit: number, page: number): Promise<IDecoratorModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const decorators: IDecoratorModel[] = await DecoratorModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return decorators;
};

export const getAllActiveDecoratorsByPageLean = async (limit: number, page: number): Promise<IDecorator[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const decorators: IDecorator[] = await DecoratorModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return decorators;
};

export const getAllDecoratorsByPage = async (limit: number, page: number): Promise<IDecoratorModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const decorators: IDecoratorModel[] = await DecoratorModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 });
    return decorators;
};

export const getAllDecoratorsByPageLean = async (limit: number, page: number): Promise<IDecorator[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const decorators: IDecorator[] = await DecoratorModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return decorators;
};

export const getDecoratorsByQuery = async (query: Record<string, any>): Promise<IDecoratorModel[]> => {

    return await DecoratorModel.find(query);
};

export const getDecoratorsByQueryLean = async (query: Record<string, any>): Promise<IDecorator[]> => {

    return await DecoratorModel.find(query).lean();
};
