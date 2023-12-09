import React, { useState } from 'react';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
    Upload
} from 'antd';
// import './css/addbook.css'
import { UploadOutlined } from '@ant-design/icons';
import { useLoaderData } from 'react-router-dom';
import getBase64 from "~/helper/getBase64";
import { uploadFileFirebase } from "~/helper/firebaseUploadFile";
import { addNewBookAsync, addPdfForABookAsync, updateUserInforAsync } from '~/slices/user';
import { useDispatch } from 'react-redux';
import tokenService from '~/services/token.service';
const { Option } = Select;
const dateFormatOnFe = 'DD/MM/YYYY';
const dateFormatReturnBe = 'YYYY-MM-DD HH:mm:ss';
const UserDeclareInformationPage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const { genres, authors } = useLoaderData()

    const optionsGenres = [];
    const optionsAuthors = [];
    for (let i = 0; i < genres.length; i++) {
        optionsGenres.push({
            label: genres[i].name,
            value: genres[i].id,
        });
    }
    for (let i = 0; i < authors.length; i++) {
        optionsAuthors.push({
            label: authors[i].name,
            value: authors[i].id,
        });
    }
    const customUpload = async ({ onError, onSuccess, file }) => {
        // firebase upload\
        // firebase upload\
        console.log('admin addbok')
        uploadFileFirebase(file).then((url) => {
            console.log(url)
            setImageUrl(url)
        })
        setTimeout(() => {
            onSuccess("ok");
        }, 0);

    };
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
                        // setImageUrl(base64)
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


    const handleChangeMultipleOption = (value) => {
        console.log(`selected ${value}`);
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(form.getFieldsValue())
        console.log(values.birthDate.format(dateFormatReturnBe))
        let {
            name,
            phone,
            nativePlace,
            birthDate,
        } = values
        dispatch(updateUserInforAsync({
            name,
            phone,
            nativePlace,
            birthDate: birthDate.format(dateFormatReturnBe),

            urlPoster: imageUrl,
            userId: tokenService.getUser().id

        })).unwrap()
            .then(async data => {
                // navigate('/login', { replace: true });
                console.log(data)
                return;
            })
            .catch(e => {
                console.log(e);
            });
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    return <div className='addpost-container'>
        <h1>Cập nhật thông tin người dùng</h1>
        <Form
            form={form}
            onFinish={onFinish}
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            style={{
                maxWidth: 600,
            }}

        >
            <Form.Item label="Tên thật" name="name"
                rules={[
                    {
                        required: true,
                        message: 'Nhập tên thật của mình!',
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item label="Số điện thoại" name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Nhập số điện thoại!',
                    },
                ]}>
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            <Form.Item label="Quê quán" name="nativePlace"
                rules={[
                    {
                        required: true,
                        message: 'Bạn sinh ra ở đâu?',
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item label="Ngày sinh" name="birthDate"
                rules={[
                    {
                        required: true,
                        message: 'Nhập ngày sinh!',
                    },
                ]}>
                <DatePicker format={dateFormatOnFe} />
            </Form.Item>



            <Form.Item
                name="urlPoster"
                label="Ảnh đại diện"
                rules={[
                    {
                        required: true,
                        message: 'Chọn ảnh đại diện nhé!',
                    },
                ]}
            >
                <Upload name="logo" listType="picture" customRequest={customUpload} onChange={handleChange}>
                    <Button icon={<UploadOutlined />}>Thêm ảnh đại diện</Button>
                </Upload>
            </Form.Item>
            <Form.Item className='last-form-item' >
                <Button htmlType="submit" type='primary'>Cập nhật thông tin</Button>
            </Form.Item>
        </Form>
    </div>
}
export default UserDeclareInformationPage
