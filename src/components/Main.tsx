"use client";

import React, { useState } from "react";
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/states/store";
import { addCategory } from "@/features/taskSlice";

const Main = () => {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const categories = useSelector((state: RootState) => state.tasks.categories[user.email] || []);

  const handleAddCategory = () => {
    if (categoryName.trim() === "" || categories.includes(categoryName) || !user.email) return;

    dispatch(addCategory({ category: categoryName, userId: user.email }));
    setCategoryName(""); 
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Create a New Category</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name..."
            className="flex-1 border p-2 rounded-md"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>
      </div>

      
      {categories.map((category) => (
        <TaskList key={category} title={category} />
      ))}
    </div>
  );
};

export default Main;
