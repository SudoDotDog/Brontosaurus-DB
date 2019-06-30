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
        name: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true,
        },
        logo: {
            type: String,
            required: false,
        },
        address: {
            type: {
                first: String,
                second: String,
                zipcode: String,
            },
            required: false,
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

export interface IOrganizationModel extends IOrganization, Document {

    pushHistory(history: string): IOrganizationModel;
}

OrganizationSchema.methods.pushHistory = function (this: IOrganizationModel, history: string): IOrganizationModel {

    this.history = [...this.history, history];

    return this;
};

export const OrganizationModel: Model<IOrganizationModel> = model<IOrganizationModel>('Organization', OrganizationSchema);
