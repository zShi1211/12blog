import { IPagingCondition } from '@/api/comment';
import { getAllLetter, rmLetter } from '@/api/letter';
import { Space, Table, Tag, Avatar, Popconfirm, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { IConfirm } from '../shares';

interface LetterType {
    id: number;
    avatar: string;
    nickname: string;
    content: string;
    isPrivate: boolean;
    time: number;
}

interface ITotalLetter {
    count: number;
    rows: LetterType[]
}



export default function Letters() {
    const [letterData, setLetterData] = useState<ITotalLetter>({ count: 0, rows: [] });
    const [paging, setPaging] = useState<IPagingCondition>({
        offest: 1,
        limit: 5,
    });

    // 搜索条件变化重新请求数据
    useEffect(() => {
        (async () => {
            const res = await getAllLetter(paging);
            console.log(res)
            setLetterData(res.data);
        })()
    }, [paging])

    // 优化，返回同一个函数
    const confirm = useMemo<IConfirm>(() => {
        return async (id) => {
            const res: any = await rmLetter(id.toString());
            if (res.err) {
                message.error("删除失败")
            } else {
                message.success("删除成功");
                setPaging({
                    ...paging
                })
            }
        }
    }, [])

    const columns: ColumnsType<LetterType> = [
        {
            title: '头像',
            dataIndex: 'avatar',
            render: url => <Avatar shape="square" size={64} src={url} />,
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
            width: 120
        },
        {
            title: '内容',
            dataIndex: 'content',
        },
        {
            title: "时间",
            dataIndex: "time",
            render: t => moment(t).format('YYYY年MM月DD日'),
            width: 150
        },
        {
            title: "仅博主可见",
            dataIndex: "isPrivate",
            render: t => {
                return t ? <Tag color="#108ee9">yes</Tag>
                    :
                    <Tag color="#f50">no</Tag>
            },
            width: 150
        },
        {
            title: '操作',
            key: 'action',
            render: (_, { id }) => (
                <Popconfirm
                    title="Are you sure to delete this letter?"
                    onConfirm={() => { confirm(id) }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type='primary' danger>删除</Button>
                </Popconfirm>
            ),
        },
    ];
    console.log(letterData.rows)
    return (
        <>
            <Table columns={columns} dataSource={letterData.rows} pagination={{
                total: letterData.count,
                current: paging.offest,
                pageSize: paging.limit,
                onChange(offest) {
                    setPaging({
                        ...paging,
                        offest
                    })
                }
            }} />;
        </>
    )
}