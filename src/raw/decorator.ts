/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Raw
 * @description Decorator
 */

import { DecoratorModel, IDecoratorModel } from "../model/decorator";

export const getDecoratorByRawName = async (name: string): Promise<IDecoratorModel | null> =>
    await DecoratorModel.findOne({
        name,
    });

export const getDecoratorByRawNames = async (names: string[]): Promise<IDecoratorModel[]> =>
    await DecoratorModel.find({
        name: {
            $in: names,
        },
    });

export const getActiveDecoratorPagesByRawKeyword = async (limit: number, keyword: string): Promise<number> => {

    const regexp: RegExp = new RegExp(keyword, 'i');
    return (await DecoratorModel.countDocuments({
        name: {
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

export const getActiveDecoratorsByRawPage = async (keyword: string, limit: number, page: number): Promise<IDecoratorModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
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

export const getDecoratorsByRawPage = async (keyword: string, limit: number, page: number): Promise<IDecoratorModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
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
