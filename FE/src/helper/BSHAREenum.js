const BSHAREnum = Object.freeze({
    headerType: Object.freeze({
        not_sign_in: Symbol("not.sign.in"),
        signed_in: Symbol("signed.in"),
    }),
    modelReviewPostType: Object.freeze({
        without_dropdown_button: Symbol("without.dropdown.button"),
    }),
    notification_content: Object.freeze({
        popup_form: Object.freeze({
            error_noti: Symbol("Có lỗi này"),
            success_noti: Symbol("Lưu dữ liệu thành công"),
        }),
        error_status_code: Object.freeze({
            code_200: Symbol('Lấy dữ liệu thành công'),
            code_201: Symbol('Post dữ liệu thành công'),
            code_400: Symbol('Lỗi từ client – dữ liệu đầu vào không hợp lệ.'),
            code_401: Symbol('Lỗi từ client - thông tin xác thực không hợp lệ'),
            code_403: Symbol('Không tin xác thực không hợp lệ'),
            code_404: Symbol('Không tìm thấy địa chỉ hoặc tài nguyên '),
            code_500: Symbol('Lỗi từ back-end.'),
            network_error: Symbol('Lỗi mạng không gửi được'),
            server_error: Symbol('Lỗi server rồi')
        })
    }),
    roles: Object.freeze({
        user: Symbol('ROLE_USER'),
        author: Symbol('ROLE_AUTHOR'),
        admin: Symbol('ROLE_ADMIN')
    }),
    dropdown_user_menu_key: Object.freeze({
        logout: 'logout',
        friendList: 'friendList',
        personalProfile: 'personalProfile'
    }),
    the_user_item: Object.freeze({
        friend_req: 'friendReq',
        friend_list: 'friendList'
    }),

    /**
     * null : Không có gì
        PENDING: Đang gửi yêu cầu kb
        ACCEPTED: Bạn bè
        ACCEPT: Chấp nhận lời mời kết bạn
     */
    friendship: Object.freeze({
        PENDING: 'PENDING',
        ACCEPTED: 'ACCEPTED',
        ACCEPT: 'ACCEPT'
    }),
    updateFriendshipAction: Object.freeze({
        add_friend: 'AddFriend',
        un_friend: 'UnFriend',
        accept_friend_req: 'AcceptFriendRequest',
        reject_friend_req: 'RejectFriendRequest',
        cancel_add_friend: 'CancelFriendRequest',
        follow_people: 'FollowPeople'
    }),
    bookStatusWithUser: Object.freeze({
        read: 'Đã đọc',
        want_to_read: 'Muốn đọc',
        reading: 'Đang đọc',
    })
})

export default BSHAREnum
