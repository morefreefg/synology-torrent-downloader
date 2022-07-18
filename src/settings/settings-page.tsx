import HISTORY from '@/history'
import { IconBackward } from '@arco-design/web-react/icon'
import { Form, Input, Button } from '@arco-design/web-react'

const FormItem = Form.Item

export function SettingsPage() {

    return <div style={{ width: '100%', height: '100%' }}>
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

        <main>
            <Form style={{ width: 800 }}>
                <FormItem label="Host">
                    <Input placeholder="like: http://cloud.fengguang.me:5000" />
                </FormItem>

                <FormItem label="UserName">
                    <Input placeholder="please enter your Synology username..." />
                </FormItem>

                <FormItem label="Password">
                    <Input type={'password'} placeholder="please enter your Synology Password..." />
                </FormItem>

                <FormItem label={<div style={{ whiteSpace: 'nowrap' }}>Movies Download To</div>}>
                    <Input placeholder="like: /Movies/" />
                </FormItem>

                <FormItem label={<div style={{ whiteSpace: 'nowrap' }}>TVShows Download To</div>}>
                    <Input placeholder="like: /TVShows/" />
                </FormItem>

                {/*<FormItem wrapperCol={{ offset: 5 }}>*/}
                {/*    <Checkbox>I have read the manual</Checkbox>*/}
                {/*</FormItem>*/}
                <FormItem wrapperCol={{ offset: 5 }}>
                    <Button type="primary">Submit</Button>
                </FormItem>
            </Form>
        </main>
    </div>
}