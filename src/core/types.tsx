import { type MRT_ColumnDef } from 'material-react-table';

export interface Fields {
  login: string
  password: string
}

export interface Task {
  id: number
  title: string
  completed: string
}

export interface CreateModalProps {
  columns: MRT_ColumnDef<Task>[];
  onClose: () => void;
  onSubmit: (values: Task) => void;
  open: boolean;
}