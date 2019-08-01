/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Preference
 */

import { IPreference, Preferences } from "../interface/preference";
import { IPreferenceModel, PreferenceModel } from "../model/preference";

export const getSinglePreference = async <N extends keyof Preferences>(name: N): Promise<Preferences[N] | null> => {

    const preference: IPreference | null = await PreferenceModel.findOne({
        name,
    }).lean();

    if (!preference) {
        return null;
    }

    return JSON.parse(preference.value);
};

export const addMultiplePreference = async <N extends keyof Preferences>(name: N, value: Preferences[N]): Promise<void> => {

    const castedValue: string = JSON.stringify(value);

    const newPreference: IPreferenceModel = new PreferenceModel({
        name,
        value: castedValue,
    });
    await newPreference.save();
};

export const getMultiplePreference = async <N extends keyof Preferences>(name: N): Promise<Array<Preferences[N]>> => {

    const preferences: IPreference[] = await PreferenceModel.find({
        name,
    }).lean();

    return preferences.map((model: IPreference) => JSON.parse(model.value));
};

export const setSinglePreference = async <N extends keyof Preferences>(name: N, value: Preferences[N]): Promise<void> => {

    const preference: IPreferenceModel | null = await PreferenceModel.findOne({
        name,
    });
    const castedValue: string = JSON.stringify(value);

    if (preference) {

        preference.value = castedValue;
        await preference.save();
    } else {

        const newPreference: IPreferenceModel = new PreferenceModel({
            name,
            value: castedValue,
        });
        await newPreference.save();
    }

    return;
};

