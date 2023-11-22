/// <reference types="Cypress" />
describe('Spec đăng nhập', () => {
    beforeEach(() => {
        cy.visit(`/login`);
    });

    it('Vào được trang đăng nhập', () => { });

    it('Có trường tài khoản và mật khẩu', () => {
        cy.get('.form_login #basic_username ')
            .should('have.attr', 'placeholder', 'Tài khoản')
        cy.get('.form_login #basic_password ')
            .should('have.attr', 'placeholder', 'Mật khẩu')
    });

    it('Có nút Đăng ký ngay', () => {
        cy.contains('Đăng ký ngay');
    });

    it('Hiển thị thông báo khi không nhập tên đăng nhập và mật khẩu', () => {
        cy.get('.form_login #basic_username ')
            .should('have.attr', 'placeholder', 'Tài khoản')
        cy.get('.form_login #basic_password ')
            .should('have.attr', 'placeholder', 'Mật khẩu')



        cy.get('.form_login button').contains('Đăng nhập').click();
        cy.contains('Hãy nhập tên đăng nhập!');
        cy.contains('Hãy nhập mật khẩu!');
    });

    it('Hiển thị thông báo từ server trả về khi sai mật khẩu', () => {
        cy.get('.form_login #basic_username ')
            .type('lehuyhaianh0808@gmail.com')
        cy.get('.form_login #basic_password ')
            .type('1234567')

        cy.intercept('POST', '/api/auth/signin', {
            statusCode: 401,
            fixture: 'login/login_failed.json',
        }).as('login');

        cy.get('.form_login button').contains('Đăng nhập').click();
        // cy.get('.notyf__message').then(el => {
        //     const text = el.text()
        //     cy.log(text)
        // });
        cy.get('.notyf__message').should('have.text', 'Lỗi từ client - thông tin xác thực không hợp lệSai tên đăng nhập hoặc mật khẩu')
    });

    it('Kiểm tra che dấu mật khẩu đang nhập', () => {
        cy.get('.form_login #basic_password ')
            .as('passwordInput')
        cy.get('@passwordInput').should('have.attr', 'type', 'password');
    });

    it('Hiện thông báo khi đăng nhập thành công', () => {
        cy.get('.form_login #basic_username ')
            .type('lehuyhaianh0808@gmail.com')
        cy.get('.form_login #basic_password ')
            .type('123456')
        cy.intercept('POST', '/api/auth/signin', {
            statusCode: 200,
            fixture: 'login/login_success.json',
        }).as('login');
        cy.get('.form_login button').contains('Đăng nhập').click();

        cy.get('.notyf__message').should('have.text', 'Thành công!')
    });

    it('Nhấn đăng ký chuyển hướng đến trang đăng ký', () => {
        cy.contains('Đăng ký ngay').click();
        cy.url().should('include', '/register');
    });
});
