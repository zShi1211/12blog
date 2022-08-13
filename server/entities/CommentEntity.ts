import 'reflect-metadata'
import { IsDate, IsNotEmpty, IsNumber, IsUrl, Length } from 'class-validator'
// 将type类型带入到编译结果中
import { Type } from 'class-transformer'
import {  CommentType } from '../model/types';
import BaseEntity from './baseEntity';

export default class CommentEntity extends BaseEntity  implements CommentType {
    @IsNotEmpty()
    @Type(() => String)
    content: string;

    @IsNotEmpty()
    @Type(() => Date)
    time: number;

    @IsNotEmpty()
    @Type(() => String)
    avatar: string;

    @IsNotEmpty()
    @Type(() => String)
    @Length(1, 6)
    nickname: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    articleId: number;

    static transform(obj: any) {
        return super.plainToClass(this, obj);
    }

}