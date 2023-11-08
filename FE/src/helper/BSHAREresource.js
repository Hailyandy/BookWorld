import BSHAREnum from "./BSHAREenum"
import { Link } from 'react-router-dom';
const BSHAREresource = {
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
            code_401: 'Lỗi từ client - hông tin xác thực không hợp lệ',
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
        authorPageMenuItem: [
            {
                key: 'community',
                label: 'Cộng đồng'
            },
            {
                key: 'book_store',
                label: 'Kho sách'
            }
        ],

        signInHeaderMenuItem: [
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
                            <Link to={`${BSHAREnum.localHost.url}users/my-bookshelf`}>
                                Kho sách
                            </Link>
                        ),
                    },
                    {
                        key: 'book_favourite',
                        label: (
                            <Link to={`${BSHAREnum.localHost.url}books/book-rank`}>
                                Sách yêu thích
                            </Link>
                        ),
                    },
                    {
                        key: 'book_hidden',
                        label: (
                            <Link to={`${BSHAREnum.localHost.url}books/hidden-book`}>
                                Sách ẩn danh
                            </Link>
                        ),
                    },
                    {
                        key: 'book_market',
                        label: (
                            <Link to={`${BSHAREnum.localHost.url}books/market`}>
                                Chợ sách
                            </Link>
                        ),
                    }
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
        ]
    }
}

export default BSHAREresource
