import { BaseEntity } from "./base/baseEntity";
export class PostEntity extends BaseEntity {
    constructor({ id, bookId, pdfId, userId, scoring, content, totalLike, totalComment, createdOn, lastUpdatedOn, likes, comments }) {
        super();
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
