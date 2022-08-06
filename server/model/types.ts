export interface CommentType {
    nickname: string;
    content: string;
    time: number;
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
    time: number;
    like: number;
    words: string;
    description: string;
    ispublish?: boolean;
    mdString: string;
}

export interface LetterType {
    nickname: string;
    content: string;
    time: number;
    avatar: string;
    isPrivate: boolean;
}

export interface ShareType {
    pictureUrl: string;
    description: string;
    time: number;
}


export interface SubCommentType {
    nickname: string;
    content: string;
    time: number;
    avatar: string;
    replyId: number;
    isReplySubComment: boolean;
    replySubId?: number | null;
}