import "./anonymousUser.css"
import { Link } from 'react-router-dom'

import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input, Space, Checkbox } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Tooltip } from 'antd';
import { Pagination } from 'antd';
import SelectItem from "~/components/ui/SelectItem/SelectItem";

// const onChange = (e) => {
//   console.log(`checked = ${e.target.checked}`);
// };
// const { Search } = Input;
// const suffix = (
//   <AudioOutlined
//     style={{
//       fontSize: 16,
//       color: '#1677ff',
//     }}
//   />
// );
// const onSearch = (value, _e, info) => console.log(info?.source, value);


// const handleButtonClick = (e) => {
//     message.info('Click on left button.');
//     console.log('click left button', e);
//   };
//   const handleMenuClick = (e) => {
//     message.info('Click on menu item.');
//     console.log('click', e);
//   };
//   const items = [
//     {
//       label: '1st menu item',
//       key: '1',
//       icon: <UserOutlined />,
//     },
//     {
//       label: '2nd menu item',
//       key: '2',
//       icon: <UserOutlined />,
//     },
//     {
//       label: '3rd menu item',
//       key: '3',
//       icon: <UserOutlined />,
//       danger: true,
//     },
//     {
//       label: '4rd menu item',
//       key: '4',
//       icon: <UserOutlined />,
//       danger: true,
//       disabled: true,
//     },
//   ];
//   const menuProps = {
//     items,
//     onClick: handleMenuClick,
//   };

const AnonymousUser = () => {
  return (
    <>

    </>
  )
}

export default AnonymousUser


// {/* <div class="anonymous-container">
//                 <div class="body-container">
//                 <div class="category">
//                         <h2>Thể loại</h2>
//                 </div>
//                 <div class="display-book">
//                         <div class="search-result">
//                             <p>0 kết quả được tìm thấy</p>
//                             <Dropdown menu={menuProps}>
//                                 <Button>
//                                     <Space>
//                                        Sắp xếp theo:
//                                        <DownOutlined />
//                                     </Space>
//                                 </Button>
//                             </Dropdown>
//                         </div>
//                         <ul class="book-list">
//                             <li class="book-item">
//                                 <SelectItem/>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//                  {/* Footer */}
// <div class="footer">
//   <Pagination defaultCurrent={1} total={50} />
// </div>
//            </div > * /}
