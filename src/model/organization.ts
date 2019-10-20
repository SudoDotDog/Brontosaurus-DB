/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Organization
 */

import { ObjectID } from "bson";
import { Document, model, Model, Schema } from "mongoose";
import { IOrganization, OrganizationActions } from "../interface/organization";

const OrganizationSchema: Schema = new Schema(
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
        name: {
            type: String,
            required: true,
            unique: true,
        },
        decorators: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        tags: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        limit: {
            type: Number,
            required: true,
            default: 25,
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true,
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

export interface IOrganizationModel extends IOrganization, Document {

    pushHistory<T extends keyof OrganizationActions>(
        action: T,
        application: ObjectID,
        by: ObjectID,
        content: string,
        extra: OrganizationActions[T],
    ): IOrganizationModel;
}

OrganizationSchema.methods.pushHistory = function <T extends keyof OrganizationActions>(
    this: IOrganizationModel,
    action: T,
    application: ObjectID,
    by: ObjectID,
    content: string,
    extra: OrganizationActions[T],
): IOrganizationModel {

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

export const OrganizationModel: Model<IOrganizationModel> = model<IOrganizationModel>('Organization', OrganizationSchema);
