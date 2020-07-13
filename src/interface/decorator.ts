/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Decorator
 */

import { ObjectID } from "bson";

export type DecoratorActions = {

    CREATE: undefined;
};

export const validateDecoratorAction = (action: keyof DecoratorActions): boolean => {

    const keys: Array<keyof DecoratorActions> = [
        "CREATE",
    ];
    return keys.includes(action);
};

export interface IDecoratorConfig {

    readonly anchor: string;
    readonly name: string;

    description?: string;
}

export interface IDecorator extends IDecoratorConfig {

    addableGroups: ObjectID[];
    removableGroups: ObjectID[];

    active: boolean;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
