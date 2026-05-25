import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { BlogList } from "./pages/BlogList";
import { BlogPost } from "./pages/BlogPost";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen selection:bg-cyber/30 selection:text-white font-manrope overflow-x-hidden relative flex flex-col items-center w-full">
        {/* Video Background */}
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <Header />
        
        <div className="flex-grow w-full flex flex-col items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
