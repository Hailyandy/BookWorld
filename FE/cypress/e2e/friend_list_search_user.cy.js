///<reference types="Cypress" />
// Thêm dòng ở trên để có gợi ý code cypress

describe('Spec màn hình danh sách bạn bè và chuyển màn khi thực hiện tìm kiếm người dùng', () => {
    beforeEach(() => {

        cy.visit(`/login`);
        // Vào trang chủ
        cy.get('.form_login #basic_username ')
            .type('lehuyhaianh0808@gmail.com')
        cy.get('.form_login #basic_password ')
            .type('123456')
        cy.intercept('POST', '/api/auth/signin', {
            statusCode: 200,
            fixture: 'login/login_success.json',
        }).as('login');
        cy.get('.form_login button').contains('Đăng nhập').click();
        cy.contains('lehuyhaianh0808@gmail.com', { matchCase: false }).click()
        // cy.findByText('Thông tin cá nhân').click();

        cy.contains("Danh sách bạn bè").click();
    });

    it('Thực hiện tìm kiếm bạn bè, trả về kết quả tìm kiếm', () => {
        cy.get('input[placeholder="Tìm kiếm bạn bè"]').type('a')
        cy.get('button').filter(':contains("Tìm kiếm")').click()
        cy.get('button').filter(':contains("Kết bạn")').should('be.visible')
    });

    it('Thực hiện nhấn nút kết bạn', () => {
        cy.get('input[placeholder="Tìm kiếm bạn bè"]').type('a')
        cy.get('button').filter(':contains("Tìm kiếm")').click()
        cy.get('button').filter(':contains("Kết bạn")').first().click()
        cy.get('.notyf__message').filter(':contains("Thành công")')
    });

    it('Thực hiện nhấn nút Huỷ lời mời', () => {
        cy.get('input[placeholder="Tìm kiếm bạn bè"]').type('a')
        cy.get('button').filter(':contains("Tìm kiếm")').click()
        cy.get('button').filter(':contains("Huỷ lời mời")').first().click()
        cy.get('.notyf__message').filter(':contains("Friend delete!")')
    });


    // it('Các thông tin chi tiết về tên, năm sinh, số sách đang đọc, muốn đọc và đã đọc xong', () => {

    // });

    // it('Hiển thị  bài viết người dùng đã đăng', () => {

    // });
});
