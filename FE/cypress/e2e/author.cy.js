/// <reference types="Cypress" />
describe('Spec các chức năng tác giả', () => {
    beforeEach(() => {
        // cy.viewport(1226, 1009)
        cy.visit(`/login`);
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
    });
    it('Tạo câu hỏi cho bài test sách id là 71', () => {
        // cy.get('a[href="/ROLE_AUTHOR/author-created-book"]').click({ force: true });

        // cy.get('a[href="/login"]').click()
        cy.intercept('GET', '/api/author/book', {
            statusCode: 200,
            fixture: 'book/author_get_book.json',
        }).as('author_get_book');
        // cy.intercept('GET', '/chat/info?t=', {
        //     statusCode: 200,
        //     fixture: 'book/author_get_book.json',
        // }).as('author_get_book');

        // cy.get('a[href="/ROLE_AUTHOR/author-created-book"]').contains('Sách tác giả').click({ force: true });
        // cy.wait(1500)
        cy.contains('Sách tác giả').click({ force: true })
        // cy.visit('/ROLE_AUTHOR/author-created-book');
        // cy.contains('Tạo bài').first().click()
        // cy.intercept('GET', '/api/author/book', {
        //     statusCode: 200,
        //     fixture: 'book/author_get_book.json',
        // }).as('author_get_book');
        cy.visit('/ROLE_AUTHOR/author-created-book')

        cy.wait('@author_get_book')
        cy.intercept('GET', '/api/questions?idBook=71', {
            statusCode: 200,
            fixture: 'book/author_get_question_for_book.json',
        }).as('author_get_question_for_book');
        cy.get('a').contains('Tạo bài').first().click()
    });
});
