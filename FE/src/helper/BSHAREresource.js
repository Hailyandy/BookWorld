import BSHAREnum from "./BSHAREenum"
import { Link } from 'react-router-dom';
import tokenService from "~/services/token.service";
export let localHost = {
    url: `https://hailyandy.github.io/BookWorld/#/${tokenService.getUserRoleName()}/`
}
export const url = { baseUrlBE: "https://book-world-0f7cf4c7e1a0.herokuapp.com/api/" }
export const cicd_href = 'Bookworld/#'
export const updateLocalHostUrl = (updateStringrole) => {
    localHost.url = `https://hailyandy.github.io/BookWorld/#/${updateStringrole}/`
    BSHAREresource.localHost.url = `https://hailyandy.github.io/BookWorld/#/${updateStringrole}/`
    BSHAREresource.menuItems = {
        ROLE_AUTHOR_MenuItem: [
            {
                key: 'community',
                label: 'Cộng đồng'
            },
            {
                key: 'book_store',
                label: 'Kho sách'
            }
        ],

        ROLE_USER_MenuItem: [
            {
                key: 'community',
                label: 'Cộng đồng'
            },
            {
                key: 'book_store',
                label: 'Sách',
                children: [
                    {
                        key: 'book_warehouse',
                        label: (
                            <Link to={`${localHost.url}my-bookshelf`}>
                                Kho sách
                            </Link>
                        ),
                    },
                    {
                        key: 'book_favourite',
                        label: (
                            <Link to={`${localHost.url}books/book-rank`}>
                                Sách yêu thích
                            </Link>
                        ),
                    },
                    {
                        key: 'book_hidden',
                        label: (
                            <Link to={`${localHost.url}books/hidden-book`}>
                                Sách ẩn danh
                            </Link>
                        ),
                    },
                    {
                        key: 'book_market',
                        label: (
                            <Link to={`${localHost.url}books/market`}>
                                Chợ sách
                            </Link>
                        ),
                    },
                    // {
                    //     key: 'book_rank',
                    //     label: (
                    //         <Link to={`${localHost.url}books/book-rank`}>
                    //             Sách nổi bật
                    //         </Link>
                    //     ),
                    // }

                ],
            }
        ],
        notSignInHeaderMenuItem: [
            {
                key: 'homePage',
                label: 'Trang chủ'
            },
            {
                key: 'introduction',
                label: 'Giới thiệu'
            },
            {
                key: 'support',
                label: 'Hỗ trợ'
            }
        ],
        ROLE_ADMIN_MenuItem: [
            {
                key: 'add_new_book',
                label: (
                    < Link to={`${localHost.url}add-new-book`} >
                        Thêm sách mới
                    </Link >)

            },
            {
                key: 'dashboard',
                label: (
                    < Link to={`${localHost.url}`} >
                        Dashboard
                    </Link >)

            },
            {
                key: 'reported_post',
                label: (
                    < Link to={`${localHost.url}statistic-post-list`} >
                        Nội dung vi phạm
                    </Link >)

            },
            {
                key: 'statistic_post',
                label: (
                    < Link to={`${localHost.url}statistic-report-post`} >
                        Thống kê bài đăng
                    </Link >)

            },

        ]

    }
}
const BSHAREresource = {
    localHost: {
        url: 'https://hailyandy.github.io/BookWorld/#/'
    },
    url: { baseUrlBE: "https://book-world-0f7cf4c7e1a0.herokuapp.com/api/" },
    notification_message: {
        success: {
            login: 'Đăng nhập thành công',
            register: 'Đăng ký thành công',
            otp: 'Xác nhận mã thành công'

        },
        info: {

        },
        warning: {

        },
        danger: {

        }
    },

    warning_content: {
        popup_form: {
            click_destroy: "Bạn có muốn hủy bỏ khai báo tài sản này?",
            warning_unproper_input: "Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá",
            warning_down_percentage: "Tỷ lệ hao mòn phải bằng 1 /Số năm sử dụng"
        },
        main_content_delete_record: {
            delete_one: 'Bạn có muốn xóa tài sản ',
            delete_multiple: 'tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?',
            delete_one_exception: 'Không thể xóa tài sản này vì đã có chứng từ phát sinh',
            delete_multiple_exception: '02 tài sản đã chọn không thể xóa. Vui lòng kiểm tra lại tài sản trước khi xóa',
        },
    },
    notification_content: {
        popup_form: {
            error_noti: "Có lỗi này",
            success_noti: "Lưu dữ liệu thành công",
        },
        error_status_code: {
            code_200: 'Lấy dữ liệu thành công',
            code_201: 'Post dữ liệu thành công',
            code_400: 'Lỗi từ client – dữ liệu đầu vào không hợp lệ.',
            code_401: 'Lỗi từ client - thông tin xác thực không hợp lệ',
            code_403: 'Không tin xác thực không hợp lệ',
            code_404: 'Không tìm thấy địa chỉ hoặc tài nguyên ',
            code_500: 'Lỗi từ back-end.',
            network_error: 'Lỗi mạng không gửi được',
            server_error: 'Lỗi server rồi'
        }
    },
    validate: {
        nameFieldDefault: "Trường",
        paramPassToFunctionError: "Dữ liệu truyền vào hàm không hợp lệ.",
        maxLengthError: "Độ dài tối đa của <%s> là %d kí tự.",
        minLengthError: "Độ dài tối thiểu của <%s> là %d kí tự.",
        emptyError: "%s không được phép để trống.",
        dateNotGreaterThanToday: "%s không được lớn hơn ngày hiện tại.",
        formatError: "%s không đúng định dạng.",
    },

    menuItems: {
        ROLE_AUTHOR_MenuItem: [
            {
                key: 'create_test',
                label: (
                    <Link to={`${localHost.url}create-test`}>
                        Tạo bài test
                    </Link>
                ),
            },
            {
                key: 'created_post',
                label: (
                    <Link to={`${localHost.url}author-created-book`}>
                        Sách tác giả
                    </Link>
                ),
            },
        ],

        ROLE_USER_MenuItem: [
            {
                key: 'community',
                label: 'Cộng đồng'
            },
            {
                key: 'book_store',
                label: 'Sách',
                children: [
                    {
                        key: 'book_warehouse',
                        label: (
                            <Link to={`${localHost.url}my-bookshelf`}>
                                Kho sách
                            </Link>
                        ),
                    },
                    {
                        key: 'book_favourite',
                        label: (
                            <Link to={`${localHost.url}books/book-rank`}>
                                Sách yêu thích
                            </Link>
                        ),
                    },
                    {
                        key: 'book_hidden',
                        label: (
                            <Link to={`${localHost.url}books/hidden-book`}>
                                Sách ẩn danh
                            </Link>
                        ),
                    },
                    {
                        key: 'book_market',
                        label: (
                            <Link to={`${localHost.url}books/market`}>
                                Chợ sách
                            </Link>
                        ),
                    },
                    // {
                    //     key: 'book_rank',
                    //     label: (
                    //         <Link to={`${localHost.url}books/book-rank`}>
                    //             Sách nổi bật
                    //         </Link>
                    //     ),
                    // }

                ],
            }
        ],
        notSignInHeaderMenuItem: [
            {
                key: 'homePage',
                label: 'Trang chủ'
            },
            {
                key: 'introduction',
                label: 'Giới thiệu'
            },
            {
                key: 'support',
                label: 'Hỗ trợ'
            }
        ],
        ROLE_ADMIN_MenuItem: [
            {
                key: 'add_new_book',
                label: (
                    < Link to={`${localHost.url}add-new-book`} >
                        Thêm sách mới
                    </Link >)

            },
            {
                key: 'dashboard',
                label: (
                    < Link to={`${localHost.url}`} >
                        Dashboard
                    </Link >)

            },
            {
                key: 'reported_post',
                label: (
                    < Link to={`${localHost.url}statistic-post-list`} >
                        Nội dung vi phạm
                    </Link >)

            },
            {
                key: 'statistic_post',
                label: (
                    < Link to={`${localHost.url}statistic-report-post`} >
                        Thống kê bài đăng
                    </Link >)

            },

        ]

    }
}

export default BSHAREresource
