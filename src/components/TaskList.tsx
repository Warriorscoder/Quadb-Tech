"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/states/store";
import { createTask, deleteCategory } from "@/features/taskSlice";
import TaskItem from "./TaskItem";

interface TaskListProps {
  title: string;
}

const TaskList: React.FC<TaskListProps> = ({ title }) => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  
  const tasks = useSelector((state: RootState) =>
    state.tasks.tasks.filter((task) => task.category === title && task.userId === user.email)
  );

  const handleAddTask = () => {
    if (task.trim() === "" || !user.email) return;
    dispatch(createTask({ text: task, category: title, userId: user.email }));
    setTask("");
  };

  const handleDeleteCategory = () => {
    dispatch(deleteCategory({ category: title, userId: user.email }));
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-lg mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <button onClick={handleDeleteCategory} className="cursor-pointer text-red-500 text-sm">
          Delete Category
        </button>
      </div>

     
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter new task..."
          className="flex-1 border p-2 rounded-md"
        />
        <button onClick={handleAddTask} className="bg-green-500 text-white px-4 py-2 rounded-md">
          Add
        </button>
      </div>

      
      <ul className="mt-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} text={task.text} category={title} userId={user.email} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
