/// <reference types="Cypress" />
describe('Spec các chức năng admin', () => {
    beforeEach(() => {
        cy.viewport(1226, 1009)
        cy.visit(`/login`);
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
    });
    it('Vào được trang home admin', () => {
        // cy.intercept('GET', '/api/author/book', {
        //     statusCode: 200,
        //     fixture: 'book/author_get_book.json',
        // }).as('author_get_book');
        // cy.contains('Sách tác giả').click({ force: true })
        // cy.visit('/ROLE_AUTHOR/author-created-book')
        // cy.wait('@author_get_book')
        // cy.intercept('GET', '/api/questions?idBook=71', {
        //     statusCode: 200,
        //     fixture: 'book/author_get_question_for_book.json',
        // }).as('author_get_question_for_book');
        // cy.get('a').contains('Tạo bài').first().click()
    });
});
