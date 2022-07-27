import { AdminType } from "../model/types";

export interface ISeartchCondition {
    page?: number;
    limit?: number;
    sort?: "DESC" | "ASC";
    key?: string;
}

export interface IPagingCondition {
    offest?: number;
    limit?: number;
}

export interface IAdminInfo {
    loginid: string,
    loginpwd: string;
}

export interface IAddAdmin extends AdminType {
    confirmPwd: string;
}