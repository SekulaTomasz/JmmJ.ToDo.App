import { Status } from '../enum/Status';
import { Priority } from '../enum/Priority';

export interface Task {
    id?: any;
    title?: string;
    description?: string;
    expectedEndDate?: Date;
    status?: Status;
    priority?: Priority;
}
