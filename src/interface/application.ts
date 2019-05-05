/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Application
 */

import { ObjectID } from "bson";

export enum INTERNAL_APPLICATION {

    RED = 'BRONTOSAURUS_RED',
    PORTAL = 'BRONTOSAURUS_PORTAL',
}

export interface IApplicationConfig {

    avatar?: string;
    key: string;
    name: string;

    expire: number;
    secret: string;

    groups: ObjectID[];
}

export interface IApplication extends IApplicationConfig {

    active: boolean;
    createdAt: Date;
    updatedAt: Date;

    history: string[];
}
