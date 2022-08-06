import { BasicLayoutProps } from "@ant-design/pro-layout";
import '../assets/css/global.css'
import Layout from '../component/Layout'

export default function index(props: BasicLayoutProps) {
    return <Layout comp={props.children} />
}