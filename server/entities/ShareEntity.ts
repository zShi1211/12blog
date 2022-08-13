import 'reflect-metadata'
import { IsDate, IsNotEmpty, IsNumber, IsUrl } from 'class-validator'
// 将type类型带入到编译结果中
import { Type } from 'class-transformer'
import { CommentType, ShareType } from '../model/types';
import BaseEntity from './baseEntity';

export default class ShareEntity extends BaseEntity implements ShareType {
    @IsNotEmpty()
    @Type(() => String)
    pictureUrl: string;


    @IsNotEmpty()
    @Type(() => String)
    description: string;

    @IsNotEmpty()
    @Type(() => Date)
    time: number;

    static transform(obj: any) {
        return super.plainToClass(this, obj);
    }

}

