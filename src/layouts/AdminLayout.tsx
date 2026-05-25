import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Settings as SettingsIcon, LogOut } from "lucide-react";
import { Dashboard } from "../pages/admin/Dashboard";
import { BlogManager } from "../pages/admin/BlogManager";
import { BlogEdit } from "../pages/admin/BlogEdit";
import { Settings } from "../pages/admin/Settings";
import { AdminGuard } from "../components/AdminGuard";
import { logout } from "@/lib/firebase";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
    navigate('/');
  };

  return (
    <AdminGuard>
      <div className="bg-[#0A0A0A] min-h-screen font-manrope text-white flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#111] border-r border-white/10 flex flex-col h-screen sticky top-0">
          <div className="p-6 border-b border-white/5">
            <div className="text-xl font-syne font-black tracking-tighter uppercase text-white">
              Admin<span className="text-cyber">.</span>Panel
            </div>
          </div>
          
          <nav className="flex-1 flex flex-col gap-2 p-4">
            <Link 
              to="/admin" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${isActive('/admin') ? 'bg-cyber/10 text-cyber font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link 
              to="/admin/blog" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${isActive('/admin/blog') ? 'bg-cyber/10 text-cyber font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              <FileText size={18} />
              Blog Posts
            </Link>
            <Link 
              to="/admin/settings" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${isActive('/admin/settings') ? 'bg-cyber/10 text-cyber font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              <SettingsIcon size={18} />
              Site Settings
            </Link>
          </nav>

          <div className="p-4 border-t border-white/5">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors">
              <LogOut size={18} />
              Exit Admin
            </button>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto w-full p-8 md:p-12 h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/blog" element={<BlogManager />} />
            <Route path="/blog/new" element={<BlogEdit />} />
            <Route path="/blog/:id" element={<BlogEdit />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </AdminGuard>
  );
}
