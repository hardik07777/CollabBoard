export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Board {
  _id: string;
  name: string;
  role: "owner" | "admin" | "member";
}

export interface List {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

// export interface Task {
//   _id: string;
//   title: string;
//   description?: string;
//   listId: string;
//   order: number;
//   assignee?: User;
// }
export interface Task {
  _id: string;
  title: string;
  description?: string;
  list: string;
  board: string;
  order: number;
  assignedTo?: string;
}

export interface Activity {
  _id: string;
  action: string;
  meta?: any;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}
