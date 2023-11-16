import { BaseEntity } from "./base/baseEntity";
export class BookEntity extends BaseEntity {
    constructor({ id, name, numberPages, publisher, publishDate, introducing, urlPoster, scoring, authorId, authorName, genres }) {
        super();
        this.id = id;
        this.name = name;
        this.numberPages = numberPages;
        this.publisher = publisher;
        this.publishDate = publishDate;
        this.introducing = introducing;
        this.urlPoster = urlPoster;
        this.scoring = scoring ? scoring : 0;
        this.authorId = authorId;
        this.authorName = authorName;
        this.genres = genres;
    }
}
