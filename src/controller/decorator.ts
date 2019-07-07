/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Decorator
 */

import { ObjectID } from "bson";
import { fitAnchor } from "../data/common";
import { IDecoratorConfig } from "../interface/decorator";
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

export const getDecoratorById = async (id: ObjectID): Promise<IDecoratorModel | null> =>
    await DecoratorModel.findOne({
        _id: id,
    });

export const getDecoratorsByIds = async (ids: ObjectID[]): Promise<IDecoratorModel[]> =>
    await DecoratorModel.find({
        _id: {
            $in: ids,
        },
    });

export const getDecoratorByRawName = async (name: string): Promise<IDecoratorModel | null> =>
    await DecoratorModel.findOne({
        name,
    });

export const getDecoratorByName = async (name: string): Promise<IDecoratorModel | null> => {

    const anchor: string = fitAnchor(name);
    return await DecoratorModel.findOne({
        anchor,
    });
};

export const getDecoratorByRawNames = async (names: string[]): Promise<IDecoratorModel[]> =>
    await DecoratorModel.find({
        name: {
            $in: names,
        },
    });

export const getDecoratorByNames = async (names: string[]): Promise<IDecoratorModel[]> => {

    const anchors: string[] = names.map((name: string) => fitAnchor(name));
    return await DecoratorModel.find({
        anchor: {
            $in: anchors,
        },
    });
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

export const getTotalDecoratorPages = async (limit: number): Promise<number> =>
    (await DecoratorModel.estimatedDocumentCount({})) / limit;

export const getTotalActiveDecoratorPages = async (limit: number): Promise<number> =>
    (await DecoratorModel.countDocuments({
        active: true,
    })) / limit;

export const getActiveDecoratorPagesByRawKeyword = async (limit: number, keyword: string): Promise<number> => {

    const regexp: RegExp = new RegExp(keyword, 'i');
    return (await DecoratorModel.countDocuments({
        name: {
            $regex: regexp,
        },
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

export const getDecoratorPagesByRawKeyword = async (limit: number, keyword: string): Promise<number> => {

    const regexp: RegExp = new RegExp(keyword, 'i');
    return (await DecoratorModel.countDocuments({
        name: {
            $regex: regexp,
        },
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

export const getSelectedDecoratorsByPage = async (limit: number, page: number, keyword?: string): Promise<IDecoratorModel[]> => {

    if (keyword) {
        return await getDecoratorsByPage(keyword, limit, page);
    }
    return await getAllDecoratorsByPage(limit, page);
};

export const getAllActiveDecorators = async (): Promise<IDecoratorModel[]> =>
    await DecoratorModel.find({
        active: true,
    });

export const getAllDecorators = async (): Promise<IDecoratorModel[]> => DecoratorModel.find({});

export const getActiveDecoratorsByRawPage = async (keyword: string, limit: number, page: number): Promise<IDecoratorModel[]> => {

    if (page < 0) {
        return [];
    }

    const regexp: RegExp = new RegExp(keyword, 'i');
    const decorators: IDecoratorModel[] = await DecoratorModel.find({
        name: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return decorators;
};

export const getActiveDecoratorsByPage = async (keyword: string, limit: number, page: number): Promise<IDecoratorModel[]> => {

    if (page < 0) {
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

export const getDecoratorsByRawPage = async (keyword: string, limit: number, page: number): Promise<IDecoratorModel[]> => {

    if (page < 0) {
        return [];
    }

    const regexp: RegExp = new RegExp(keyword, 'i');
    const decorators: IDecoratorModel[] = await DecoratorModel.find({
        name: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return decorators;
};

export const getDecoratorsByPage = async (keyword: string, limit: number, page: number): Promise<IDecoratorModel[]> => {

    if (page < 0) {
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

export const getAllActiveDecoratorsByPage = async (limit: number, page: number): Promise<IDecoratorModel[]> => {

    if (page < 0) {
        return [];
    }

    const decorators: IDecoratorModel[] = await DecoratorModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return decorators;
};

export const getAllDecoratorsByPage = async (limit: number, page: number): Promise<IDecoratorModel[]> => {

    if (page < 0) {
        return [];
    }

    const decorators: IDecoratorModel[] = await DecoratorModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 });
    return decorators;
};
