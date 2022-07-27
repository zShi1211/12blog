import 'reflect-metadata'
import { IsDate, IsNotEmpty, IsNumber, IsUrl } from 'class-validator'
// 将type类型带入到编译结果中
import { Type } from 'class-transformer'
import { CommentType, SubCommentType } from '../model/types';
import BaseEntity from './baseEntity';

export default class SubCommentEntity  extends BaseEntity implements SubCommentType {
    @IsNotEmpty()
    @Type(() => String)
    replyId: string;


    @Type(() => Boolean)
    isReplySubComment: boolean;

    @Type(() => String)
    replySubId?: string | null | undefined;


    @IsNotEmpty()
    @Type(() => String)
    content: string;

    @IsNotEmpty()
    @Type(() => String)
    time: string;

    @IsNotEmpty()
    @IsUrl()
    @Type(() => String)
    avatar: string;

    @IsNotEmpty()
    @Type(() => String)
    nickname: string;

    static transform(obj: any) {
        return super.plainToClass(this, obj);
    }


}