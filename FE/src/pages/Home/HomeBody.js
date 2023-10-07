import './css/homebody.css';
import { Checkbox, Row, Col, Button } from 'antd';
import { Input } from 'antd';
const { TextArea } = Input;
const onChange = (e) => {
    console.log(e);
};
const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4',
    'Option 5', 'Option 6', 'Option 7', 'Option 8',
    'Option 9', 'Option 10', 'Option 11', 'Option 12'];
const HomeBody = () => {
    return (<div className='homebody-containerFather center-vertical'>
        <div className="homebody-container">
            <div class="rectangle center-horizontal homebody-container--itemLeft">
                <span class="sprite-bigger_book"> </span>
            </div>
            <div className="homebody-container--itemRight">
                <div className="home-container-itemRight--header center-horizontal">
                    <div class="rectangle center-horizontal">
                        <span class="sprite-logo" style={{ transform: "scale(1)" }}> </span>
                    </div>
                    <span className="home-container-itemRightHeader--title">Book World</span>
                </div>
                <div className="home-container-itemRightHeader--message">
                    <p className='home-container-itemRightHeader--fontstyle home-container-itemRightHeaderMessage--title'>Chọn thể loại sách yêu thích của bạn</p>
                    <div className='home-container-itemRightHeader--fontstyle home-container-itemRightHeaderMessage--description'>Chúng tôi sử dụng thể loại yêu thích của bạn để đưa ra đề xuất sách tốt hơn và điều chỉnh nội dung bạn thấy trong nguồn cấp dữ liệu</div>
                </div>
                <div className="homebody-containerItemRight--body">
                    <div className="homebody-containerItemRightBody--selection">
                        <Row gutter={16} justify="center">
                            <Col className="gutter-row" span={4}>
                                <Checkbox>{options[0]}</Checkbox>


                            </Col>

                            <Col className="gutter-row" span={4}>
                                <Checkbox>{options[0]}</Checkbox>

                            </Col>

                            <Col className="gutter-row" span={4}>
                                <Checkbox>{options[0]}</Checkbox>

                            </Col>
                        </Row>
                        <Row gutter={16} justify="center">
                            <Col className="gutter-row" span={4}>
                                <Checkbox>{options[0]}</Checkbox>


                            </Col>

                            <Col className="gutter-row" span={4}>
                                <Checkbox>{options[0]}</Checkbox>

                            </Col>

                            <Col className="gutter-row" span={4}>
                                <Checkbox>{options[0]}</Checkbox>

                            </Col>
                        </Row>
                        <Row gutter={16} justify="center">
                            <Col className="gutter-row" span={4}>
                                <Checkbox>{options[0]}</Checkbox>


                            </Col>

                            <Col className="gutter-row" span={4}>
                                <Checkbox>{options[0]}</Checkbox>

                            </Col>

                            <Col className="gutter-row" span={4}>
                                <Checkbox>{options[0]}</Checkbox>

                            </Col>
                        </Row>
                    </div>


                    <Row style={{ marginBottom: "3rem" }}>
                        <Col span={2} >
                            <div className='center-horizontal center-vertical' style={{ height: "100%", }}>Khác</div>
                        </Col>
                        <Col span={18} >
                            <Input placeholder="input with clear icon" allowClear onChange={onChange} size='middle' />
                        </Col>

                    </Row>


                </div>
                <Row justify="center">
                    <Col span={24} >
                        <Button style={{
                            borderRadius: "10px",
                            background: "linear-gradient(180deg, rgba(67, 216, 205, 0.90) 0%, rgba(22, 38, 37, 0.00) 100%)",
                            width: "191px",
                            height: "64px",
                        }}>
                            <span style={{
                                color: "#224957",

                                fontFamily: "'Poppins', sans-serif",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "normal"
                            }}>Tiếp tục</span></Button>
                    </Col>
                </Row>
            </div>
        </div >
    </div>
    )

}
export default HomeBody
