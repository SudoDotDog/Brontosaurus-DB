/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Preference
 */

import { Document, model, Model, Schema } from "mongoose";
import { IPreference } from "../interface/preference";

const PreferenceSchema: Schema<IPreferenceModel> = new Schema(
    {
        active: {
            type: Boolean,
            required: true,
            default: true,
        },
        name: {
            type: String,
            required: true,
            index: true,
        },
        value: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

export interface IPreferenceModel extends IPreference, Document {
}

export const PreferenceModel: Model<IPreferenceModel> = model<IPreferenceModel>('Preference', PreferenceSchema);
