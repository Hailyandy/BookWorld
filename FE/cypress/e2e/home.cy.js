/// <reference types="Cypress" />
// Thêm dòng ở trên để có gợi ý code cypress


const data = [
    { id: 0, name: 'Kho sách' },
    { id: 1, name: 'Sách yêu thích' },
    { id: 2, name: 'Sách ẩn danh' },
    { id: 3, name: 'Chợ sách' },
]
describe('Spec màn hình chính', () => {
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
    });

    it('Vào được trang chủ', () => { });

    it('Có thanh breadcum chuyển trang', () => {
        // cy.title().should('equal', 'Trang chủ');
        // cy.title().should('equal', 'Trang chủ');

        cy.get('.ant-breadcrumb').get('a[href="/users"]')
        cy.get('.ant-breadcrumb').get('a[href="/"]')

    });

    it('Có nút dropdown hỗ trợ việc đăng xuất và truy cập vào thông tin cá nhân', () => {
        cy.contains('lehuyhaianh0808@gmail.com', { matchCase: false }).its('children.length').should('eq', 2);
    });

    it('Có menu hỗ trợ việc đăng xuất, thông tin cá nhân, danh sách bạn bè', () => {
        cy.contains('lehuyhaianh0808@gmail.com', { matchCase: false }).its('children.length').should('eq', 2);
    });

    it('Có các mục Cộng đồng, sách và trong sách có các mục Kho sách, Sách yêu thích, Sách ẩn danh, Chợ sách', () => {
        cy.contains('Cộng đồng', { matchCase: false });
        cy.get('.ant-menu-title-content').contains('Sách', { matchCase: false }).realHover('mouse');
        //Các mục trong menu Sách
        cy.contains('Kho sách', { matchCase: false });
        cy.contains('Sách yêu thích', { matchCase: false });
        cy.contains('Sách ẩn danh', { matchCase: false });
        cy.contains('Chợ sách', { matchCase: false });

    });
    it('Có thể chuyển hướng tới trang Chợ sách khi ấn nút trên Navbar', () => {
        cy.get('.ant-menu-title-content').contains('Sách', { matchCase: false }).realHover('mouse');
        //Các mục trong menu Sách
        cy.contains('Chợ sách', { matchCase: false });
        cy.get('div').contains('Chợ sách').click();
        cy.url().should('include', '/books/market');
    });

    it('Có thể chuyển hướng tới trang Sách ẩn danh khi ấn nút trên Navbar', () => {
        cy.get('.ant-menu-title-content').contains('Sách', { matchCase: false }).realHover('mouse');
        //Các mục trong menu Sách
        cy.contains('Sách ẩn danh', { matchCase: false });
        cy.get('div').contains('Sách ẩn danh').click();
        cy.url().should('include', '/books/hidden-book');
    });

    it('Có thể chuyển hướng tới trang Sách yêu thích khi ấn nút trên Navbar', () => {
        cy.get('.ant-menu-title-content').contains('Sách', { matchCase: false }).realHover('mouse');
        //Các mục trong menu Sách
        cy.contains('Sách yêu thích', { matchCase: false });
        cy.get('div').contains('Sách yêu thích').click();
        cy.url().should('include', '/books/book-rank');
    });

    it('Có thể chuyển hướng tới trang Kho sách khi ấn nút trên Navbar', () => {
        cy.get('.ant-menu-title-content').contains('Sách', { matchCase: false }).realHover('mouse');
        //Các mục trong menu Sách
        cy.contains('Kho sách', { matchCase: false }).click();
        // cy.get('.ant-menu-title-content').contains('Sách', { matchCase: false }).realHover('mouse').get('div').contains('Kho sách').click();
        cy.url().should('include', '/my-bookshelf');
    });


    it('Có thể chuyển hướng tới trang Kho sách khi ấn nút trên Navbar', () => {
        cy.get('.ant-menu-title-content').contains('Sách', { matchCase: false }).realHover('mouse');
        //Các mục trong menu Sách
        cy.contains('Kho sách', { matchCase: false }).click();
        // cy.get('.ant-menu-title-content').contains('Sách', { matchCase: false }).realHover('mouse').get('div').contains('Kho sách').click();
        cy.url().should('include', '/my-bookshelf');
    });

    it('Tạo comment không nest', () => {
        cy.get('input[placeholder="Viết bình luận"]').first().type('a')
        cy.intercept('POST', '/api/comment', {
            statusCode: 200,
            fixture: 'comment/comment_success.json',
        }).as('commentPost');
        cy.get('.anticon.anticon-send').first().click()

    });

    it('Tạo comment nest', () => {
        cy.get('#button-open-comment').first().click()
        cy.get('.ant-comment-actions').first().contains('Phản hồi').click()

        cy.get('#input-create-nest-comment').first().click().type('test nest comment')
        cy.intercept('POST', '/api/comment', {
            statusCode: 200,
            fixture: 'comment/comment_success.json',
        }).as('commentPost');
        cy.contains('Tạo comment').click()

    });

    it('Search book và chuyển sang màn list sách tìm kiếm', () => {
        cy.get('input[placeholder="Nhập tên sách"]').first().type('The girl')

        cy.intercept('GET', '/api/book/The%20girl?page=0&size=5', {
            statusCode: 200,
            fixture: 'book/search_book_by_text.json',
        }).as('search_book_by_text');

        cy.intercept('GET', '/api/book/search/1', {
            statusCode: 200,
            fixture: 'book/search_book_by_id_1.json',
        }).as('search_book_by_text');

        cy.intercept('GET', '/api/questions/scoring/top?idBook=1', {
            statusCode: 200,
            fixture: 'book/get_top_scoring_book_id_1.json',
        }).as('search_book_by_text');
        cy.get('.ant-select-dropdown .ant-select-item-option').first().click()
    });
});
