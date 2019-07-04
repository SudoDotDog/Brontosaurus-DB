/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Decorator
 */

import { ObjectID } from "bson";

export interface IDecoratorConfig {

    name: string;

    description?: string;
}

export interface IDecorator extends IDecoratorConfig {

    addableGroups: ObjectID[];
    removableGroups: ObjectID[];

    decorators: ObjectID[];

    active: boolean;
    history: string[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
