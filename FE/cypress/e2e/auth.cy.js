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

    it('Hiện thông báo khi đăng nhập thành công user', () => {
        cy.get('.form_login #basic_username ')
            .type('lehuyhaianh0808@gmail.com')
        cy.get('.form_login #basic_password ')
            .type('123456')
        cy.get('#basic_remember').click();

        cy.intercept('POST', '/api/auth/signin', {
            statusCode: 200,
            fixture: 'login/login_success.json',
        }).as('login');

        cy.intercept('GET', '/api/book', {
            statusCode: 200,
            fixture: 'book/suggest_book.json',
        }).as('books');

        cy.intercept('GET', '/api/friend/list', {
            statusCode: 200,
            fixture: 'friend/friend_list.json',
        }).as('friendList');

        cy.intercept('GET', '/api/friend/request', {
            statusCode: 200,
            fixture: 'friend/friend_request.json',
        }).as('friendReq');

        cy.intercept('GET', '/api/bookBasket', {
            statusCode: 200,
            fixture: 'book/book_basket.json',
        }).as('bookBasket');


        cy.intercept('GET', '/api/book/top', {
            statusCode: 200,
            fixture: 'book/book_top.json',
        }).as('bookTop');

        cy.intercept('GET', '/api/post?state=PUBLIC', {
            statusCode: 200,
            fixture: 'post/post_public.json',
        }).as('postPublic');

        cy.intercept('GET', '/api/comment?postId=2', {
            statusCode: 200,
            fixture: 'comment/comment_postId_2.json',
        }).as('comment_postId_2');

        cy.intercept('GET', '/api/comment?postId=1', {
            statusCode: 200,
            fixture: 'comment/comment_postId_1.json',
        }).as('comment_postId_1');

        cy.get('.form_login button').contains('Đăng nhập').click();

        // cy.get('.notyf__message').should('have.text', 'Thành công!')
    });

    it('Hiện thông báo khi đăng nhập thành công admin', () => {
        cy.get('.form_login #basic_username ')
            .type('admin@gmail.com')
        cy.get('.form_login #basic_password ')
            .type('123456')
        cy.get('#basic_remember').click();
        cy.intercept('POST', '/api/auth/signin', {
            statusCode: 200,
            fixture: 'login/login_success_admin.json',
        }).as('login');
        cy.intercept('GET', '/api/friend/list', {
            statusCode: 200,
            fixture: 'friend/friend_list.json',
        }).as('friendList');

        cy.intercept('GET', '/api/book', {
            statusCode: 200,
            fixture: 'book/suggest_book.json',
        }).as('books');

        cy.intercept('GET', '/api/bookBasket', {
            statusCode: 200,
            fixture: 'book/book_basket.json',
        }).as('bookBasket');

        cy.get('.form_login button').contains('Đăng nhập').click();

        // cy.get('.notyf__message').should('have.text', 'Thành công!')
    });

    it('Hiện thông báo khi đăng nhập thành công author', () => {
        cy.get('.form_login #basic_username ')
            .type('user50@gmail.com')
        cy.get('.form_login #basic_password ')
            .type('123456')
        cy.get('#basic_remember').click();
        cy.intercept('POST', '/api/auth/signin', {
            statusCode: 200,
            fixture: 'login/login_success_author.json',
        }).as('login');
        cy.get('.form_login button').contains('Đăng nhập').click();

        // cy.get('.notyf__message').should('have.text', 'Thành công!')
    });

    it('Nhấn đăng ký chuyển hướng đến trang đăng ký', () => {
        cy.contains('Đăng ký ngay').click();
        cy.url().should('include', '/register');
    });
    it('Nhấn nút remember me', () => {
        cy.get('#basic_remember').click();
        // cy.url().should('include', '/register');
    });
});
