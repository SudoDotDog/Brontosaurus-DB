/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Application
 */

import { ObjectID } from "bson";

export enum INTERNAL_APPLICATION {

    RED = 'BRONTOSAURUS_RED',
    GREEN = 'BRONTOSAURUS_GREEN',
    PORTAL = 'BRONTOSAURUS_PORTAL',
}

export type ApplicationRedirection = {

    readonly name: string;
    readonly regexp: string;
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
    portalAccess: boolean;

    expire: number;
    publicKey: string;
    privateKey: string;

    redirections: ApplicationRedirection[];
    iFrameProtocol: boolean;
    postProtocol: boolean;
    alertProtocol: boolean;
    noneProtocol: boolean;

    groups: ObjectID[]; // Only account with these group can access this application

    requires: ObjectID[]; // Only show these groups in token
    requireTags: ObjectID[]; // Only show these tags in token
}

export interface IApplication extends IApplicationConfig {

    active: boolean;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
