/// <reference types="Cypress" />
describe('Spec màn kho sách', () => {
    beforeEach(() => {
        cy.viewport(1226, 1009)
        cy.visit(`/login`);
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
        cy.get('.ant-menu-title-content').contains('Sách', { matchCase: false }).realHover('mouse');
        //Các mục trong menu Sách
        cy.contains('Kho sách', { matchCase: false }).click({ force: true });
    });
    it('Tạo bài post', () => {


        cy.intercept('GET', '/api/book/search/1', {
            statusCode: 200,
            fixture: 'book/search_book_by_id_1.json',
        }).as('search_book_by_text');
        cy.contains('Tạo bài').first().click()
        cy.get('.ant-rate-star.ant-rate-star-full').first().click()
        cy.get('.ant-row.ant-form-item-row').eq(1).get('.ant-select-selector').contains('Đã đọc').click()
        cy.get('.ant-select-item-option-content').eq(1).click()
        cy.get('#basic_content').type('test')

        cy.intercept('POST', '/api/post', {
            statusCode: 200,
            fixture: 'comment/comment_success.json',
        }).as('bookTop');
        cy.contains('Đăng bài').click()


    });


});
