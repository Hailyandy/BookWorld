
import React from 'react';
import { Card, Col, Row, Space, Button } from 'antd';
import './css/reportlist.css'
import { useLoaderData } from 'react-router-dom';
import { List, Avatar } from 'antd';
import VirtualList from 'rc-virtual-list';
import NotFoundPage from '../NotFound/NotFound';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { handlePdfReportAdminAsync } from '~/slices/user';
import { useState } from 'react';
const AdminReportList = () => {
    const [listReport, setListReport] = useState(useLoaderData())
    const dispatch = useDispatch()
    const handleRejectPdf = (id) => {
        dispatch(handlePdfReportAdminAsync({ id, status: 'REJECT' }))
            .unwrap()
            .then(async data => {
                console.log(data)
                let temp = listReport.filter((report) => {
                    return report.id != id
                })
                setListReport(temp)
            })
            .catch(e => {
                console.log(e);
                return []
            })
    }
    const handleAcceptPdf = (id) => {
        dispatch(handlePdfReportAdminAsync({ id, status: 'ACCEPT' }))
            .unwrap()
            .then(async data => {
                console.log(data)
                let temp = listReport.filter((report) => {
                    return report.id != id
                })
                setListReport(temp)
            })
            .catch(e => {
                console.log(e);
                return []
            })
    }
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
                                    <List.Item key={item.id} actions={[<Button key="list-loadmore-edit" style={{ backgroundColor: 'var(--warning-color)' }} onClick={() => handleRejectPdf(item.id)}>Xóa file</Button>,
                                    <Button key="list-loadmore-edit" style={{ backgroundColor: 'var(--button-default-background-color)' }} onClick={() => handleAcceptPdf(item.id)}>Bỏ qua</Button>]}>
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
