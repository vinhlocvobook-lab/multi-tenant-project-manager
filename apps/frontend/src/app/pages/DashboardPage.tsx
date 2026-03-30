import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import apiClient from '../../api/api-client';
import { Project } from '@multi-tenant/shared-types';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Clock, 
  CheckCircle2, 
  Activity,
  Layers
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get('/projects');
        setProjects(response.data);
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: Layers, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Active Tasks', value: 12, icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Completed', value: 45, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Overdue', value: 2, icon: Clock, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Hello, {user?.fullName.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Heres whats happening with your projects today.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-slate-200 active:scale-95">
          <Plus size={20} />
          Create Project
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            Recent Projects
            <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-xs rounded-full">{projects.length}</span>
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Project Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tasks</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium">
                    Loading your projects...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium italic">
                    No projects found for this tenant. Create your first one!
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center font-bold">
                          {project.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{project.name}</p>
                          <p className="text-xs text-slate-400 truncate max-w-xs">{project.description || 'No description'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        project.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-slate-100">
                      <div className="flex items-center gap-2">
                         <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="w-2/3 h-full bg-primary-500 rounded-full" />
                         </div>
                         <span className="text-xs font-bold text-slate-400 underline decoration-slate-200 decoration-2 underline-offset-4">66%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
