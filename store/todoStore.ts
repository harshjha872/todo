import { create } from "zustand";
import moment from "moment";

export interface Task {
    id:string
    task:string
    description:string
    isCompleted: boolean
    date: string
}

export interface iTodoStore {
  todos: Array<Task>;
  currentSeletedDate: string;
  addTask: (task: string, description: string, date: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export const todoStore = create<iTodoStore>((set) => ({
  todos: [],
  currentSeletedDate: moment().format('YYYY-MM-DD'),
  addTask: (task, description, date) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: uid(), task, description, isCompleted: false, date: date },
      ],
    })),
  toggleTask: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({ todos: state.todos.filter((task) => task.id !== id) })),
}));

//generate unique Id
const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
