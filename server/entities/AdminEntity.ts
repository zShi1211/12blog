import 'reflect-metadata'
import { IsNotEmpty, IsUrl, Max, MaxLength, Min, MIN, MinLength } from 'class-validator'
// 将type类型带入到编译结果中
import { Type } from 'class-transformer'
import { AdminType } from '../model/types';
import BaseEntity from './baseEntity';

export default class AdminEntity extends BaseEntity implements AdminType {

    @IsNotEmpty()
    @Type(() => String)
    nickname: string;


    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(16)
    @Type(() => String)
    loginid: string;

    
    @IsNotEmpty()
    @Type(() => String)
    @MinLength(6)
    @MaxLength(16)
    loginpwd: string;


    @IsNotEmpty()
    @IsUrl()
    @Type(() => String)
    avatar: string;

    static transform(obj: any) {
        return super.plainToClass(this, obj);
    }
}

