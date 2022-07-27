import AdminEntity from "../entities/AdminEntity";
import Admin from "../model/Admin";
import md5 from 'md5';
import { IAddAdmin, IAdminInfo } from "./types";
import parserValidate from "./utils/parserValidateErr";

export default class AdminService {
    static async add(admin: IAddAdmin) {
        if (admin.loginpwd !== admin.confirmPwd)
            throw Error("两次密码不一致");
        const a = AdminEntity.transform(admin);
        const res = await a.validate();
        if (res) throw parserValidate(res);

        // md5加密
        a.loginpwd = md5(a.loginpwd);
        return (await Admin.create(a)).toJSON();
    }

    static async delete(id: string) {
        const instance = await Admin.findByPk(id);
        return await instance?.destroy();
        // id内置生成，类型中没有定义，这里使用id查询会报错
        /* return await Admin.destroy({
            where: {
                id
            }
        }) */
    }

    static async updatePwd(id: string, pwdOjb: IAddAdmin) {
        if (pwdOjb.loginpwd !== pwdOjb.confirmPwd)
            throw Error("两次密码不一致");
        const a = AdminEntity.transform(pwdOjb);
        const res = await a.validate(true);
        if (res) throw parserValidate(res);

        const instance = await Admin.findByPk(id);
        if (a.loginpwd) {
            a.loginpwd = md5(a.loginpwd);
        }
        return (await instance?.update(a))?.toJSON();
    }

    static async update(id: string, admin: any) {
        // 该接口只允许修改用户信息
        delete admin.loginpwd;
        const a = AdminEntity.transform(admin);
        const res = await a.validate(true);
        if (res) throw parserValidate(res);
        const instance = await Admin.findByPk(id);
        return (await instance?.update(a))?.toJSON();
    }

    static async login({ loginid, loginpwd }: IAdminInfo) {
        console.log(loginid, loginpwd)
        return (await Admin.findOne({
            where: {
                loginid,
                loginpwd: md5(loginpwd)
            },
            attributes: {
                exclude: ['loginpwd']
            }
        }))?.toJSON();
    }


    static async findOne(id: string) {
        const instance = await Admin.findByPk(id, {
            attributes: {
                exclude: ["loginpwd"]
            }
        });
        return instance?.toJSON();
    }

}

