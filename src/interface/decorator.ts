/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Decorator
 */

import { ObjectID } from "bson";
import { History } from "./common";

export type DecoratorActions = {
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
    history: History[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
