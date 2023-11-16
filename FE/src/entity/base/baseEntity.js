import { generateUuid } from "~/helper/format";
export class BaseEntity {
    constructor() {
        this.key = generateUuid();
    }
}
