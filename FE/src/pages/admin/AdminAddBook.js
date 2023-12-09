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
import './css/addbook.css'
import { UploadOutlined } from '@ant-design/icons';
import { useLoaderData } from 'react-router-dom';
import getBase64 from "~/helper/getBase64";
import { uploadFileFirebase } from "~/helper/firebaseUploadFile";
import { addNewBookAsync, addPdfForABookAsync } from '~/slices/user';
import { useDispatch } from 'react-redux';
const dateFormatOnFe = 'DD/MM/YYYY';
const dateFormatReturnBe = 'YYYY-MM-DD HH:mm:ss';
const AdminAddBookPage = () => {
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
        console.log(values.publishDate.format(dateFormatReturnBe))
        let {
            name,
            numberPages,
            publisher,
            publishDate,
            introducing,
            urlPoster,
            authorId,
            genreIds,
        } = values
        dispatch(addNewBookAsync({
            name,
            numberPages,
            publisher,
            publishDate: publishDate.format(dateFormatReturnBe),
            introducing,
            urlPoster: imageUrl,
            authorId,
            genreIds

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
    return <div className='addpost-container'>
        <h1>Thêm sách</h1>
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
            <Form.Item label="Tên sách" name="name"
                rules={[
                    {
                        required: true,
                        message: 'Nhập tên quyển sách muốn thêm!',
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item label="Số trang" name="numberPages"
                rules={[
                    {
                        required: true,
                        message: 'Nhập tổng số trang sách!',
                    },
                ]}>
                <InputNumber />
            </Form.Item>

            <Form.Item label="Nhà xuất bản" name="publisher"
                rules={[
                    {
                        required: true,
                        message: 'Nhập nhà xuất bản!',
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item label="Ngày xuất bản" name="publishDate"
                rules={[
                    {
                        required: true,
                        message: 'Nhập ngày xuất bản!',
                    },
                ]}>
                <DatePicker format={dateFormatOnFe} />
            </Form.Item>

            <Form.Item label="Giới thiệu sách" name="introducing"
                rules={[
                    {
                        required: true,
                        message: 'Nhập giới thiệu sách!',
                    },
                ]}>
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                name="urlPoster"
                label="Ảnh bìa"
                rules={[
                    {
                        required: true,
                        message: 'Chọn ảnh bìa nhé!',
                    },
                ]}
            >
                <Upload name="logo" listType="picture" customRequest={customUpload} onChange={handleChange}>
                    <Button icon={<UploadOutlined />}>Thêm ảnh bìa sách</Button>
                </Upload>
            </Form.Item>
            <Form.Item label="Chọn thể loại sách" name="genreIds">
                <Select mode="multiple"
                    allowClear placeholder="Chọn nhiều thể loại"
                    defaultValue={['a10', 'c12']}
                    onChange={handleChangeMultipleOption}
                    options={optionsGenres}
                    rules={[
                        {
                            required: true,
                            message: 'Chọn thể loại sách phù hợp!',
                        },
                    ]}
                >
                    {/* <Select.Option value="demo">Demo</Select.Option>
                    {
                        genres.map((genre) => {
                            return <Select.Option value={genre.id}>{genre.name}</Select.Option>
                        })
                    } */}
                </Select>
            </Form.Item>

            <Form.Item label="Chọn tác giả" name="authorId">
                <Select
                    allowClear placeholder="Please select"
                    onChange={handleChangeMultipleOption}
                    options={optionsAuthors}
                    rules={[
                        {
                            required: true,
                            message: 'Chọn tác giả!',
                        },
                    ]}
                >
                    {/* <Select.Option value="demo">Demo</Select.Option>
                    {
                        genres.map((genre) => {
                            return <Select.Option value={genre.id}>{genre.name}</Select.Option>
                        })
                    } */}
                </Select>
            </Form.Item>
            <Form.Item className='last-form-item'>
                <Button htmlType="submit">Thêm mới sách</Button>
            </Form.Item>
        </Form>
    </div>
}
export default AdminAddBookPage
