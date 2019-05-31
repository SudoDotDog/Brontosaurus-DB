/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Information
 */

import { _Array } from "@sudoo/bark/array";
import { ApplicationOthersConfig } from "../interface/application";
import { IApplicationModel } from "../model/application";
import { getApplicationByKey } from "./application";
import { getSinglePreference } from "./preference";

export const getApplicationOtherInformation = async (key: string): Promise<ApplicationOthersConfig | null> => {

    const application: IApplicationModel | null = await getApplicationByKey(key);

    if (!application) {
        return null;
    }

    const response: ApplicationOthersConfig = {
        avatar: application.avatar,
        backgroundImage: application.backgroundImage,
        help: application.help,
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

    if (!response.help) {
        const globalHelpLink: string | null = await getSinglePreference('globalHelpLink');

        if (globalHelpLink) {
            response.help = globalHelpLink;
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
