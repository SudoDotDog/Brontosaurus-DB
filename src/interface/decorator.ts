/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Decorator
 */

import { ObjectID } from "bson";

export interface IDecoratorConfig {

    name: string;
    groups: ObjectID[];
    description?: string;
}

export interface IDecorator extends IDecoratorConfig {

    active: boolean;
    history: string[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
