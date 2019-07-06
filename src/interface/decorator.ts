/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Decorator
 */

import { ObjectID } from "bson";

export interface IDecoratorConfig {

    readonly anchor: string;
    readonly name: string;

    description?: string;
}

export interface IDecorator extends IDecoratorConfig {

    addableGroups: ObjectID[];
    removableGroups: ObjectID[];

    active: boolean;
    history: string[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
