/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Preference
 */

export type RegisterInfoType = 'string' | 'number';
export type RegisterInfo = {

    readonly name: string;
    readonly type: RegisterInfoType;
};

export type Preferences = {

    readonly registerInfo: RegisterInfo;
    readonly prepared: boolean;

    readonly backgroundImages: string[];
    readonly globalAvatar: string;
};

export interface IPreferenceConfig {

    readonly name: string;
    readonly value: any;
}

export interface IPreference extends IPreferenceConfig {

    readonly active: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    readonly history: string[];
}
