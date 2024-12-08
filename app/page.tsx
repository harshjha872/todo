"use client";
import DateTopbar from "./components/DateTopbar/DateTopbar";
import SingleTask from "./components/SingleTask/SingleTask";
import { useEffect, useMemo, useState } from "react";
import { iTodoStore, todoStore } from "@/store/todoStore";
import moment from "moment";
import { CircleX, Plus } from 'lucide-react'
import useStore from "@/store/useStore";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  },[])
  
  const [showmodal, setShowModal] = useState(false);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const todos = todoStore((state) => state.todos);
  const addTask = todoStore((state) => state.addTask) 
  const currentSeletedDate = todoStore((state) => state.currentSeletedDate);

  const TasksOfCurrentDate = useMemo(() => todos.filter(task => task.date === currentSeletedDate), [currentSeletedDate, todos])
 
  const handleAddTask = () => {
    addTask(task, description)
    setTask('')
    setDescription('')
  };

  return (
    isClient && <div className="w-screen h-screen py-4">
    <div className="flex flex-col flex-1 bg-zinc-50 h-full max-w-[580px] mx-auto rounded-3xl">
      {/* Top bar for dates */}
      <DateTopbar />

      <div className="px-9 text-md my-4 font-bold">{moment(currentSeletedDate).format('dddd') === moment().format('dddd') ? 'Today' : moment(currentSeletedDate).format('dddd')}</div>

      {/* Tasks */}
      <div className="px-9 flex-1 overflow-y-auto flex flex-col space-y-4">
        {TasksOfCurrentDate.map((task) => <SingleTask
          key={task.id}
          Task={task}
        />)}
      </div>

      {/* add task btn */}
      <div className="flex justify-center item-center py-4">
        <div
          onClick={() => setShowModal(true)}
          className="text-2xl cursor-pointer rounded-full h-12 w-12 bg-white shadow-lg flex justify-center items-center"
        >
          <Plus />
        </div>
      </div>

      {/* add task modal */}
      {showmodal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">Add task</h2>
              <button
                onClick={() => setShowModal(false)}
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
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
            {showWarning && (
              <div className="text-red-600 text-xs">task cannot be empty</div>
            )}
            <div className="my-2">Description</div>
            <input
              className="border rounded-md w-full  px-2 py-1"
              placeholder="Add description..."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => {
                  if (task === "") {
                    setShowWarning(true);
                  } else {
                    handleAddTask();
                    setShowWarning(false);
                    setShowModal(false);
                  }
                }}
                className="px-4 py-1 bg-zinc-100  rounded hover:bg-zinc-200"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}
