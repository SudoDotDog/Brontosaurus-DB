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

export type ApplicationActions = {

    CREATE: undefined;
};

export type ApplicationRedirection = {

    readonly name: string;
    readonly regexp: string;
};

export const validateApplicationAction = (action: keyof ApplicationActions): boolean => {

    const keys: Array<keyof ApplicationActions> = [
        "CREATE",
    ];
    return keys.includes(action);
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

    groups: ObjectID[];
    requires: ObjectID[];
}

export interface IApplication extends IApplicationConfig {

    active: boolean;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
