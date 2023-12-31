import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography, Checkbox, Select, InputNumber } from 'antd';
import { convertDataIntoCreateTestOption } from '~/helper/format';
import { createQuestionAsync } from '~/slices/user';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import PreviousQuiz from './PreviousQuiz';
const { Text, Link } = Typography;
const CreateTestPage = () => {
    const [form] = Form.useForm();
    const [number, setNumber] = useState(0)
    const param = useParams()
    const previousTestQuestion = useLoaderData()
    console.log(previousTestQuestion)
    const dispatch = useDispatch()
    const onFinishCreateTest = (val) => {
        console.log(val)
        let convertData = convertDataIntoCreateTestOption(val.items)
        console.log(convertData)
        dispatch(createQuestionAsync({ idBook: param.idBook, questionDtos: convertData }))
            .unwrap()
            .then(async data => {
                console.log(data)
            })
            .catch(e => {
                console.log(e);
            })
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onChange = (value) => {
        console.log('changed', value);
    };
    return (
        <div className='father-create-test-containner' >
            <h2>Quản lý bài kiểm tra</h2>
            <div className='create-test-containner'>

                <PreviousQuiz previousQuiz={previousTestQuestion} />
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    form={form}
                    name="dynamic_form_complex"
                    style={{
                        maxWidth: 600,
                        margin: 'auto',
                        paddingTop: '40px'
                    }}
                    autoComplete="off"
                    initialValues={{
                        items: [{ test: 'test' }],
                    }}
                    onFinish={onFinishCreateTest}

                >
                    <Form.List name="items">
                        {(fields, { add, remove }) => (
                            <div
                                style={{
                                    display: 'flex',
                                    rowGap: 16,
                                    flexDirection: 'column',
                                }}
                            >
                                {fields.map((field) => {
                                    if ((field.name + 1 + previousTestQuestion.length) >= 9) {
                                        setNumber(field.name + 1 + previousTestQuestion.length)
                                    }
                                    console.log()
                                    return (
                                        <>
                                            <Card
                                                size="small"
                                                title={<h2>Câu hỏi {field.name + 1 + previousTestQuestion.length}</h2>}
                                                key={field.key}
                                                extra={
                                                    <CloseOutlined
                                                        onClick={() => {
                                                            remove(field.name);
                                                        }}
                                                    />
                                                }
                                            >
                                                <Form.Item label={<Text strong>Nội dung câu hỏi</Text>} name={[field.name, 'questionsText']}>
                                                    <Input style={{
                                                        width: '120%',
                                                    }} />
                                                </Form.Item>
                                                <Form.Item
                                                    label={<span>A</span>}
                                                    name={[field.name, 'key_1']}>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label={<span>B</span>}
                                                    name={[field.name, 'key_2']}>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label={<span>C</span>}
                                                    name={[field.name, 'key_3']}>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label={<span>D</span>}
                                                    name={[field.name, 'key_4']}>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item name={[field.name, 'answer']} label={<Text type="success">Đáp án</Text>}>
                                                    <Select
                                                        defaultValue="A"
                                                        style={{
                                                            width: 60,
                                                        }}
                                                        onChange={handleChange}
                                                        options={[
                                                            {
                                                                value: 'key_1',
                                                                label: 'A',
                                                            },
                                                            {
                                                                value: 'key_2',
                                                                label: 'B',
                                                            },
                                                            {
                                                                value: 'key_3',
                                                                label: 'C',
                                                            },
                                                            {
                                                                value: 'key_4',
                                                                label: 'D',
                                                            },
                                                        ]}
                                                    />
                                                </Form.Item>

                                                <Form.Item name={[field.name, 'scoring']} label={<Text type="danger">Điểm số</Text>}>
                                                    <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
                                                </Form.Item>
                                            </Card>
                                        </>
                                    )
                                }


                                )}

                                {previousTestQuestion.length < 10 && number <= 9 && (<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>

                                    <Button type="dashed" onClick={() => add()} block>
                                        + Tạo câu hỏi
                                    </Button>
                                </div>)}
                            </div>
                        )}
                    </Form.List>
                    {previousTestQuestion.length < 10 && (<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <Button htmlType="submit" type='primary' >Tạo bài kiểm tra</Button>
                    </div>)}

                </Form>
            </div>
        </div>


    );
};
export default CreateTestPage;
