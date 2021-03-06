/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Tag
 */

import { ObjectID } from "bson";

export enum INTERNAL_TAG {

    DEFAULT = "DEFAULT",
}

export interface ITagConfig {

    readonly anchor: string;
    readonly name: string;

    description?: string;
}

export interface ITag extends ITagConfig {

    decorators: ObjectID[];

    active: boolean;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
