import { Main } from '@/main'
import { SettingsIcon } from '@/settings/settings-icon'
import { SettingsPage } from '@/settings/settings-page'
import { Switch, Route, Redirect } from '@modern-js/runtime/router'
import { Router } from 'react-router-dom';

import history from '@/history';

import './App.css'
import '@arco-design/web-react/dist/css/arco.css'
import {LoginProvider} from "@/provider/LoginProvider";

function MainPage() {
    return <div className="container-box">
        <header style={{ width: '100%' }}>
            <SettingsIcon/>
        </header>
        <main>
            <Main />
        </main>
    </div>
}

function RootRoute() {
    return <div>
        <Switch>
            <Route path='/main' component={MainPage} />
            <Route path="/settings" component={SettingsPage} />
        </Switch>
    </div>
}

const App = () => (
        <Router history={history}>
            <LoginProvider>
                <Route path="/" component={RootRoute} />
                <Redirect push={true} to={`/main`} />
            </LoginProvider>
        </Router>
)

export default App
