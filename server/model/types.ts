export interface CommentType {
    nickname: string;
    content: string;
    time: string;
    avatar: string;
    articleId: number;
}

export interface AdminType {
    nickname: string;
    loginid: string;
    loginpwd: string;
    avatar: string;
}


export interface ArticleType {
    title: string;
    content: string;
    time: string;
    like: number;
    words: string;
    description: string;
    ispublish?: boolean;
}

export interface LetterType {
    nickname: string;
    content: string;
    time: string;
    avatar: string;
    isPrivate: boolean;
}

export interface ShareType {
    pictureUrl: string;
    description: string;
    time: string;
}


export interface SubCommentType {
    nickname: string;
    content: string;
    time: string;
    avatar: string;
    replyId: string;
    isReplySubComment: boolean;
    replySubId?: string | null;
}