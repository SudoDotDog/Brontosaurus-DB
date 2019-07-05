/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Application
 */

import { trustable } from "@sudoo/bark/random";
import { ApplicationOthersConfig, IApplicationConfig } from "../interface/application";
import { ApplicationModel, IApplicationModel } from "../model/application";

export const createUnsavedApplication = (name: string, key: string, expire: number, secret: string, others: ApplicationOthersConfig): IApplicationModel => {

    const tempGreen: string = trustable();
    const config: IApplicationConfig = {
        avatar: others.avatar,
        helpLink: others.helpLink,
        privacyPolicy: others.privacyPolicy,
        backgroundImage: others.backgroundImage,
        green: tempGreen,
        key,
        name,
        expire,
        secret,
        groups: [],
    };

    return new ApplicationModel(config);
};

export const getApplicationByKey = async (key: string): Promise<IApplicationModel | null> =>
    await ApplicationModel.findOne({
        key,
    });

export const isApplicationDuplicatedByKey = async (key: string): Promise<boolean> => {
    const application: IApplicationModel | null = await getApplicationByKey(key);
    return Boolean(application);
};

export const getTotalActiveApplicationPages = async (limit: number): Promise<number> =>
    (await ApplicationModel.estimatedDocumentCount({
        active: true,
    })) / limit;

export const getActiveApplicationPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const regexp: RegExp = new RegExp(keyword, 'i');
    return (await ApplicationModel.estimatedDocumentCount({
        name: {
            $regex: regexp,
        },
        active: true,
    })) / limit;
};

export const getApplicationPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const regexp: RegExp = new RegExp(keyword, 'i');
    return (await ApplicationModel.estimatedDocumentCount({
        name: {
            $regex: regexp,
        },
    })) / limit;
};

export const getSelectedActiveApplicationsByPage = async (limit: number, page: number, keyword?: string): Promise<IApplicationModel[]> => {

    if (keyword) {
        return await getActiveApplicationsByPage(keyword, limit, page);
    }
    return await getAllActiveApplicationsByPage(limit, page);
};

export const getSelectedApplicationsByPage = async (limit: number, page: number, keyword?: string): Promise<IApplicationModel[]> => {

    if (keyword) {
        return await getApplicationsByPage(keyword, limit, page);
    }
    return await getAllApplicationsByPage(limit, page);
};

export const getActiveApplicationsByPage = async (keyword: string, limit: number, page: number): Promise<IApplicationModel[]> => {

    if (page < 0) {
        return [];
    }

    const regexp: RegExp = new RegExp(keyword, 'i');
    const applications: IApplicationModel[] = await ApplicationModel.find({
        name: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return applications;
};

export const getApplicationsByPage = async (keyword: string, limit: number, page: number): Promise<IApplicationModel[]> => {

    if (page < 0) {
        return [];
    }

    const regexp: RegExp = new RegExp(keyword, 'i');
    const applications: IApplicationModel[] = await ApplicationModel.find({
        name: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return applications;
};

export const getAllActiveApplicationsByPage = async (limit: number, page: number): Promise<IApplicationModel[]> => {

    if (page < 0) {
        return [];
    }

    const applications: IApplicationModel[] = await ApplicationModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return applications;
};

export const getAllApplicationsByPage = async (limit: number, page: number): Promise<IApplicationModel[]> => {

    if (page < 0) {
        return [];
    }

    const applications: IApplicationModel[] = await ApplicationModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 });
    return applications;
};

export const checkGreenApplicationMatch = async (applicationKey: string, green: string): Promise<boolean> => {

    const application: IApplicationModel | null = await getApplicationByKey(applicationKey);

    if (!application) {
        return false;
    }

    return application.green === green;
};

export const refreshGreen = async (applicationKey: string): Promise<IApplicationModel | null> => {

    const application: IApplicationModel | null = await getApplicationByKey(applicationKey);

    if (!application) {
        return null;
    }

    application.refreshGreen();
    await application.save();
    return application;
};
