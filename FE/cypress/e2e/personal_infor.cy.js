/// <reference types="Cypress" />
// Thêm dòng ở trên để có gợi ý code cypress


const data = [
    { id: 0, name: 'Kho sách' },
    { id: 1, name: 'Sách yêu thích' },
    { id: 2, name: 'Sách ẩn danh' },
    { id: 3, name: 'Chợ sách' },
]
describe('Spec màn hình thông tin cá nhân', () => {
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
    });

    it('Có thể vào màn hình thông tin cá nhân', () => {
        cy.contains('lehuyhaianh0808@gmail.com', { matchCase: false }).click()
        // cy.findByText('Thông tin cá nhân').click();

        cy.contains("Thông tin cá nhân").click();
        cy.url().should('include', '/users/profile');
    });

    it('Các thông tin chi tiết về tên, năm sinh, số sách đang đọc, muốn đọc và đã đọc xong', () => {

    });

    it('Hiển thị  bài viết người dùng đã đăng', () => {

    });
});
