import React, { useState } from "react";
import { Layout, Menu } from 'antd';
import {
    FileOutlined,
    UserOutlined,
    FileMarkdownOutlined,
    ShareAltOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link, history } from "umi";


type MenuItem = Required<MenuProps>['items'][number];


function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

function link(content: React.ReactNode, to: string) {
    return <Link to={to}>{content}</Link>
}

const items: MenuItem[] = [
    getItem('用户', 'admin', <UserOutlined />, [
        getItem(link('个人信息', "/"), '/'),
        getItem(link('修改信息', "/updateInfo"), '/updateInfo'),
        getItem(link('修改密码', "/updatePwd"), '/updatePwd'),
    ]),
    getItem('文章', 'article', <FileMarkdownOutlined />, [
        getItem(link('文章列表', '/articles'), '/articles'),
        getItem(link('添加文章', '/articlesAdd'), '/articlesAdd')
    ]),
    getItem('分享', 'share',<ShareAltOutlined />, [
        getItem(link('分享列表', '/shares'), '/shares'),
        getItem(link('添加分享', '/sharesAdd'), '/sharesAdd')
    ]),
    getItem('信', 'letter', link(<FileOutlined />,"/letters")),
];


const { Header, Content, Footer, Sider } = Layout;

interface IProps {
    comp: React.ReactNode,
}

export default function Wrapper({ comp }: IProps) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ height: '100vh', width: "100vw" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} style={{ height: '100vh', float: "left" }}>
                <Menu theme="dark" defaultSelectedKeys={[history.location.pathname]} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout" style={{ overflowY: "auto", width: "100%" }}>
                <Content style={{ margin: '20px' }}>
                    {comp}
                </Content>
            </Layout>
        </Layout>
    )
}

