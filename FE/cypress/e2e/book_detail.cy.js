describe('Spec màn hình book detail, thêm file pdf và làm bài trắc nghiệm', () => {
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
    it('Vào được màn detail của quyển sách có id là 1', () => { });
    it('Làm bài trắc nghiệm của quyển sách có id là 1', () => {
        cy.intercept('GET', '/api/questions?idBook=1', {
            statusCode: 200,
            fixture: 'book/question_book_id_1.json',
        }).as('search_question_book_id_1');
        cy.contains('Làm bài trắc nghiệm').first().click()

        const NUM_CLICKS = 3;
        cy.intercept('PUT', '/api/questions', {
            statusCode: 200,
            fixture: 'book/scoring_after_finish_test_book_id_1.json',
        }).as('scoring_after_finish_test_book_id_1');
        for (let i = 0; i < NUM_CLICKS; i++) {

            cy.get('.answerOption').first().click()

            if (i < NUM_CLICKS - 1) {
                cy.wait(500) // wait 500ms
            }

        }

        cy.get('.answerOption').first().click()
        cy.get('.answerOption').first().click()
    });

    it('Upload file pdf', () => {
        cy.fixture('aacF81H_TsWnBfNR_x7FIg_36299b28fa0c4a5aba836111daad12f1_DAC8-Case-Study-1.pdf').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'aacF81H_TsWnBfNR_x7FIg_36299b28fa0c4a5aba836111daad12f1_DAC8-Case-Study-1.pdf',
                mimeType: 'pdf'
            });
        });
        cy.intercept('POST', '/api/pdf', {
            statusCode: 200,
            fixture: 'comment/comment_success.json',
        }).as('scoring_after_finish_test_book_id_1');
    });

    it('Báo cáo file pdf', () => {
        cy.contains('Báo cáo file pdf').first().click()
        cy.get('#basic_reason').first({ force: true }).type('File xau', { force: true })
        cy.get('#basic_description').first({ force: true }).type('Phong Chu xau qua', { force: true })
        cy.intercept('POST', '/api/pdf/report', {
            statusCode: 200,
            fixture: 'comment/comment_success.json',
        }).as('create_pdf_report');
        cy.contains('Tạo báo cáo').click({ force: true })
    });
})
