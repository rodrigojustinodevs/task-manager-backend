import { Status } from '@prisma/client';

export class Task {
    constructor(
        public id: string,
        public title: string,
        public descript: string | null,
        public userId: string,
        public status?: Status,
    ) {}
}
