import React from 'react';
import { useAuth } from '../../../contexts/auth-context';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Settings, 
  LogOut, 
  User as UserIcon,
  Bell
} from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const AppLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FolderKanban, label: 'Projects', path: '/projects' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">MT</span>
            </div>
            Project Manager
          </h1>
          {user && (
            <p className="mt-2 text-xs text-slate-500 uppercase tracking-widest font-semibold">
              Tenant: {user.id.split('-')[0]} {/* Temporary tenant ID display */}
            </p>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-slate-800">
            {/* Page title would go here */}
          </h2>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-primary-600 rounded-lg">
              <Bell size={20} />
            </button>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{user?.fullName}</p>
                <p className="text-xs text-slate-500">{user?.role?.name}</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <UserIcon size={24} />
              </div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
