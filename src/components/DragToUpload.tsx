import { Upload } from '@arco-design/web-react'


export function DragToUpload(props: {onFile: (file: File) => void}) {
    return (
        <Upload
            style={{ width: 500}}
            drag
            multiple
            accept='image/*'
            action='/'
            onDrop={(e) => {
                let uploadFile = e.dataTransfer.files[0]
                props.onFile(uploadFile)
            }}
            tip='Only pictures can be uploaded'
        />
    );
}