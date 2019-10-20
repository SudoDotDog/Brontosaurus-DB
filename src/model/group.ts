/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Group
 */

import { ObjectID } from "bson";
import { Document, model, Model, Schema } from "mongoose";
import { GroupActions, IGroup } from "../interface/group";

const GroupSchema: Schema = new Schema(
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
        description: {
            type: String,
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

export interface IGroupModel extends IGroup, Document {

    pushHistory<T extends keyof GroupActions>(
        action: T,
        application: ObjectID,
        by: ObjectID,
        content: string,
        extra: GroupActions[T],
    ): IGroupModel;
}

GroupSchema.methods.pushHistory = function <T extends keyof GroupActions>(
    this: IGroupModel,
    action: T,
    application: ObjectID,
    by: ObjectID,
    content: string,
    extra: GroupActions[T],
): IGroupModel {

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

export const GroupModel: Model<IGroupModel> = model<IGroupModel>('Group', GroupSchema);
