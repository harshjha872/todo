import React, { useState } from "react";
import { todoStore } from "@/store/todoStore";
import { NotebookPen, CircleX, Trash2 } from "lucide-react";
import useStore from "@/store/useStore";
import { iTodoStore } from "@/store/todoStore";

export interface Task {
  id: string;
  task: string;
  description: string;
  isCompleted: boolean;
  date: string;
}

const SingleTask = ({ Task }: { Task: Task }) => {
  const [infoModal, setInfoModal] = useState(false);
  const [showWarning, setshowWarning] = useState(false);
  const [editTaskInput, seteditTaskInput] = useState(Task.task);
  const [editDescription, setEditDescription] = useState(Task.description);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleTask = todoStore((state:iTodoStore) => state.toggleTask) 
  const editTask = todoStore((state:iTodoStore) => state.editTask) 
  const deleteTask = todoStore((state:iTodoStore) => state.deleteTask) 

  const handleEditTaskUpdate = () => {
    editTask(Task.id, editTaskInput, editDescription);
  };

  const handleDeleteTask = () => {
    deleteTask(Task.id);
  };

  return (
    <div className="flex bg-white py-3 px-4 rounded-xl shadow-sm group">
      <label className="mt-1 w-[24px] cursor-pointer relative">
        <input
          checked={Task.isCompleted}
          onChange={() => toggleTask(Task.id)}
          type="checkbox"
          className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded-full bg-slate-100 shadow hover:shadow-md border border-slate-300 checked:bg-zinc-800 checked:border-zinc-800"
          id="check-custom-style"
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-0 left-0 transform mt-[5px] ml-[5px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>

      <div className="ml-4 flex-1 overflow-hidden text-ellipsis">
        <div
          className={`font-bold text-lg overflow-hidden text-ellipsis ${
            Task.isCompleted ? "line-through text-gray-500" : ""
          }`}
        >
          {Task.task}
        </div>
        <div className="text-[15px] text-zinc-600 mt-1">{Task.description}</div>
      </div>
      <div className="flex w-[68px] justify-center items-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="hover:bg-zinc-100 p-2 rounded-full">
          <NotebookPen onClick={() => setInfoModal(true)} size={18} />
        </div>
        <div className="hover:bg-red-100 p-2 rounded-full">
          <Trash2 size={18} onClick={() => setDeleteModal(true)} color="red" />
        </div>
      </div>

      {/* Edt task modal */}
      {infoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">Edit task</h2>
              <button
                onClick={() => setInfoModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <CircleX />
              </button>
            </div>

            <div className="my-2">Task*</div>
            <input
              required
              className="border rounded-md w-full px-2 py-1"
              placeholder="Add task here..."
              onChange={(e) => seteditTaskInput(e.target.value)}
              value={editTaskInput}
            />
            {showWarning && (
              <div className="text-red-600 text-xs">task cannot be empty</div>
            )}
            <div className="my-2">Description</div>
            <input
              className="border rounded-md w-full  px-2 py-1"
              placeholder="Add description..."
              onChange={(e) => setEditDescription(e.target.value)}
              value={editDescription}
            />

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => {
                  if (editTaskInput === "") {
                    setshowWarning(true);
                  } else {
                    handleEditTaskUpdate();
                    setshowWarning(false);
                    setInfoModal(false);
                  }
                }}
                className="px-4 py-1 bg-zinc-100  rounded hover:bg-zinc-200"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete task Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">Delete task</h2>
              <button
                onClick={() => setDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <CircleX />
              </button>
            </div>

            <div className="text-xl mt-6">
              Are you sure you want to delete this task?
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => handleDeleteTask()}
                className="px-4 py-1 bg-red-100  rounded hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleTask;
