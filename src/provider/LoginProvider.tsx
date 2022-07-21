import React, { useContext, useEffect, useState } from 'react';
import {getSynologyConnectionParams} from "@/storage/storage";
import HISTORY from "@/history";
import {IconLoading} from "@arco-design/web-react/icon";
import bridge from "@modern-js/runtime/electron-bridge";


const LoginContext = React.createContext<{}>({});

export function useLogin() {
    return useContext(LoginContext);
}

export function LoginProvider(props: any) {
    const { children } = props;

    const connection = getSynologyConnectionParams()

    if (connection?.url?.length ?? 0 == 0) {
        HISTORY.push('/settings');
    }

    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        if (connection?.url?.length??0 > 0) {
            setLoading(true)
            bridge.testSynologyLogin(connection?.username ?? '', connection?.password ?? '', connection?.url ?? '')
                .then(() => {
                    setLoading(false)
                })
                .catch(e => {
                    setLoading(false)
                })
        }
    }, [])

    return loading ?<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '400px'}}>
        <IconLoading/>
    </div> : <LoginContext.Provider value={{}}>{children}</LoginContext.Provider>;
}
