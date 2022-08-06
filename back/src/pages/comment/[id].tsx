import { getAllComment } from "@/api/comment";
import { useEffect, useState } from "react";
import { Empty, Comment, Avatar, Tooltip, Badge, Button, Popconfirm, Pagination } from 'antd';
import moment from 'moment'
import { addSubComment, rmSubComment } from "@/api/subComment";
import { addComment, rmComment } from '@/api/comment'

interface IComment {
    id: number;
    articleId: number;
    nickname: string;
    content: string;
    time: number;
    avatar: string;
    SubComments: ISubComment[]
}

interface ISubComment extends IComment {
    replyId: number;
    isReplySubComment: boolean;
    replySubId?: number | null;
}


interface ICommendData {
    count: [],
    rows: IComment[]
}

export interface IPagingCondition {
    offest?: number;
    limit?: number;
}


type F = (data) => Promise<any>;
function getActions(onReply: F, onDelete: F, replyName?: string) {
    return [
        <Badge count={replyName} />,
        <Button type="link" onClick={onReply}>
            Reply to
        </Button>,
        <Popconfirm
            title="Are you sure to delete this comment?"
            onConfirm={onDelete}
            okText="Yes"
            cancelText="No"
        >
            <Button type="link" danger>
                Delete
            </Button>
        </Popconfirm>
    ]
}

export default function CommentList({ match }) {
    const [commentData, setCommentData] = useState<ICommendData>();
    const [paging, setPaging] = useState<IPagingCondition>({ limit: 5, offest: 1 })


    useEffect(() => {
        (async () => {
            const res: any = await getAllComment(match.params.id, paging)
            if (!res.err) {
                setCommentData(res.data)
            }
        })()
    }, [paging])
    console.log(commentData)

    let commentList;

    if (commentData) {
        commentList = commentData.rows.map(({ id, nickname, avatar, content, time, SubComments: SubCommets }) => {



            const children = SubCommets.map(i => {
                const subNikeName = SubCommets.find(item => item.id === i.replySubId)?.nickname
                return (
                    <Comment
                        actions={getActions(async (data) => {
                            // 回复
                            return await addSubComment(data);
                        }, async () => {
                            // 删除
                            return await rmSubComment(i.id.toString())
                        }, subNikeName)}
                        author={<a>{i.nickname}</a>}
                        avatar={<Avatar src={i.avatar} />}
                        content={
                            <p>
                                {i.content}
                            </p>
                        }
                        datetime={
                            <Tooltip title={moment(i.time).format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{moment(i.time).fromNow()}</span>
                            </Tooltip>
                        }
                    >
                    </Comment>
                )
            })


            return (
                <Comment
                    actions={getActions(async (data) => {
                        // 回复
                        return await addComment(data);
                    }, async () => {
                        // 删除
                        return await rmComment(id.toString())
                    })}
                    author={<a>{nickname}</a>}
                    avatar={<Avatar src={avatar} />}
                    content={
                        <p>
                            {content}
                        </p>
                    }
                    datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment(time).fromNow()}</span>
                        </Tooltip>
                    }
                >
                    {children}
                </Comment>
            )
        })

    }

    // console.log(CommentList)
    const a = [
        <div key={1}></div>,
        <div key={2}></div>,
        <div key={3}></div>,

    ]

    return (
        <div>
            {

                commentData ?
                    <>
                        {commentList}
                        < Pagination current={paging.offest} pageSize={paging.limit} total={commentData.count.length} onChange={(page) => {
                            setPaging({
                                ...paging,
                                offest: page
                            })
                        }} />
                    </>
                    : <Empty />
            }
        </div>
    )
}