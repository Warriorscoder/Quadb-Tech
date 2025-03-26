import { createSlice, PayloadAction, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

interface Task {
  id: string; 
  text: string;
  category: string;
  userId: string; 
  suggestions?: string[];
}

interface TaskState {
  tasks: Task[];
  categories: { [userId: string]: string[] }; 
}


const loadFromLocalStorage = (): TaskState => {
  if (typeof window !== "undefined") {
    try {
      const storedData = localStorage.getItem("tasksState");
      return storedData ? JSON.parse(storedData) : { tasks: [], categories: {} };
    } catch (error) {
      console.error("Failed to load from LocalStorage:", error);
      return { tasks: [], categories: {} };
    }
  }
  return { tasks: [], categories: {} };
};


const saveToLocalStorage = (state: TaskState) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("tasksState", JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save to LocalStorage:", error);
    }
  }
};

const initialState: TaskState = loadFromLocalStorage();


export const fetchAiSuggestions = createAsyncThunk(
  "tasks/fetchAiSuggestions",
  async (taskText: string) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: ` Give 3-5 point-wise one-liner no paragraphs or , seperated it should not be in bould letters there should not be any list markers used just newline for new point and direct point no headings suggestions on how to achieve this task: ${taskText}`,
      });

      return { taskText, suggestions: response.text?.split("\n") || [] };
    } catch (error) {
      console.error("AI Error:", error);
      return { taskText, suggestions: ["AI is currently unavailable. Try again later."] };
    }
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
  
    addCategory: (state, action: PayloadAction<{ category: string; userId: string }>) => {
        const { category, userId } = action.payload;
      
    
        const userCategories = state.categories[userId] ?? [];
      
     
        if (!userCategories.includes(category)) {
          state.categories = {
            ...state.categories,
            [userId]: [...userCategories, category],
          };
        }
      
        saveToLocalStorage(state);
      },
      

    
    createTask: (state, action: PayloadAction<{ text: string; category: string; userId: string }>) => {
      state.tasks.push({
        id: nanoid(), 
        text: action.payload.text,
        category: action.payload.category,
        userId: action.payload.userId,
        suggestions: [],
      });

      saveToLocalStorage(state);
    },

   
    deleteTask: (state, action: PayloadAction<{ category: string; id: string; userId: string }>) => {
      state.tasks = state.tasks.filter(
        (task) => !(task.id === action.payload.id && task.category === action.payload.category && task.userId === action.payload.userId)
      );

      saveToLocalStorage(state);
    },

    
    deleteCategory: (state, action: PayloadAction<{ category: string; userId: string }>) => {
      if (state.categories[action.payload.userId]) {
        state.categories[action.payload.userId] = state.categories[action.payload.userId].filter(
          (cat) => cat !== action.payload.category
        );
      }

    
      state.tasks = state.tasks.filter(
        (task) => !(task.category === action.payload.category && task.userId === action.payload.userId)
      );

      saveToLocalStorage(state);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAiSuggestions.fulfilled, (state, action) => {
      const { taskText, suggestions } = action.payload;
      const task = state.tasks.find((task) => task.text === taskText);
      if (task) {
        task.suggestions = suggestions;
        saveToLocalStorage(state);
      }
    });
  },
});

export const { addCategory, createTask, deleteTask, deleteCategory } = taskSlice.actions;
export default taskSlice.reducer;
