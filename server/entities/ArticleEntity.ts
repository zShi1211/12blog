import 'reflect-metadata'
import { IsDate, IsNotEmpty, IsNumber, IsUrl } from 'class-validator'
// 将type类型带入到编译结果中
import { Type } from 'class-transformer'
import { ArticleType } from '../model/types';
import BaseEntity from './baseEntity';

export default class ArticleEntity extends BaseEntity  implements ArticleType {

    @IsNotEmpty()
    @Type(() => String)
    title: string;


    @IsNotEmpty()
    @Type(() => String)
    content: string;


    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    time: string;


    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    like: number;


    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    declare words: string;


    @IsNotEmpty()
    @Type(() => String)
    declare description: string;

    @Type(() => Boolean)
    declare ispublish: boolean;

    static transform(obj: any) {
        return super.plainToClass(this, obj);
    }
}