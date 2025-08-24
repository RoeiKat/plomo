import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from "../features/kanban/kanbanSlice";
import { saveState, loadState } from "../utils/storage";

const reducer = { kanban: kanbanReducer };
export type RootState = { kanban: ReturnType<typeof kanbanReducer> };

// Load, and ensure the shape is correct before using it
const preloaded = (() => {
  const s = loadState<RootState>();
  return s && typeof s === "object" && "kanban" in s ? s : undefined;
})();

export const store = configureStore({
  reducer,
  preloadedState: preloaded, // undefined is fine; null is NOT
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
