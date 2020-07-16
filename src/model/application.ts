/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Application
 */

import { Brontosaurus, BrontosaurusKey } from "@brontosaurus/core";
import { trustable } from "@sudoo/bark/random";
import { Document, model, Model, Schema } from "mongoose";
import { IApplication } from "../interface/application";

export const ApplicationRedirectionSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    regexp: {
        type: String,
        required: true,
    },
}, { _id: false });

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
        key: {
            type: String,
            required: true,
            unique: true,
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

        name: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        green: {
            type: String,
            required: true,
        },
        greenAccess: {
            type: Boolean,
            required: true,
            default: false,
        },
        portalAccess: {
            type: Boolean,
            required: true,
            default: false,
        },

        expire: {
            type: Number,
            required: true,
        },
        publicKey: {
            type: String,
            required: true,
        },
        privateKey: {
            type: String,
            required: true,
        },

        redirections: {
            type: [ApplicationRedirectionSchema],
            required: true,
            default: [],
        },
        iFrameProtocol: {
            type: Boolean,
            required: true,
            default: false,
        },
        postProtocol: {
            type: Boolean,
            required: true,
            default: false,
        },
        alertProtocol: {
            type: Boolean,
            required: true,
            default: false,
        },
        noneProtocol: {
            type: Boolean,
            required: true,
            default: false,
        },

        groups: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        tags: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        requires: {
            type: [Schema.Types.ObjectId],
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

export interface IApplicationModel extends IApplication, Document {

    refreshGreen(): IApplicationModel;
    refreshKey(): IApplicationModel;
    toggleGreenAccess(): IApplicationModel;
    togglePortalAccess(): IApplicationModel;
}

ApplicationSchema.methods.refreshGreen = function (this: IApplicationModel): IApplicationModel {

    this.green = trustable(new Date(), undefined, 64);

    return this;
};

ApplicationSchema.methods.refreshKey = function (this: IApplicationModel): IApplicationModel {

    const secret: BrontosaurusKey = Brontosaurus.generateBrontosaurusKey();

    this.publicKey = secret.public;
    this.privateKey = secret.private;

    return this;
};

ApplicationSchema.methods.toggleGreenAccess = function (this: IApplicationModel): IApplicationModel {

    this.greenAccess = !Boolean(this.greenAccess);
    return this;
};

ApplicationSchema.methods.togglePortalAccess = function (this: IApplicationModel): IApplicationModel {

    this.portalAccess = !Boolean(this.portalAccess);
    return this;
};

export const ApplicationModel: Model<IApplicationModel> = model<IApplicationModel>('Application', ApplicationSchema);
