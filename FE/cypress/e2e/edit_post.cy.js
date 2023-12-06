///<reference types="Cypress" />
// Thêm dòng ở trên để có gợi ý code cypress

describe('Spec màn hình chỉnh sửa bài post', () => {
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
        cy.get('.ant-menu-title-content').contains('Sách', { matchCase: false }).realHover('mouse');
        //Các mục trong menu Sách
        cy.contains('Kho sách', { matchCase: false }).click();
    });

    it('Vào được trang kho sách cá nhân', () => { });
    it('Kiểm tra các column chứa thông tin sách', () => {
        //6 column biểu diễn các thông tin liên quan đến sách
        cy.contains('Ảnh bìa', { matchCase: false })
        cy.contains('Tiêu đề', { matchCase: false })
        cy.contains('Tên tác giả', { matchCase: false })
        cy.contains('TB xếp hạng', { matchCase: false })
        cy.contains('Bài đánh giá', { matchCase: false })
        cy.contains('Đánh giá', { matchCase: false })
    });
    it('Kiểm tra chuyển sang màn tạo post review về sách', () => {
        cy.contains('Chỉnh sửa', { matchCase: false }).first().click()
        cy.url().should('include', '/review/edit');
    });

});
