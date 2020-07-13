/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Record
 */

import { ObjectID } from "bson";
import { IRecord, IRecordConfig, RecordCategory } from "../interface/record";
import { IRecordModel, RecordModel } from "../model/record";

export const createUnsavedRecord = <
    C extends keyof RecordCategory = any,
    A extends keyof RecordCategory[C] = any,
    >(config: IRecordConfig<C, A>): IRecordModel<C, A> => {

    return new RecordModel(config);
};

export const getRecordById = async (id: ObjectID): Promise<IRecordModel | null> => {

    return await RecordModel.findOne({
        _id: id,
    });
};

export const getRecordByIdLean = async (id: ObjectID): Promise<IRecord | null> => {

    return await RecordModel.findOne({
        _id: id,
    }).lean();
};

export const getRecordsByIds = async (ids: ObjectID[]): Promise<IRecordModel[]> => {

    return await RecordModel.find({
        _id: {
            $in: ids,
        },
    });
};

export const getRecordsByIdsLean = async (ids: ObjectID[]): Promise<IRecord[]> => {

    return await RecordModel.find({
        _id: {
            $in: ids,
        },
    }).lean();
};

export const getTotalRecordPages = async (limit: number): Promise<number> => {

    return (await RecordModel.estimatedDocumentCount({})) / limit;
};

export const getAllRecords = async (): Promise<IRecordModel[]> => RecordModel.find({});
export const getAllRecordsLean = async (): Promise<IRecord[]> => RecordModel.find({}).lean();

export const getAllRecordsByPage = async (limit: number, page: number): Promise<IRecordModel[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const records: IRecordModel[] = await RecordModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 });
    return records;
};

export const getAllRecordsByPageLean = async (limit: number, page: number): Promise<IRecord[]> => {

    if (page < 0) {
        return [];
    }

    if (limit < 1) {
        return [];
    }

    const records: IRecord[] = await RecordModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return records;
};

export const getRecordsByQuery = async (query: Record<string, any>): Promise<IRecordModel[]> => {

    return await RecordModel.find(query);
};

export const getDRecordsByQueryLean = async (query: Record<string, any>): Promise<IRecordModel[]> => {

    return await RecordModel.find(query).lean();
};
