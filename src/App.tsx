import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MainLayout } from "./layouts/MainLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { useEffect } from "react";
import { initializeFirebaseSync, useStore } from "@/store/useStore";
import { Loader2 } from "lucide-react";

function App() {
  const isLoading = useStore((state) => state.isLoading);

  useEffect(() => {
    const cleanup = initializeFirebaseSync();
    return () => cleanup();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-cyber mb-4" />
        <p className="text-white/50 text-sm font-manrope">Loading system...</p>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
