/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Preference
 */

export type RegisterInfoType = 'string' | 'number' | 'email' | 'password';
export type RegisterInfo = {

    name: string;
    type: RegisterInfoType;
};

export type Preferences = {

    readonly registerInfo: RegisterInfo;
    readonly prepared: boolean;

    readonly accountName: string;
    readonly systemName: string;
    readonly commandCenterName: string;

    readonly globalAvatar: string;
    readonly globalBackgroundImages: string[];
    readonly globalFavicon: string;
    readonly globalHelpLink: string;
    readonly globalPrivacyPolicy: string;
};

export interface IPreferenceConfig {

    name: string;
    value: any;
}

export interface IPreference extends IPreferenceConfig {

    active: boolean;
    history: string[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
