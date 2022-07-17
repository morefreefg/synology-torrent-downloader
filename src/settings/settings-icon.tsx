import HISTORY from '@/history'
import { Button } from '@arco-design/web-react'
import { IconSettings } from '@arco-design/web-react/icon'
import styles from './index.less'

export function SettingsIcon() {

    return <div className={styles.container}
                style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
        <Button style={{
            width: 45,
            height: 45,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }} onClick={() => {
            // window.location.href = '/settings';
            HISTORY.push('/settings')
        }}
        >
            <IconSettings style={{ width: 50, height: 50 }} />
        </Button>
    </div>
}