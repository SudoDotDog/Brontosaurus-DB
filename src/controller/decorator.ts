/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Decorator
 */

import { ObjectID } from "bson";
import { IDecoratorConfig } from "../interface/decorator";
import { DecoratorModel, IDecoratorModel } from "../model/decorator";

export const createUnsavedDecorator = (name: string, groups: ObjectID[], description?: string): IDecoratorModel => {

    const config: IDecoratorConfig = {
        name,
        groups,
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

export const getDecoratorByName = async (name: string): Promise<IDecoratorModel | null> =>
    await DecoratorModel.findOne({
        name,
    });

export const getDecoratorByNames = async (names: string[]): Promise<IDecoratorModel[]> =>
    await DecoratorModel.find({
        name: {
            $in: names,
        },
    });

export const isDecoratorDuplicatedByName = async (name: string): Promise<boolean> => {
    const decorator: IDecoratorModel | null = await getDecoratorByName(name);
    return Boolean(decorator);
};

export const isDecoratorDuplicatedById = async (id: ObjectID): Promise<boolean> => {
    const decorator: IDecoratorModel | null = await getDecoratorById(id);
    return Boolean(decorator);
};

export const getTotalActiveDecoratorPages = async (limit: number): Promise<number> =>
    (await DecoratorModel.estimatedDocumentCount({
        active: true,
    })) / limit;

export const getSelectedActiveDecoratorsByPage = async (limit: number, page: number, keyword?: string): Promise<IDecoratorModel[]> => {

    if (keyword) {
        return await getActiveDecoratorsByPage(keyword, limit, page);
    }
    return await getAllActiveDecoratorsByPage(limit, page);
};

export const getActiveDecoratorsByPage = async (keyword: string, limit: number, page: number): Promise<IDecoratorModel[]> => {

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

export const getAllActiveDecoratorsByPage = async (limit: number, page: number): Promise<IDecoratorModel[]> => {

    if (page < 0) {
        return [];
    }

    const decorators: IDecoratorModel[] = await DecoratorModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return decorators;
};
