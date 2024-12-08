"use client";
import DateTopbar from "./components/DateTopbar/DateTopbar";
import SingleTask from "./components/SingleTask/SingleTask";
import { useEffect, useMemo, useState } from "react";
import { todoStore } from "@/store/todoStore";
import moment from "moment";

export default function Home() {
  const [showmodal, setShowModal] = useState(false);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const { todos, addTask, currentSeletedDate } = todoStore();

  const TasksOfCurrentDate = useMemo(() => todos.filter(task => task.date === currentSeletedDate), [currentSeletedDate, todos])
 
  const handleAddTask = () => {
    addTask(task, description)
    setTask('')
    setDescription('')
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col bg-zinc-100 h-full w-[580px] mx-auto">
        {/* Top bar for dates */}
        <DateTopbar />

        <div className="px-9 text-lg mb-4 mt-3 font-semibold">{moment(currentSeletedDate).format('dddd') === moment().format('dddd') ? 'Today' : moment(currentSeletedDate).format('dddd')}</div>

        {/* Tasks */}
        <div className="px-9 flex-1 overflow-auto flex flex-col space-y-4">
          {TasksOfCurrentDate.map((task) => <SingleTask
            key={task.id}
            Task={task}
          />)}
        </div>

        {/* add task btn */}
        <div className="flex justify-center item-center py-2">
          <div
            onClick={() => setShowModal(true)}
            className="text-2xl cursor-pointer rounded-full h-12 w-12 bg-white shadow-lg flex justify-center items-center"
          >
            +
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
                  <svg
                    fill="#000000"
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                    id="cross"
                    data-name="Line Color"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon line-color"
                  >
                    <line
                      id="primary"
                      x1="19"
                      y1="19"
                      x2="5"
                      y2="5"
                      style={{
                        fill: "none",
                        stroke: "rgb(0, 0, 0)",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    ></line>
                    <line
                      id="primary-2"
                      data-name="primary"
                      x1="19"
                      y1="5"
                      x2="5"
                      y2="19"
                      style={{
                        fill: "none",
                        stroke: "rgb(0, 0, 0)",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    ></line>
                  </svg>
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
