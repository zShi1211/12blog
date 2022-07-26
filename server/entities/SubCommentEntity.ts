import 'reflect-metadata'
import { IsDate, IsNotEmpty, IsNumber, IsUrl, Length } from 'class-validator'
// 将type类型带入到编译结果中
import { Type } from 'class-transformer'
import { CommentType, SubCommentType } from '../model/types';
import BaseEntity from './baseEntity';

export default class SubCommentEntity  extends BaseEntity implements SubCommentType {
    @IsNotEmpty()
    @Type(() => Number)
    replyId: number;


    @Type(() => Boolean)
    isReplySubComment: boolean;

    @Type(() => Number)
    replySubId?: number | null | undefined;


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
    @Length(1, 16)
    nickname: string;

    static transform(obj: any) {
        return super.plainToClass(this, obj);
    }


}