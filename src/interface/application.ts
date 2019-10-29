/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Application
 */

import { ObjectID } from "bson";
import { History } from "./common";

export enum INTERNAL_APPLICATION {

    RED = 'BRONTOSAURUS_RED',
    GREEN = 'BRONTOSAURUS_GREEN',
    PORTAL = 'BRONTOSAURUS_PORTAL',
}

export type ApplicationActions = {

    CREATE: undefined;
};

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
    greenAccess: boolean;

    expire: number;
    publicKey: string;
    privateKey: string;

    groups: ObjectID[];
}

export interface IApplication extends IApplicationConfig {

    active: boolean;
    history: History[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
