/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Group
 */

export enum INTERNAL_USER_GROUP {

    SUPER_ADMIN = 'BRONTOSAURUS_SUPER_ADMIN',
    SELF_CONTROL = 'BRONTOSAURUS_SELF_CONTROL',
}

export interface IGroupConfig {

    readonly name: string;
}

export interface IGroup extends IGroupConfig {

    readonly active: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    readonly history: string[];
}
