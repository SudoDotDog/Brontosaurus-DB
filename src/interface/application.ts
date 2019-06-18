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
    helpLink?: string;
    privacyPolicy?: string;
    backgroundImage?: string;
};

export interface IApplicationConfig extends ApplicationOthersConfig {

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
