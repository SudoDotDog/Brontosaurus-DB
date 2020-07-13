/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Preference
 */


export type RegisterInfoType = 'string' | 'number' | 'email' | 'password';

export type PreferenceActions = {

    CREATE: undefined;
};

export const validatePreferenceAction = (action: keyof PreferenceActions): boolean => {

    const keys: Array<keyof PreferenceActions> = [
        "CREATE",
    ];
    return keys.includes(action);
};

export type RegisterInfo = {

    name: string;
    type: RegisterInfoType;
};

export type Preferences = {

    readonly registerInfo: RegisterInfo;
    readonly prepared: boolean;

    readonly mailerTransport: any;
    readonly mailerSourceResetPassword: string;
    readonly mailerSourceNotification: string;

    readonly accountName: string;
    readonly systemName: string;
    readonly commandCenterName: string;

    readonly globalAvatar: string;
    readonly globalBackgroundImages: string[];
    readonly globalFavicon: string;
    readonly globalHelpLink: string;
    readonly globalPrivacyPolicy: string;

    readonly indexPage: string;
    readonly entryPage: string;
};

export interface IPreferenceConfig {

    name: string;
    value: any;
}

export interface IPreference extends IPreferenceConfig {

    active: boolean;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
