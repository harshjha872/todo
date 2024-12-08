import { create } from "zustand";
import moment from "moment";
import { Task } from "@/app/components/SingleTask/SingleTask";
import { persist } from "zustand/middleware";

export interface iTodoStore {
  todos: Array<Task>;
  currentSeletedDate: string;
  addTask: (task: string, description: string) => void;
  editTask: (id: string, task: string, description: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setCurrentDate: (date: string) => void;
}

export const todoStore = create<iTodoStore>()(
  persist(
    (set) => ({
      todos: [],
      currentSeletedDate: moment().format("YYYY-MM-DD"),
      addTask: (task:string, description:string) =>
        set((state:iTodoStore) => ({
          todos: [
            ...state.todos,
            {
              id: uid(),
              task,
              description,
              isCompleted: false,
              date: state.currentSeletedDate,
            },
          ],
        })),
      editTask: (id:string, task:string, description:string) =>
        set((state:iTodoStore) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, task, description } : todo
          ),
        })),
      toggleTask: (id:string) =>
        set((state:iTodoStore) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
          ),
        })),
      deleteTask: (id:string) =>
        set((state:iTodoStore) => ({
          todos: state.todos.filter((task) => task.id !== id),
        })),
      setCurrentDate: (date: string) =>
        set((state:iTodoStore) => ({ currentSeletedDate: date })),
    }),
    {
      name: "todoStorage",
    }
  )
);

//generate unique Id
const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
