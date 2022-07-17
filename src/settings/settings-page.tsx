import HISTORY from '@/history'
import { Button } from '@arco-design/web-react'
import { IconBackward, IconSettings } from '@arco-design/web-react/icon'

export function SettingsPage() {

    return <div style={{ width: '100%', height: "100%"}}>
        <header style={{ width: '100%' }}>
            <Button style={{
                width: 45,
                height: 45,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }} onClick={() => {
                HISTORY.push('/main')
                // window.location.href = '/';
            }}
            >
                <IconBackward style={{ width: 50, height: 50 }} />
            </Button>
        </header>
    </div>
}