import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import apiClient from '../../api/api-client';
import { Project, EntityType } from '@multi-tenant/shared-types';
import { useMetadata } from '../hooks/useMetadata';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Clock, 
  CheckCircle2, 
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { statuses: projectStatuses } = useMetadata(EntityType.PROJECT);

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
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Hi, {user?.fullName.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Welcome back! Here is a summary of your corporate projects.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-slate-200 active:scale-95 group">
          <Plus size={20} className="stroke-[3]" />
          Create Project
          <ArrowRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-wrap items-center justify-between bg-slate-50/30 gap-4">
          <h3 className="font-black text-slate-800 flex items-center gap-2 text-lg">
            Recent Projects
            <span className="px-2.5 py-0.5 bg-slate-200 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-tighter">{projects.length}</span>
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search projects by name..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-8 py-5">Project Identification</th>
                <th className="px-8 py-5">Current Status</th>
                <th className="px-8 py-5">Execution Progress</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                       <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Synchronizing Pipeline...</p>
                    </div>
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center text-slate-400 font-bold italic uppercase tracking-widest text-xs">
                    No active projects detected for this enclave.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg group-hover:bg-primary-600 transition-colors">
                          {project.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight text-base leading-tight">{project.name}</p>
                          <p className="text-xs text-slate-400 font-medium truncate max-w-[200px] mt-0.5">{project.description || 'No project description provided'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {project.status ? (
                        <span 
                          className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest"
                          style={{ 
                            backgroundColor: `${project.status.color}15`, 
                            color: project.status.color,
                            border: `1px solid ${project.status.color}30`
                          }}
                        >
                          {project.status.name}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                          Not Defined
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1.5">
                         <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                            <span>Completeness</span>
                            <span>66%</span>
                         </div>
                         <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="w-2/3 h-full bg-primary-500 rounded-full" />
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 text-slate-300 hover:text-slate-900 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                        <MoreVertical size={20} />
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
