/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Application
 */

import { trustable } from "@sudoo/bark/random";
import { Document, model, Model, Schema } from "mongoose";
import { IApplication } from "../interface/application";

const ApplicationSchema: Schema = new Schema(
    {
        active: {
            type: Boolean,
            required: true,
            default: true,
        },
        anchor: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        avatar: {
            type: String,
            required: false,
        },
        backgroundImage: {
            type: String,
            required: false,
        },
        favicon: {
            type: String,
            required: false,
        },
        helpLink: {
            type: String,
            required: false,
        },
        privacyPolicy: {
            type: String,
            required: false,
        },
        expire: {
            type: Number,
            required: true,
        },
        groups: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        key: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        green: {
            type: String,
            required: false,
        },
        publicKey: {
            type: String,
            required: true,
        },
        privateKey: {
            type: String,
            required: true,
        },
        history: {
            type: [String],
            required: true,
            default: [],
        },
    }, {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

export interface IApplicationModel extends IApplication, Document {

    pushHistory(history: string): IApplicationModel;
    refreshGreen(): IApplicationModel;
}

ApplicationSchema.methods.refreshGreen = function (this: IApplicationModel): IApplicationModel {

    this.green = trustable();

    return this;
};

ApplicationSchema.methods.pushHistory = function (this: IApplicationModel, history: string): IApplicationModel {

    this.history = [...this.history, history];

    return this;
};

export const ApplicationModel: Model<IApplicationModel> = model<IApplicationModel>('Application', ApplicationSchema);
