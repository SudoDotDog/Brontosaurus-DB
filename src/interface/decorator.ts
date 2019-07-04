/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Decorator
 */

import { ObjectID } from "bson";

export interface IDecoratorConfig {

    groups: ObjectID[];
}

export interface IDecorator extends IDecoratorConfig {

    active: boolean;
    history: string[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
