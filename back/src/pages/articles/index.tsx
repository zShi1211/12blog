import { getAllArticle, ISeartchCondition, rmArticle, updateArticle } from '@/api/article';
import { Space, Table, Tag, Button, Popconfirm, Input, message, Switch, Empty,Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect, Link, Location, history } from 'umi';
import {
    LikeOutlined,
    FontColorsOutlined
} from '@ant-design/icons';

interface IProps {
    location: Location
}


interface IAritcle {
    id: number;
    title: string;
    cover: string;
    like: number,
    words: number
    time: number;
    ispublish: boolean;
}

interface DataType {
    key: number
    id: number;
    title: string;
    cover: string;
    tag: {
        like: number,
        words: number
    };
    time: number;
    ispublish: boolean;
}

interface ITotalArticle {
    count: number;
    articles: IAritcle[]
}






const Aritcle: React.FC<IProps> = () => {
    const [articleData, setArticleData] = useState<ITotalArticle>({ count: 0, articles: [] });
    const [query, setQuery] = useState<ISeartchCondition>({
        offest: 1,
        limit: 5,
    });
    const [searchKey, setSearchKey] = useState<string>("");

    // 搜索条件变化重新请求数据
    useEffect(() => {
        (async () => {
            const res = await getAllArticle(query)
            const data: ITotalArticle = {
                count: res.data.count,
                articles: res.data.rows
            }
            setArticleData(data);
        })()
    }, [query])




    const data: DataType[] = articleData.articles.map(({ id, title, cover, time, like, words, ispublish }, index) => {
        return {
            key: index,
            id,
            title,
            cover,
            time,
            tag: {
                like, words
            },
            ispublish,
        }
    })

    const columns: ColumnsType<DataType> = [
        {
            title: '名称',
            dataIndex: 'title',
            key: "title",
            width: 250
        },
        {
            title: '描述',
            dataIndex: 'cover',
            key: "cover",
            width: 200,
            render: cover => {
                return (
                    <Image
                        width={200}
                        src={cover}
                    />
                )
            }
        },
        {
            title: '发布时间',
            dataIndex: 'time',
            key: "time",
            render(_, { time }) {
                return moment(time).format('YYYY年MM月DD日');
            },
            width: 150
        },
        {
            title: '标签',
            dataIndex: 'tag',
            key: "tag",
            render: (_, { tag }) => (
                <>
                    <Tag color={'geekblue'} key={tag.like}>
                        <LikeOutlined />
                        {tag.like}
                    </Tag>
                    <Tag color={'green'} key={tag.words}>
                        <FontColorsOutlined />
                        {tag.words}
                    </Tag>
                </>
            ),
        },
        {
            title: "查看评论",
            key: "comment",
            render(_, { id }) {
                return (
                    <Link to={`/comment/${id}`}><Button> 查看评论</Button></Link>
                )
            }
        },
        {
            title: "是否发布",
            key: "ispublish",
            render(_, { id, ispublish }) {
                return (
                    <Switch checked={ispublish} onChange={async () => {
                        const time = new Date().valueOf();
                        const res: any = await updateArticle(id.toString(), {
                            ispublish: !ispublish,
                            time
                        })
                        if (!res.err) {
                            setArticleData({
                                ...articleData,
                                articles: articleData.articles.map(item => {
                                    if (item.id === id) {
                                        return {
                                            ...item,
                                            ispublish: !item.ispublish,
                                            time
                                        }
                                    } else {
                                        return item
                                    }
                                })
                            })
                        }
                    }} />
                )
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (_, { id }) => {
                return (<><Space size="middle">
                    <Popconfirm
                        title="删除文章"
                        onConfirm={async () => {
                            const res: any = await rmArticle(id.toString());
                            if (!res.err) {
                                message.success("删除成功");

                                // 重新获得数据
                                setQuery({
                                    ...query
                                })
                            } else {
                                message.error("删除失败")
                            }
                        }}
                        okText="删除"
                        cancelText="取消"
                    >
                        <Button type="primary" danger>删除</Button>
                    </Popconfirm>
                    <Link to={`/articles/${id}`}> <Button type='primary'> 编辑</Button></Link>
                </Space></>)
            },
        },
    ];

    return (
        <>
            {
                articleData.count ?
                    <>
                        <Input.Group compact>
                            <Input style={{ width: "300px" }} value={searchKey} onChange={e => {
                                setSearchKey(e.target.value.trim())
                            }} />
                            <Button type="primary" onClick={() => {
                                setQuery({
                                    ...query,
                                    key: searchKey
                                })
                            }}>搜索</Button>
                        </Input.Group>

                        <Table columns={columns} dataSource={data} pagination={{
                            total: articleData.count,
                            current: query.offest,
                            pageSize: query.limit,
                            onChange(offest) {
                                setQuery({
                                    offest
                                })
                            }
                        }} />
                    </>
                    :
                    <Empty />
            }
        </>
    )
};


const mapState2Props = (store) => {
    return {
        location: store.router.location
    }
}

export default connect(mapState2Props)(Aritcle);

