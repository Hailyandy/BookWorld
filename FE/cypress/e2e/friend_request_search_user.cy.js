///<reference types="Cypress" />
// Thêm dòng ở trên để có gợi ý code cypress

describe('Spec màn hình danh sách bạn bè và chuyển màn khi thực hiện tìm kiếm người dùng', () => {
    beforeEach(() => {
        cy.viewport(1226, 1009)
        cy.visit(`/`);
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
        cy.get('.anticon.anticon-user').first()
            .click()
        // cy.findByText('Thông tin cá nhân').click();

    });

    it('Thực hiện tìm kiếm bạn bè, trả về kết quả tìm kiếm', () => {
        cy.get('input[placeholder="Tìm kiếm bạn bè"]').type('a')
        cy.intercept('GET', '/api/users/search?name=a', {
            statusCode: 200,
            fixture: 'login/friend_search_result.json',
        }).as('search_user_name_a');
        // cy.get('button').filter(':contains("Tìm kiếm")').click()
        // cy.get('button').filter(':contains("Kết bạn")').should('be.visible')
        cy.intercept('GET', '/api/post?userId=9&state=PUBLIC', {
            statusCode: 200,
            fixture: 'search/search_post_by_userId.json',
        }).as('search_user_name_a');

        cy.intercept('GET', '/api/users/9', {
            statusCode: 200,
            fixture: 'search/search_user_by_id.json',
        }).as('search_user_name_a');
        cy.get('strong').first().click()
    });




    // it('Các thông tin chi tiết về tên, năm sinh, số sách đang đọc, muốn đọc và đã đọc xong', () => {

    // });

    // it('Hiển thị  bài viết người dùng đã đăng', () => {

    // });
});
