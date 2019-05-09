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

    readonly avatar?: string;
    readonly key: string;
    readonly name: string;

    readonly expire: number;
    readonly secret: string;

    readonly groups: ObjectID[];
}

export interface IApplication extends IApplicationConfig {

    readonly active: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    readonly history: string[];
}
