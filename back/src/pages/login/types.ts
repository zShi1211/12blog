type TInfo = {
    loginid: string;
    loginpwd: string;
}
export interface IFetchLogin {
    (info: TInfo): boolean
}

export interface ILoginInfo {
    loginid: string;
    loginpwd: string;
}

export interface IRegisterInfo extends ILoginInfo {
    confirmpwd: string;
}