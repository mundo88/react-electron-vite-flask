import type { Node,Edge} from 'reactflow';

interface ITask {
    id?: number;
    title?: string;
    platform?: string;
    nodes?: Node[];
    edges?: Edge[];
    is_completed?: boolean;
    created_at?: Date;
    updated_at?: Date;
}
export default ITask;