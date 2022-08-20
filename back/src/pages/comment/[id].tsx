import { getAllComment, IPagingCondition } from "@/api/comment";
import { useEffect, useState } from "react";
import { Empty, Comment, Avatar, Tooltip, Badge, Button, Popconfirm, Pagination, message, Modal, Input, Form } from 'antd';
import moment from 'moment'
import { addSubComment, rmSubComment } from "@/api/subComment";
import { addComment, rmComment } from '@/api/comment'
import { connect } from "umi";

moment.locale("zh-cn");

interface IComment {
    id?: number;
    nickname: string;
    content: string;
    time: number;
    avatar: string;
    SubComments?: ISubComment[]
}

interface ISubComment extends IComment {
    replyId: number;
    isReplySubComment: boolean;
    replySubId?: number | null;
}


interface ICommendData {
    count: number,
    countAll: number,
    rows: IComment[]
}


type F = (data) => Promise<any>;
function getActions(onDelete: F, replyName?: string) {
    return [
        <Badge count={replyName ? `Reply to ${replyName}` : ""} />,

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

interface EditorProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
}

const { TextArea } = Input;

const Editor = ({ onChange, value }: EditorProps) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
    </>
);

function CommentList({ match, admin: { adminInfo } }) {
    // 评论数据
    const [commentData, setCommentData] = useState<ICommendData>();
    // 分页条件
    const [paging, setPaging] = useState<IPagingCondition>({ limit: 5, offest: 1 })

    // 模态框是否显示
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [replyData, setReplyData] = useState<Partial<ISubComment>>({
        nickname: adminInfo.nickname,
        avatar: adminInfo.avatar,
    });
    const [replyContent, setReplyContent] = useState("");




    // 分页条件改变时重新获取数据
    useEffect(() => {
        (async () => {
            const res: any = await getAllComment(match.params.id, paging)
            if (!res.err) {
                setCommentData(res.data)
            }
        })()
    }, [paging])

    // 评论列表
    let commentList;
    if (commentData) {
        commentList = commentData.rows.map(({ id, nickname, avatar, content, time, SubComments: SubCommets }) => {


            //二级评论
            const children = SubCommets?.map(i => {
                const subNikeName = SubCommets.find(item => item.id === i.replySubId)?.nickname
                return (
                    <Comment
                        key={i.id}
                        actions={[getActions(async () => {
                            // 删除
                            const res: any = await rmSubComment(i.id!.toString())
                            if (res.err) {
                                message.error("删除失败")
                            } else {
                                message.success("删除成功");
                                setCommentData({
                                    ...commentData,
                                    rows: commentData.rows.map(item => {
                                        item.SubComments = item.SubComments?.filter(s => s.id != i.id)
                                        return item
                                    })
                                })
                            }
                        }, subNikeName), < Button type="link" onClick={() => {
                            // 显示模态框
                            setVisible(true)

                            // 回复二级评论
                            setReplyData({
                                ...replyData,
                                isReplySubComment: true,
                                replyId: id,
                                replySubId: i.id
                            })

                        }} >
                            Reply to
                        </ Button>]}
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

            // 一级评论
            return (
                <Comment
                    key={id}
                    actions={[getActions(async () => {
                        // 删除
                        const res: any = await rmComment(id!.toString())
                        if (res.err) {
                            message.error("删除失败")
                        } else {
                            message.success("删除成功");
                            setPaging({
                                ...paging
                            })
                        }
                    }), < Button type="link" onClick={() => {

                        // 显示模态框
                        setVisible(true)

                        // 回复一级评论
                        setReplyData({
                            ...replyData,
                            isReplySubComment: false,
                            replyId: id,
                        })
                    }} >
                        Reply to
                    </ Button>]}
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

    const handleOk = async () => {
        setConfirmLoading(true)
        const res: any = await addSubComment({
            ...replyData,
            content: replyContent,
            time: new Date().valueOf()
        })
        setConfirmLoading(false)
        if (res.err) {
            message.error("回复失败")
        } else {
            message.success("回复成功");
            setVisible(false);

            // 重新获取数据
            setPaging({
                ...paging
            })
            // 情况输入框中信息
            setReplyContent("");
        }
    };

    const handleCancel = () => {
        setVisible(false);
    };






    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReplyContent(e.target.value)
    };

    return (
        <div>

            <Modal
                title="回复评论"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Comment
                    avatar={<Avatar src={adminInfo.avatar} alt={adminInfo.nickname} />}
                    content={
                        <Editor
                            onChange={handleChange}
                            value={replyContent}
                        />
                    }
                />
            </Modal>
            {

                commentData ?
                    <>
                        {commentList}
                        < Pagination current={paging.offest} pageSize={paging.limit} total={commentData.count} onChange={(page) => {
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

const mapState2Props = store => ({
    admin: store.admin
})

export default connect(mapState2Props)(CommentList);
