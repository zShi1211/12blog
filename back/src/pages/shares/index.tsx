import { ISeartchCondition } from '@/api/article';
import { IPagingCondition } from '@/api/comment';
import { getAllShare, rmShare } from '@/api/share';
import { Space, Table, Tag, Image, Button, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'umi';

export interface ShareType {
    id: number;
    pictureUrl: string;
    description: string;
    time: number;
}

interface ITotalShare {
    count: number;
    rows: ShareType[]
}

export interface IConfirm {
    (id: number): void
}

export default function () {
    const [shareData, setShareData] = useState<ITotalShare>({ count: 0, rows: [] });
    const [paging, setPaging] = useState<IPagingCondition>({
        offest: 1,
        limit: 5,
    });

    // 搜索条件变化重新请求数据
    useEffect(() => {
        (async () => {
            const res = await getAllShare(paging)
            setShareData(res.data);
        })()
    }, [paging])

    // 优化，返回同一个函数
    const confirm = useMemo<IConfirm>(() => {
        return async (id) => {
            const res: any = await rmShare(id.toString());
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

    const columns: ColumnsType<ShareType> = [
        {
            title: '图片',
            dataIndex: 'pictureUrl',
            render(pictureUrl) {
                return <Image
                    width={200}
                    src={pictureUrl}
                />
            }
        },
        {
            title: '描述',
            dataIndex: 'description',
        },
        {
            width:150,
            title: '时间',
            dataIndex: 'time',
            render(_, { time }) {
                return moment(time).format('YYYY年MM月DD日');
            },
        },
        {
            width:200,
            title: '操作',
            key: 'action',
            render: (_, { id }) => (
                <>

                    <Popconfirm
                        title="Are you sure to delete this share?"
                        onConfirm={() => { confirm(id) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='primary' danger>删除</Button>
                    </Popconfirm>
                    <Link to={`/shares/${id}`}> <Button type='primary'> 编辑</Button></Link>
                </>
            ),
        },
    ];


    return (
        <>
            <Table columns={columns} dataSource={shareData.rows} pagination={{
                total: shareData.count,
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