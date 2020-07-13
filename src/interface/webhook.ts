/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Webhook
 */

export enum WEBHOOK_EVENT {

    ACCOUNT_DEACTIVATE = "ACCOUNT_DEACTIVATE",
    ORGANIZATION_DEACTIVATE = "ORGANIZATION_DEACTIVATE",

    ACCOUNT_CREATE = "ACCOUNT_CREATE",
    ORGANIZATION_CREATE = "ORGANIZATION_CREATE",
}

export interface IWebhookConfig {

    readonly anchor: string;
    readonly name: string;

    description?: string;

    url: string;
}

export interface IWebhook extends IWebhookConfig {

    hooks: WEBHOOK_EVENT[];

    active: boolean;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
