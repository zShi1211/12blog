import { History } from 'umi'

export interface IAdminInfo {
    nickname: string;
    avatar: string;
    loginid: string
}

export interface IProps { adminInfo: IAdminInfo; loginOut: () => {}; history: History }