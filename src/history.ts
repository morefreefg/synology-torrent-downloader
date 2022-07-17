
/**
 * history.push(path, [state])
 * history.replace(path, [state])
 * history.go(n)
 * history.goBack()
 * history.goForward()
 *
 * history.listen(func) // listen for changes to the current location
 *
 */
import { createBrowserHistory, createHashHistory } from 'history';


// @ts-ignore
const HISTORY =
    (process.env.NODE_ENV === 'production')
        ? createHashHistory()
        : createBrowserHistory({
            basename: '/',
        });

export default HISTORY;
