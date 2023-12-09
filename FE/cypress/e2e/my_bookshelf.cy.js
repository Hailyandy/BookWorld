///<reference types="Cypress" />
// Thêm dòng ở trên để có gợi ý code cypress

describe('Spec màn hình kho sách mà cá nhân đang theo dõi', () => {
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
        cy.get('.ant-menu-title-content').contains('Sách', { matchCase: false }).realHover('mouse');
        //Các mục trong menu Sách
        cy.contains('Kho sách', { matchCase: false }).click({ force: true });
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
    // it('Kiểm tra chuyển sang màn tạo post review về sách', () => {
    //     cy.contains('Chỉnh sửa', { matchCase: false }).first().click()
    //     cy.url().should('include', '/review/edit');
    // });

});
