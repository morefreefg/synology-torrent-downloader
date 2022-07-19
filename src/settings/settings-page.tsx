import HISTORY from '@/history'
import {IconBackward, IconLoading} from '@arco-design/web-react/icon'
import {Form, Input, Button, Message, Modal} from '@arco-design/web-react'
import {
    getFileSaveLocation,
    getSynologyConnectionParams,
    saveFileSaveLocation,
    saveSynologyConnectionParams
} from "@/storage/storage";
import React, {ReactNode, useEffect, useState} from "react";
import bridge from '@modern-js/runtime/electron-bridge';

const FormItem = Form.Item

export function SettingsPage() {
    const [initialValues, setInitialValues] = useState<any|undefined>(undefined)


    useEffect(() => {
        const filelocation = getFileSaveLocation()
        const connection = getSynologyConnectionParams()

        setInitialValues( {
            host: connection?.url,
            username: connection?.username,
            password: connection?.password,
            movie_location: filelocation?.movies ?? '',
            tv_show_location: filelocation?.tvshows ?? '',
        })
    }, [])

    function onSubmit(values: any) {
        saveFileSaveLocation({
            movies: values.movie_location,
            tvshows: values.tv_show_location,
        })

        saveSynologyConnectionParams({
            url: values.host,
            username: values.username,
            password: values.password,
        })

        Message.success("Successfully saved")
    }

    const formRef = React.useRef<ReactNode>(null);

    function testLogin() {
        Modal.info({
            title: 'Verifying connection',
            footer: null,
            content: <div
                style={{ display: 'flex', width: 'auto',
                    alignItems: 'center', justifyContent: 'center' }}>
                <IconLoading />
            </div>,
        });

        // @ts-ignore
        const value = formRef.current.getFieldsValue()
        // @ts-ignore
        bridge.testSynologyLogin(value.username, value.password, value.host)
            .then(() => {
                Message.success("Connection successful!")
            })
            .catch((e) => {
                console.error(e)
                Message.error(`Failed: ${e.message ?? e.msg}`,)
            })
            .finally(() => {
                Modal.destroyAll()
            })
    }

    return <div style={{width: '100%', height: '100%'}}>
        <header style={{width: '100%'}}>
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
                <IconBackward style={{width: 50, height: 50}}/>
            </Button>
        </header>

        {initialValues && <main>
            <Form ref={(ref) => (formRef.current = ref)}
                  style={{width: 800}} initialValues={initialValues} onSubmit={onSubmit}>
                <FormItem field={"host"} label="Host">
                    <Input placeholder="eg: http://cloud.fengguang.me:5000"/>
                </FormItem>

                <FormItem field={"username"} label="UserName">
                    <Input placeholder="please enter your Synology username..."/>
                </FormItem>

                <FormItem field={"password"} label="Password">
                    <Input type={'password'} placeholder="please enter your Synology Password..."/>
                </FormItem>

                <FormItem field={"movie_location"} label={<div style={{whiteSpace: 'nowrap'}}>Movies Download To</div>}>
                    <Input placeholder="eg: /Movies/"/>
                </FormItem>

                <FormItem field={"tv_show_location"} label={<div style={{whiteSpace: 'nowrap'}}>TVShows Download To</div>}>
                    <Input placeholder="eg: /TVShows/"/>
                </FormItem>

                <FormItem wrapperCol={{offset: 5}}>
                    <Button htmlType='submit' type="primary">Save</Button>
                </FormItem>

                <Button type="dashed" onClick={testLogin}>Test Connection</Button>
            </Form>
        </main>}
    </div>
}