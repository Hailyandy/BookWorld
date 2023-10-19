import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import TheAuthorBookItem from '~/components/author/TheAuthorBookItem';
import '~/components/Model/model.css'
import PropTypes from 'prop-types';
import BSHAREnum from '~/helper/BSHAREenum';
import { Rate, Divider, Input, Select, Space, Button, Radio } from 'antd';
const { TextArea } = Input;
let index = 0;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const ModelReviewPost = () => {
    const [value1, setValue1] = useState('Apple');
    const [items, setItems] = useState(['jack', 'lucy']);
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
            <p>Đánh giá của tôi:  <Rate defaultValue={3} /></p>
            <p>Giá sách/ tag:  {radioBox} {selectionBox}</p>
            <p>Bạn suy nghĩ gì?</p>
            <p><TextArea rows={4} /></p>
            <p>Ghi chú bí mật, chỉ hiển thị cho mình bạn</p>
            <p><TextArea rows={4} /></p>
        </div>
    )
}

export default ModelReviewPost
