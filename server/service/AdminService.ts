import AdminEntity from "../entities/AdminEntity";
import Admin from "../model/Admin";
import md5 from 'md5';
import { IAddAdmin, IAdminInfo, IUpdatePwd } from "./types";
import parserValidate from "./utils/parserValidateErr";
import { authorization } from '../secret'

export default class AdminService {
    static async add(admin: IAddAdmin) {
        const r = await Admin.findOne({
            where: {
                loginid: admin.loginid
            }
        })
        if (r) throw Error("用户已存在")
        if (admin.loginpwd !== admin.confirmpwd)
            throw Error("两次密码不一致");
        if (admin.authorization !== authorization) throw Error("暗号错误");

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

    static async updatePwd(id: string, pwdObj: IUpdatePwd) {
        const r = await Admin.findOne({
            where: {
                id,
                loginpwd: md5(pwdObj.loginpwd)
            }
        })
        if (!r) {
            throw Error("密码错误");
        }
        if (pwdObj.newpwd !== pwdObj.confirmpwd)
            throw Error("两次密码不一致");


        // 将新密码复制非旧密码进行验证
        pwdObj.loginpwd = pwdObj.newpwd;

        const a = AdminEntity.transform(pwdObj);
        const res = await a.validate(true);
        if (res) throw parserValidate(res);
        const instance = await Admin.findByPk(id);
        if (pwdObj.newpwd) {
            a.loginpwd = md5(pwdObj.newpwd);
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

