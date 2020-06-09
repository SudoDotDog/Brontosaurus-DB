/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Application
 */

import { Brontosaurus, BrontosaurusKey } from "@brontosaurus/core";
import { trustable } from "@sudoo/bark/random";
import { ObjectID } from "bson";
import { Document, model, Model, Schema } from "mongoose";
import { ApplicationActions, IApplication } from "../interface/application";
import { HistorySchema } from "./common";

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
        redirection: {
            type: [ApplicationRedirectionSchema],
            required: true,
            default: [],
        },
        groups: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        requires: {
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
        publicKey: {
            type: String,
            required: true,
        },
        privateKey: {
            type: String,
            required: true,
        },
        history: {
            type: [HistorySchema],
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
    pushHistory<T extends keyof ApplicationActions>(
        action: T,
        application: ObjectID,
        by: ObjectID,
        content: string,
        extra: ApplicationActions[T],
    ): IApplicationModel;
}

ApplicationSchema.methods.refreshGreen = function (this: IApplicationModel): IApplicationModel {

    // tslint:disable-next-line: no-magic-numbers
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

ApplicationSchema.methods.pushHistory = function <T extends keyof ApplicationActions>(
    this: IApplicationModel,
    action: T,
    application: ObjectID,
    by: ObjectID,
    content: string,
    extra: ApplicationActions[T],
): IApplicationModel {

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

export const ApplicationModel: Model<IApplicationModel> = model<IApplicationModel>('Application', ApplicationSchema);
