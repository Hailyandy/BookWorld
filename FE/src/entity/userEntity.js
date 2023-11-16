import { BaseEntity } from "./base/baseEntity";
export class UserEntity extends BaseEntity {
    constructor({ friendship, id, username, name, email, phone, birthDate, urlAvatar, address, enabled }) {
        super();
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.birthDate = birthDate;
        this.urlAvatar = urlAvatar;
        this.address = address;
        this.enabled = enabled;
        this.friendship = friendship;
    }
}
