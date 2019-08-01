/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Information
 */

import { _Array } from "@sudoo/bark/array";
import { ApplicationOthersConfig, IApplication } from "../interface/application";
import { getApplicationByKeyLean } from "./application";
import { getSinglePreference } from "./preference";

export const getApplicationOtherInformationByApplication = async (application: IApplication): Promise<ApplicationOthersConfig> => {

    const response: ApplicationOthersConfig = {
        avatar: application.avatar,
        backgroundImage: application.backgroundImage,
        favicon: application.favicon,
        helpLink: application.helpLink,
        privacyPolicy: application.privacyPolicy,
    };

    if (!response.avatar) {
        const globalAvatar: string | null = await getSinglePreference('globalAvatar');

        if (globalAvatar) {
            response.avatar = globalAvatar;
        }
    }

    if (!response.backgroundImage) {
        const globalBackgroundImages: string[] | null = await getSinglePreference('globalBackgroundImages');

        if (globalBackgroundImages) {
            response.backgroundImage = _Array.sample(globalBackgroundImages);
        }
    }

    if (!response.favicon) {

        const globalFavicon: string | null = await getSinglePreference('globalFavicon');

        if (globalFavicon) {
            response.favicon = globalFavicon;
        }
    }

    if (!response.helpLink) {
        const globalHelpLink: string | null = await getSinglePreference('globalHelpLink');

        if (globalHelpLink) {
            response.helpLink = globalHelpLink;
        }
    }

    if (!response.privacyPolicy) {
        const globalPrivacyPolicy: string | null = await getSinglePreference('globalPrivacyPolicy');

        if (globalPrivacyPolicy) {
            response.privacyPolicy = globalPrivacyPolicy;
        }
    }

    return response;
};

export const getApplicationOtherInformationByKey = async (key: string): Promise<ApplicationOthersConfig | null> => {

    const application: IApplication | null = await getApplicationByKeyLean(key);

    if (!application) {
        return null;
    }

    return await getApplicationOtherInformationByApplication(application);
};
