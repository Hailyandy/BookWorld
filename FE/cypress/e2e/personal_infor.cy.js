/// <reference types="Cypress" />
// Thêm dòng ở trên để có gợi ý code cypress


const data = [
    { id: 0, name: 'Kho sách' },
    { id: 1, name: 'Sách yêu thích' },
    { id: 2, name: 'Sách ẩn danh' },
    { id: 3, name: 'Chợ sách' },
]
describe('Spec truy cập vào danh sách bạn bè, thông tin cá nhân, bài post của người dùng', () => {
    beforeEach(() => {
        cy.viewport(1226, 1009)
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
    });

    it('Có thể vào màn hình thông tin cá nhân', () => {
        cy.contains('lehuyhaianh0808@gmail.com', { matchCase: false }).click()
        // cy.findByText('Thông tin cá nhân').click();

        cy.contains("Thông tin cá nhân").click();
        cy.url().should('include', '/profile');
    });

    it('Hiển thị  bài viết người dùng đã đăng', () => {
        cy.contains('lehuyhaianh0808@gmail.com', { matchCase: false }).click()
        // cy.findByText('Thông tin cá nhân').click();
        cy.intercept('GET', '/api/post/12', {
            statusCode: 200,
            fixture: 'post/post_user_id_12.json',
        }).as('post_user_id_12');
        cy.contains("Bài post").click();
    });

    it('Hiển thị danh sách bạn bè của người dùng', () => {
        cy.contains('lehuyhaianh0808@gmail.com', { matchCase: false }).click()
        // cy.findByText('Thông tin cá nhân').click();

        cy.contains("Danh sách bạn bè").click();
    });
});
