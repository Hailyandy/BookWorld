import React, { useState } from 'react';
import { Avatar, List, Radio, Space, Col, Divider, Row, Image } from 'antd';
import { Typography } from 'antd';
import './autofill-item.css'
const { Title, Text, Paragraph } = Typography;
/**
 *
 * @param {*} props: bookCover bookName bookAuthor
 * @returns
 */
const TheAutofillItem = (props) => {
    return (
        <div className="autofill-containner">
            <Row gutter={16}>
                <Col flex="1 ">
                    <Image
                        style={{ objectFit: 'fill ', height: 'var(--height-autofill-item)' }}
                        src={`${props.bookCover}`}
                    /></Col>
                <Col flex="4">
                    <Space direction='vertical'>
                        <Text style={{ width: '100px' }} ellipsis={true} strong>{props.bookName}</Text>
                        <Text>by {props.bookAuthor}</Text>
                    </Space>
                </Col>
            </Row>
        </div>
    )
}

export default TheAutofillItem
