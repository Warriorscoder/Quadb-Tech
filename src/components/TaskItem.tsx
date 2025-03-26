"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchAiSuggestions } from "@/features/taskSlice";
import { RootState, AppDispatch } from "@/states/store";

interface TaskProps {
  id: string;
  text: string;
  category: string;
  userId: string;
}

const TaskItem: React.FC<TaskProps> = ({ id, text, category, userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const task = useSelector((state: RootState) => state.tasks.tasks.find((task) => task.id === id));
  const isLoading = !task?.suggestions?.length;

  const handleDelete = () => {
    dispatch(deleteTask({ category, id, userId }));
  };

  const handleAskAI = () => {
    dispatch(fetchAiSuggestions(text));
    setShowSuggestions(true);
  };

  return (
    <li className="bg-gray-100 px-4 py-2 mb-2 rounded shadow flex flex-col">
      <div className="flex justify-between items-center">
        <span className="font-semibold">{text}</span>
        <div className="flex gap-2">
          <button onClick={handleAskAI} className="bg-blue-500 text-white px-3 py-1 rounded">
            Ask AI
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
            Delete
          </button>
        </div>
      </div>

      
      {showSuggestions && (
        <div className="mt-2 bg-gray-200 p-2 rounded">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm">AI Suggestions:</h3>
            <button
              onClick={() => setShowSuggestions(false)} 
              className="text-xs text-gray-600 underline"
            >
              Close
            </button>
          </div>
          <ul className="list-disc pl-4 text-sm mt-1">
            {isLoading ? (
              <li>Loading...</li>
            ) : (
              task?.suggestions?.map((suggestion, index) => <li key={index}>{suggestion}</li>)
            )}
          </ul>
        </div>
      )}
    </li>

  );
};

export default TaskItem;
