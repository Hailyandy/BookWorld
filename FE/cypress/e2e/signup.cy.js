/// <reference types="Cypress" />
describe('Spec đăng ký', () => {
    let random = `cy${Math.random().toString().slice(2, 8)}`
    beforeEach(() => {
        cy.visit(`/`);
        cy.contains('Đăng ký').click()
        // cy.visit(`/register`);
        // we need random username and email each test
        var emailAddress = 'testEmail-' + Math.random().toString(36).substr(2, 16) + '@mail.com';
        // use alias instead of let
        cy.wrap(random).as('username')
        cy.wrap(`${random}@gmail.com`).as('email')


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
    it('Thực hiện đăng ký thử gmail thành công', () => {
        let email = `${random}@gmail.com`
        cy.get('.form_register #basic_username ')
            .type(email)
        cy.get('.form_register #basic_password ')
            .type('123456')
        cy.get('#basic_roles').click();
        cy.get('.rc-virtual-list-holder-inner').get('[title="Người dùng"]').click()

        cy.intercept('POST', '/api/auth/signup', {
            statusCode: 200,
            fixture: 'register/register_success.json',
        }).as('signup');
        cy.contains('Đăng ký ngay').click();

        cy.url().should('include', `/otp-confirmation/${email}`);
    });

    /**
* //
*/
    it('Không điền mật khẩu, form hiển thị lỗi', () => {
        let email = `${random}@gmail.com`
        cy.get('.form_register #basic_username ')
            .type(email)
        cy.get('#basic_roles').click();
        cy.get('.rc-virtual-list-holder-inner').get('[title="Người dùng"]').click()
        cy.contains('Đăng ký ngay').click();
    });
});
