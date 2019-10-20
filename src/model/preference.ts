/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Preference
 */

import { ObjectID } from "bson";
import { Document, model, Model, Schema } from "mongoose";
import { IPreference, PreferenceActions } from "../interface/preference";

const PreferenceSchema: Schema = new Schema(
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
        history: {
            type: [String],
            required: true,
            default: [],
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

    pushHistory<T extends keyof PreferenceActions>(
        action: T,
        application: ObjectID,
        by: ObjectID,
        content: string,
        extra: PreferenceActions[T],
    ): IPreferenceModel;
}

PreferenceSchema.methods.pushHistory = function <T extends keyof PreferenceActions>(
    this: IPreferenceModel,
    action: T,
    application: ObjectID,
    by: ObjectID,
    content: string,
    extra: PreferenceActions[T],
): IPreferenceModel {

    this.history = [
        ...this.history,
        {
            action,
            application,
            at: new Date(),
            by,
            content,
            extra,
        },
    ];

    return this;
};

export const PreferenceModel: Model<IPreferenceModel> = model<IPreferenceModel>('Preference', PreferenceSchema);
