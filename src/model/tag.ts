/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Tag
 */

import { ObjectID } from "bson";
import { Document, model, Model, Schema } from "mongoose";
import { ITag, TagActions } from "../interface/tag";

const TagSchema: Schema = new Schema(
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

export interface ITagModel extends ITag, Document {

    pushHistory<T extends keyof TagActions>(
        action: T,
        application: ObjectID,
        by: ObjectID,
        content: string,
        extra: TagActions[T],
    ): ITagModel;
}

TagSchema.methods.pushHistory = function <T extends keyof TagActions>(
    this: ITagModel,
    action: T,
    application: ObjectID,
    by: ObjectID,
    content: string,
    extra: TagActions[T],
): ITagModel {

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

export const TagModel: Model<ITagModel> = model<ITagModel>('Tag', TagSchema);
