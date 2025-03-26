"use client";

import { Provider } from "react-redux";
import { store } from "@/states/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/states/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <PersistGate loading={null} persistor={persistor}><Provider store={store}>{children}</Provider></PersistGate>;
}
