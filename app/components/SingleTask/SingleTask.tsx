import React from "react";

export interface Task {
  id: string;
  task: string;
  description: string;
  isCompleted: boolean;
  date: string;
}

const SingleTask = ({ Task } : { Task: Task }) => {
  return (
    <div className="flex bg-white py-3 px-4 rounded-xl shadow-sm">
      <input
        className="
        peer relative appearance-none shrink-0 w-5 h-5  border-2 border-zinc-700 rounded-full mt-1 bg-white
        focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-zinc-400
        checked:bg-zinc-900 checked:border-0 
        disabled:border-steel-400 disabled:bg-steel-400
        flex justify-center items-center
      "
        type="checkbox"
        id="checkbox"
      />
      <svg
        className="absolute w-3 h-3 pointer-events-none hidden peer-checked:block stroke-white mt-2 ml-1 outline-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
        <div className="ml-4">
            <div className="font-bold text-lg">{Task.task}</div>
            <div className="text-[15px] text-zinc-600 mt-1">{Task.description}</div>
        </div>
    </div>
  );
};

export default SingleTask;
