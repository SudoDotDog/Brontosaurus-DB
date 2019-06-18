/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Monitor
 */

import { Document, model, Model, Schema } from "mongoose";
import { IMonitor } from "../interface/monitor";

const MonitorSchema: Schema = new Schema({

    application: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    healthCheck: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    january: {
        type: [String],
        required: true,
        default: new Array(31).fill('-'.repeat(48)),
    },
    february: {
        type: [String],
        required: true,
        default: new Array(29).fill('-'.repeat(48)),
    },
    march: {
        type: [String],
        required: true,
        default: new Array(31).fill('-'.repeat(48)),
    },
    april: {
        type: [String],
        required: true,
        default: new Array(30).fill('-'.repeat(48)),
    },
    may: {
        type: [String],
        required: true,
        default: new Array(31).fill('-'.repeat(48)),
    },
    june: {
        type: [String],
        required: true,
        default: new Array(30).fill('-'.repeat(48)),
    },
    july: {
        type: [String],
        required: true,
        default: new Array(31).fill('-'.repeat(48)),
    },
    august: {
        type: [String],
        required: true,
        default: new Array(31).fill('-'.repeat(48)),
    },
    september: {
        type: [String],
        required: true,
        default: new Array(30).fill('-'.repeat(48)),
    },
    october: {
        type: [String],
        required: true,
        default: new Array(31).fill('-'.repeat(48)),
    },
    november: {
        type: [String],
        required: true,
        default: new Array(30).fill('-'.repeat(48)),
    },
    december: {
        type: [String],
        required: true,
        default: new Array(31).fill('-'.repeat(48)),
    },
    other: {
        type: [String],
        required: true,
        default: new Array(5).fill('-'.repeat(48)),
    },
}, {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    });


export interface IMonitorModel extends IMonitor, Document {
}

export const MonitorModel: Model<IMonitorModel> = model<IMonitorModel>('Monitor', MonitorSchema);
