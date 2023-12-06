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
        cy.contains('Sách', { matchCase: false }).click();
        //Các mục trong menu Sách
        cy.contains('Kho sách', { matchCase: false });
        cy.contains('Sách yêu thích', { matchCase: false });
        cy.contains('Sách ẩn danh', { matchCase: false });
        cy.contains('Chợ sách', { matchCase: false });

    });
    it('Có thể chuyển hướng tới trang Chợ sách khi ấn nút trên Navbar', () => {
        cy.contains('Sách', { matchCase: false }).click();
        //Các mục trong menu Sách
        cy.contains('Chợ sách', { matchCase: false });
        cy.get('div').contains('Chợ sách').click();
        cy.url().should('include', '/books/market');
    });

    it('Có thể chuyển hướng tới trang Sách ẩn danh khi ấn nút trên Navbar', () => {
        cy.contains('Sách', { matchCase: false }).click();
        //Các mục trong menu Sách
        cy.contains('Sách ẩn danh', { matchCase: false });
        cy.get('div').contains('Sách ẩn danh').click();
        cy.url().should('include', '/books/hidden-book');
    });

    it('Có thể chuyển hướng tới trang Sách yêu thích khi ấn nút trên Navbar', () => {
        cy.contains('Sách', { matchCase: false }).click();
        //Các mục trong menu Sách
        cy.contains('Sách yêu thích', { matchCase: false });
        cy.get('div').contains('Sách yêu thích').click();
        cy.url().should('include', '/books/book-rank');
    });

    it('Có thể chuyển hướng tới trang Kho sách khi ấn nút trên Navbar', () => {
        cy.contains('Sách', { matchCase: false }).click();
        //Các mục trong menu Sách
        cy.contains('Kho sách', { matchCase: false });
        cy.get('div').contains('Kho sách').click();
        cy.url().should('include', '/users/my-bookshelf');
    });
});
