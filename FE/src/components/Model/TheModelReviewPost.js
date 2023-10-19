//Bản vá tạm thời, ko custom dropdown được thì dùng thôi
import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import TheAuthorBookItem from '~/components/author/TheAuthorBookItem';
import '~/components/Model/model.css'
import PropTypes from 'prop-types';
import BSHAREnum from '~/helper/BSHAREenum';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Rate, Divider, Input, Select, Space, Button, Radio, Row, Col } from 'antd';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const { TextArea } = Input;
let index = 0;
const plainOptions = ['Muốn đọc', 'Đang đọc', 'Đã đọc'];
let commonStyle = {
    width: '70%'
}
const ModelReviewPost = () => {
    const [value1, setValue1] = useState('Muốn đọc');
    const [items, setItems] = useState(['custom shelf 1', 'custom shelf 2']);
    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const onChange1 = ({ target: { value } }) => {
        console.log('radio1 checked', value);
        setValue1(value);
    };
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    let selectionBox = <Select
        style={{
            width: 300,
        }}
        placeholder="custom dropdown render"
        dropdownRender={(menu) => (
            <>
                {menu}
                <Divider
                    style={{
                        margin: '8px 0',
                    }}
                />
                <Space
                    style={{
                        padding: '0 8px 4px',
                    }}
                >
                    <Input
                        placeholder="Please enter item"
                        ref={inputRef}
                        value={name}
                        onChange={onNameChange}
                    />
                    <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                        Add item
                    </Button>
                </Space>
            </>
        )}
        options={items.map((item) => ({
            label: item,
            value: item,
        }))}
    />
    let radioBox = <Radio.Group options={plainOptions} onChange={onChange1} value={value1} />
    return (
        <div className="model-review-post-containner">
            <TheAuthorBookItem typeItem={BSHAREnum.modelReviewPostType.without_dropdown_button} />
            <p className="shelf-change-containner">Đánh giá của tôi:  <Rate defaultValue={3} /></p>
            <span ><p>Giá sách/ tag:     {radioBox}{selectionBox}
            </p></span>


            <p>Bạn suy nghĩ gì?</p>
            <TextArea style={commonStyle} rows={4} />
            <p>Ghi chú bí mật, chỉ hiển thị cho mình bạn</p>
            <TextArea style={commonStyle} rows={4} />
            <p>Ngày đọc:</p>
            <Row >
                <RangePicker
                    defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
                    format={dateFormat}
                />
            </Row>
        </div>
    )
}

export default ModelReviewPost
