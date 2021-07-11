/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Namespace
 */

import { Document, model, Model, Schema } from "mongoose";
import { INamespace } from "../interface/namespace";

const NamespaceSchema: Schema<INamespaceModel> = new Schema(
    {
        active: {
            type: Boolean,
            required: true,
            default: true,
        },
        name: {
            type: String,
        },
        domain: {
            type: String,
            index: true,
            unique: true,
            required: true,
        },
        namespace: {
            type: String,
            index: true,
            unique: true,
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

export interface INamespaceModel extends INamespace, Document {
}

export const NamespaceModel: Model<INamespaceModel> = model<INamespaceModel>('Namespace', NamespaceSchema);
