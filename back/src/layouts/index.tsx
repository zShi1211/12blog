import { connect, history } from "umi";
import '../assets/css/global.css'
import Layout from '../component/Layout'
import Login from '../pages/login'

function index({ location, admin, children }) {
    if (location.pathname.match("/login")) {
        return <Login />
    }

    return <Layout comp={children} />
}
const mapState2Props = (store) => ({
    admin: store.admin,
})
export default connect(mapState2Props)(index)
