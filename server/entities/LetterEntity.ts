import 'reflect-metadata'
import { IsNotEmpty, IsUrl, Length } from 'class-validator'
// 将type类型带入到编译结果中
import { Type } from 'class-transformer'
import { LetterType } from '../model/types';
import BaseEntity from './baseEntity';

export default class LetterEntity extends BaseEntity implements LetterType {
    @IsNotEmpty()
    @Type(() => String)
    @Length(1, 6)
    nickname: string;

    @IsNotEmpty()
    @Type(() => String)
    content: string;

    @IsNotEmpty()
    @Type(() => Date)
    time: number;

    @IsNotEmpty()
    @Type(() => String)
    avatar: string;

    @Type(() => Boolean)
    isPrivate: boolean;

    static transform(obj: any) {
        return super.plainToClass(this, obj);
    }
}