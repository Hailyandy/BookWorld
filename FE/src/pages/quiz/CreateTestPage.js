import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography, Checkbox, Select, InputNumber } from 'antd';
import { convertDataIntoCreateTestOption } from '~/helper/format';
import { createQuestionAsync } from '~/slices/user';
import { useDispatch } from 'react-redux';
const { Text, Link } = Typography;
const CreateTestPage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const onFinishCreateTest = (val) => {
        console.log(val)
        let convertData = convertDataIntoCreateTestOption(val.items)
        console.log(convertData)
        dispatch(createQuestionAsync({ idBook: 1, questionDtos: convertData }))
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
                items: [{}],
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
                        {fields.map((field) => (
                            <Card
                                size="small"
                                title={<h2>Câu hỏi {field.name + 1}</h2>}
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
                        ))}

                        <Button type="dashed" onClick={() => add()} block>
                            + Tạo câu hỏi
                        </Button>
                    </div>
                )}
            </Form.List>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <Button htmlType="submit" type='primary' >Tạo bài kiểm tra</Button>
            </div>
        </Form>
    );
};
export default CreateTestPage;
