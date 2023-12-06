
import React from 'react';
import { Card, Col, Row, Space, Button } from 'antd';
import './css/reportlist.css'
import { useLoaderData } from 'react-router-dom';
import { List, Avatar } from 'antd';
import VirtualList from 'rc-virtual-list';
import NotFoundPage from '../NotFound/NotFound';
const AdminReportList = () => {
    const listReport = useLoaderData()
    console.log(listReport)
    return (
        <div className="containner-list">
            <div className="list-containner">
                {listReport.length > 0 ? (
                    <List style={{ marginTop: '20px' }} >
                        <div >
                            <VirtualList
                                data={listReport}
                                height={300}
                                itemHeight={20}
                                itemKey='idddddd'
                            >
                                {(item, index) => (
                                    <List.Item key={item.id} actions={[<Button key="list-loadmore-edit" style={{ backgroundColor: 'var(--warning-color)' }}>Xóa file</Button>,
                                    <Button key="list-loadmore-edit" style={{ backgroundColor: 'var(--button-default-background-color)' }}>Bỏ qua</Button>]}>
                                        <List.Item.Meta
                                            avatar={<Avatar shape='round' src={item.urlAvatar} size={70} />}
                                            title={item.reason}
                                            description={
                                                <Space direction='vertical' size={8}>
                                                    <span>Người báo cáo: {item.userName}</span>
                                                    <span>Lý do: {item.description}</span>
                                                    <a href={item.urlPdf} >Link</a>
                                                </Space>}
                                        />

                                    </List.Item>
                                )}
                            </VirtualList>
                        </div>
                    </List>
                ) : <NotFoundPage />}

                {/* <Card title="Card title" bordered={false} className='width-30'>
                Card content
            </Card>


            <Card title="Card title" bordered={false} className='width-30'>
                Card content
            </Card>


            <Card title="Card title" bordered={false} className='width-30'>
                Card content
            </Card>
            <Card title="Card title" bordered={false} className='width-30'>
                Card content
            </Card>


            <Card title="Card title" bordered={false} className='width-30'>
                Card content
            </Card>


            <Card title="Card title" bordered={false} className='width-30'>
                Card content
            </Card> */}

            </div>
        </div>

    )
}
export default AdminReportList
