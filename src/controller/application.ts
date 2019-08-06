/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Application
 */

import { Brontosaurus, BrontosaurusKey } from "@brontosaurus/core";
import { trustable } from "@sudoo/bark/random";
import { fitAnchor } from "../data/common";
import { ApplicationOthersConfig, IApplication, IApplicationConfig } from "../interface/application";
import { ApplicationModel, IApplicationModel } from "../model/application";

export const createUnsavedApplication = (name: string, key: string, expire: number, others: ApplicationOthersConfig): IApplicationModel => {

    const tempGreen: string = trustable();
    const anchor: string = fitAnchor(key);
    const secret: BrontosaurusKey = Brontosaurus.generateBrontosaurusKey();

    const config: IApplicationConfig = {

        anchor,
        key,

        avatar: others.avatar,
        helpLink: others.helpLink,
        privacyPolicy: others.privacyPolicy,
        backgroundImage: others.backgroundImage,
        green: tempGreen,
        name,
        expire,
        publicKey: secret.public,
        privateKey: secret.private,
        groups: [],
    };
    return new ApplicationModel(config);
};

export const getAllApplications = async (): Promise<IApplicationModel[]> => ApplicationModel.find({});
export const getAllApplicationsLean = async (): Promise<IApplication[]> => ApplicationModel.find({}).lean();

export const getApplicationByKey = async (key: string): Promise<IApplicationModel | null> => {

    const anchor: string = fitAnchor(key);
    return await ApplicationModel.findOne({
        anchor,
    });
};

export const getApplicationByKeyLean = async (key: string): Promise<IApplication | null> => {

    const anchor: string = fitAnchor(key);
    return await ApplicationModel.findOne({
        anchor,
    }).lean();
};

export const isApplicationDuplicatedByKey = async (key: string): Promise<boolean> => {

    const application: IApplicationModel | null = await getApplicationByKey(key);
    return Boolean(application);
};

export const getTotalApplicationPages = async (limit: number): Promise<number> => {

    return (await ApplicationModel.estimatedDocumentCount({})) / limit;
};

export const getSelectedActiveApplicationPages = async (limit: number, keyword?: string): Promise<number> => {

    if (keyword) {
        return await getActiveApplicationPagesByKeyword(limit, keyword);
    }
    return await getTotalActiveApplicationPages(limit);
};

export const getTotalActiveApplicationPages = async (limit: number): Promise<number> => {

    return (await ApplicationModel.countDocuments({
        active: true,
    })) / limit;
};

export const getActiveApplicationPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(keyword, 'i');
    const anchorRegExp: RegExp = new RegExp(anchor);
    return (await ApplicationModel.countDocuments({
        $or: [{
            name: {
                $regex: regexp,
            },
        },
        {
            anchor: {
                $regex: anchorRegExp,
            },
        }],
        active: true,
    })) / limit;
};

export const getApplicationPagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(keyword, 'i');
    const anchorRegExp: RegExp = new RegExp(anchor);
    return (await ApplicationModel.countDocuments({
        $or: [{
            name: {
                $regex: regexp,
            },
        },
        {
            anchor: {
                $regex: anchorRegExp,
            },
        }],
    })) / limit;
};

export const getSelectedActiveApplicationsByPage = async (limit: number, page: number, keyword?: string): Promise<IApplicationModel[]> => {

    if (keyword) {
        return await getActiveApplicationsByPage(keyword, limit, page);
    }
    return await getAllActiveApplicationsByPage(limit, page);
};

export const getSelectedActiveApplicationsByPageLean = async (limit: number, page: number, keyword?: string): Promise<IApplication[]> => {

    if (keyword) {
        return await getActiveApplicationsByPageLean(keyword, limit, page);
    }
    return await getAllActiveApplicationsByPageLean(limit, page);
};

export const getSelectedApplicationsByPage = async (limit: number, page: number, keyword?: string): Promise<IApplicationModel[]> => {

    if (keyword) {
        return await getApplicationsByPage(keyword, limit, page);
    }
    return await getAllApplicationsByPage(limit, page);
};

export const getSelectedApplicationsByPageLean = async (limit: number, page: number, keyword?: string): Promise<IApplication[]> => {

    if (keyword) {
        return await getApplicationsByPageLean(keyword, limit, page);
    }
    return await getAllApplicationsByPageLean(limit, page);
};

export const getActiveApplicationsByPage = async (keyword: string, limit: number, page: number): Promise<IApplicationModel[]> => {

    if (page < 0) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(keyword, 'i');
    const anchorRegExp: RegExp = new RegExp(anchor);
    const applications: IApplicationModel[] = await ApplicationModel.find({
        $or: [{
            name: {
                $regex: regexp,
            },
        },
        {
            anchor: {
                $regex: anchorRegExp,
            },
        }],
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return applications;
};

export const getActiveApplicationsByPageLean = async (keyword: string, limit: number, page: number): Promise<IApplication[]> => {

    if (page < 0) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(keyword, 'i');
    const anchorRegExp: RegExp = new RegExp(anchor);
    const applications: IApplication[] = await ApplicationModel.find({
        $or: [{
            name: {
                $regex: regexp,
            },
        },
        {
            anchor: {
                $regex: anchorRegExp,
            },
        }],
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return applications;
};

export const getApplicationsByPage = async (keyword: string, limit: number, page: number): Promise<IApplicationModel[]> => {

    if (page < 0) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(keyword, 'i');
    const anchorRegExp: RegExp = new RegExp(anchor);
    const applications: IApplicationModel[] = await ApplicationModel.find({
        $or: [{
            name: {
                $regex: regexp,
            },
        },
        {
            anchor: {
                $regex: anchorRegExp,
            },
        }],
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return applications;
};

export const getApplicationsByPageLean = async (keyword: string, limit: number, page: number): Promise<IApplication[]> => {

    if (page < 0) {
        return [];
    }

    const anchor: string = fitAnchor(keyword);
    const regexp: RegExp = new RegExp(keyword, 'i');
    const anchorRegExp: RegExp = new RegExp(anchor);
    const applications: IApplication[] = await ApplicationModel.find({
        $or: [{
            name: {
                $regex: regexp,
            },
        },
        {
            anchor: {
                $regex: anchorRegExp,
            },
        }],
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
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

export const getAllActiveApplicationsByPageLean = async (limit: number, page: number): Promise<IApplication[]> => {

    if (page < 0) {
        return [];
    }

    const applications: IApplication[] = await ApplicationModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
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

export const getAllApplicationsByPageLean = async (limit: number, page: number): Promise<IApplication[]> => {

    if (page < 0) {
        return [];
    }

    const applications: IApplication[] = await ApplicationModel.find({})
        .skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
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
