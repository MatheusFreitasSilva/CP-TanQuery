import React from "react";
import Index from "./src/Index";
import QueryClientProvider from "./src/QueryClientProvider";

export default function App() {
  return (
    <QueryClientProvider>
      <Index />
    </QueryClientProvider>
  );
}
