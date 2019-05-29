/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Preference
 */

export type RegisterInfoType = 'string' | 'number';
export type RegisterInfo = {

    name: string;
    type: RegisterInfoType;
};

export type Preferences = {

    readonly registerInfo: RegisterInfo;
    readonly prepared: boolean;

    readonly backgroundImages: string[];
    readonly globalAvatar: string;
    readonly privacyPolicy: string;
};

export interface IPreferenceConfig {

    name: string;
    value: any;
}

export interface IPreference extends IPreferenceConfig {

    active: boolean;
    createdAt: Date;
    updatedAt: Date;

    history: string[];
}
