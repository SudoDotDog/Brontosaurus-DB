/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Organization
 */

import { Document, model, Model, Schema } from "mongoose";
import { IOrganization } from "../interface/organization";

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
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

export interface IOrganizationModel extends IOrganization, Document {
}

export const OrganizationModel: Model<IOrganizationModel> = model<IOrganizationModel>('Organization', OrganizationSchema);
