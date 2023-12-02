import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { message, Button, Input, Space, Row, Col, Rate, Avatar, Tooltip, List, Upload } from 'antd'
import getBase64 from "~/helper/getBase64";
import './custom-upload.css'
import { uploadFileFirebase } from "~/helper/firebaseUploadFile";
import { useDispatch } from "react-redux";

function CustomUpload() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const [state, setState] = useState({
        selectedFile: null,
        selectedFileList: [],
    });
    const handleChange = info => {
        const nextState = {};

        switch (info.file.status) {
            case "uploading":
                console.log('upload complete')
                const file = // get file
                    getBase64(info.file.originFileObj).then(base64 => {
                        setImageUrl(base64)
                        setLoading(false)
                    });
                setLoading(true)
                nextState.selectedFileList = [info.file];
                break;
            case "done":
                nextState.selectedFile = info.file;
                nextState.selectedFileList = [info.file];
                break;
            default:
                // error or removed
                nextState.selectedFile = null;
                nextState.selectedFileList = [];
        }
        setState(nextState);
    }
    const beforeUpload = file => {
        // file validation
    };

    const customUpload = async ({ onError, onSuccess, file }) => {
        // firebase upload\
        console.log('customUpload')
        uploadFileFirebase(file).then((url) => {
            console.log(url)
        })
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const props = {
        name: "file",
        onChange(info) {
            const nextState = {};
            switch (info.file.status) {
                case "uploading":
                    nextState.selectedFileList = [info.file];
                    break;
                case "done":
                    nextState.selectedFile = info.file;
                    nextState.selectedFileList = [info.file];
                    break;

                default:
                    // error or removed
                    nextState.selectedFile = null;
                    nextState.selectedFileList = [];
            }

        },
        progress: {
            strokeColor: {
                "0%": "#108ee9",
                "100%": "#87d068",
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
    };
    return (
        <Upload
            name="avatar"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            fileList={state.selectedFileList}
            customRequest={customUpload}
            className="custom-upload"
        >
            <Button style={{
                backgroundColor: "var(--button-default-background-color)",

                width: '100%',
                borderRadius: '32px'
            }} icon={<UploadOutlined />}>Đăng file pdf</Button>
        </Upload>
    );
}
export default CustomUpload
