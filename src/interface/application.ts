/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Application
 */

import { ObjectID } from "bson";

export enum INTERNAL_APPLICATION {

    AIR = 'BRONTOSAURUS_AIR',
    RED = 'BRONTOSAURUS_RED',
    PORTAL = 'BRONTOSAURUS_PORTAL',
}

export type ApplicationOthersConfig = {

    avatar?: string;
    backgroundImage?: string;
    favicon?: string;
    helpLink?: string;
    privacyPolicy?: string;
};

export interface IApplicationConfig extends ApplicationOthersConfig {

    readonly anchor: string;
    readonly key: string;

    name: string;
    green: string;

    expire: number;
    publicKey: string;
    privateKey: string;

    groups: ObjectID[];
}

export interface IApplication extends IApplicationConfig {

    active: boolean;
    history: string[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
