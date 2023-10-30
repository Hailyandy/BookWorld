export class BookEntity {
    constructor({ id, name, numberPages, publisher, publishDate, introducing, urlPoster, scoring, authorId, authorName, genres }) {
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
