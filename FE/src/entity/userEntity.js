export class UserEntity {
    constructor({ id, username, name, email, phone, birthDate, urlAvatar, address, enabled }) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.birthDate = birthDate;
        this.urlAvatar = urlAvatar;
        this.address = address;
        this.enabled = enabled;
    }
}
