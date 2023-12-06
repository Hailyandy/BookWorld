/// <reference types="Cypress" />
describe('Spec đăng ký', () => {
    beforeEach(() => {
        cy.visit(`/register`);
    });
    it('Có trường email, mật khẩu, có nút đăng ký và chọn role', () => {
        cy.get('.form_register #basic_username ')
            .should('have.attr', 'placeholder', 'Email đăng nhập')
        cy.get('.form_register #basic_password ')
            .should('have.attr', 'placeholder', 'Mật khẩu')
        cy.contains('Chọn role');
        cy.contains('Đăng ký ngay');
    });

    it('Thực hiện đăng ký thử gmail email đã đăng ký trước đó', () => {
        cy.get('.form_register #basic_username ')
            .type('user1@gmail.com')
        cy.get('.form_register #basic_password ')
            .type('123456')
        cy.get('#basic_roles').click();
        cy.get('.rc-virtual-list-holder-inner').get('[title="Người dùng"]').click({ force: true })

        cy.intercept('POST', '/api/auth/signin', {
            statusCode: 400,
            fixture: 'register/register_success.json',
        }).as('login');
        cy.wait(1500)
        cy.contains('Đăng ký ngay').click({ force: true });

        // cy.get('.notyf__message').should('have.text', 'Lỗi từ client – dữ liệu đầu vào không hợp lệ.Lỗi: Email này đã được đăng ký trước đó!')
    });
    /**
    * //Thay email thành một email khác để test chạy thành công
    */
    // it('Thực hiện đăng ký thử gmail thành công', () => {
    //     cy.get('.form_register #basic_username ')
    //         .type('user105@gmail.com')
    //     cy.get('.form_register #basic_password ')
    //         .type('123456')
    //     cy.get('#basic_roles').click();
    //     cy.get('.rc-virtual-list-holder-inner').get('[title="Người dùng"]').click()

    //     cy.intercept('POST', '/api/auth/signin', {
    //         statusCode: 200,
    //         fixture: 'register/register_success.json',
    //     }).as('login');
    //     cy.contains('Đăng ký ngay').click();

    //     cy.url().should('include', '/otp-confirmation/user105@gmail.com');
    // });
});
