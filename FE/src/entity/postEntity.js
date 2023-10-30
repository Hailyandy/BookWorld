export class PostEntity {
    constructor({ id, bookId, pdfId, userId, scoring, content, totalLike, totalComment, createdOn, lastUpdatedOn, likes, comments }) {
        this.id = id;
        this.bookId = bookId;
        this.pdfId = pdfId;
        this.userId = userId;
        this.scoring = scoring;
        this.content = content;
        this.totalLike = totalLike;
        this.totalComment = totalComment;
        this.createdOn = createdOn;
        this.lastUpdatedOn = lastUpdatedOn;
        this.likes = likes;
        this.comments = comments;
    }
}
