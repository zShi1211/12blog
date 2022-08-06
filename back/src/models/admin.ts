import { login, updateInfo, updatePwd, whoAmI } from "@/api/admin"

export default {
    namespace: "admin",
    state: {
        isLogin: false,
        adminInfo: {}
    },
    reducers: {
        setLoginState(state, { payload }) {
            return {
                ...state,
                isLogin: payload
            }
        },
        setAdminInfo(state, { payload }) {
            return {
                ...state,
                adminInfo: payload
            }
        }
    },
    effects: {
        * fetchLogin({ payload }, { put }) {
            const res = yield login(payload);
            if (res.err) return false;
            yield put({ type: "setLoginState", payload: true });
            yield put({ type: "setAdminInfo", payload: res.data });
            return true;

        },
        *fetchWhoAmi(action, { put }) {
            const res = yield whoAmI();
            if (res.err) return false;
            yield put({ type: "setLoginState", payload: true });
            yield put({ type: "setAdminInfo", payload: res.data });
            return true;
        },
        *fetchUpdateInfo({ payload }, { put }) {
            console.log(payload)
            const res = yield updateInfo(payload);
            if (res.err) return false;
            yield put({ type: "fetchWhoAmi" })
            return true;
        }
    },
    subscriptions: {
        initUserInfo: async ({ dispatch, history }) => {
            if (history.location.pathname !== '/login') {
                const res = await dispatch({ type: 'fetchWhoAmi' })
                if (!res) {
                    history.push('/login')
                }
            }
        }
    }
}