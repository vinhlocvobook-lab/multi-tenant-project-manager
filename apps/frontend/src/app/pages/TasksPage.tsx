import React, { useState, useEffect } from 'react';
import { useMetadata } from '../hooks/useMetadata';
import apiClient from '../../api/api-client';
import { Task, EntityType } from '@multi-tenant/shared-types';
import KanbanBoard from '../components/KanbanBoard';
import { 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List as TableIcon,
  ChevronDown,
  RefreshCw
} from 'lucide-react';
import { PermissionGate } from '../../components/auth/PermissionGate';

const TasksPage: React.FC = () => {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { statuses, priorities, isLoading: metadataLoading, error: metadataError } = useMetadata(EntityType.TASK);

  const fetchTasks = async () => {
    setIsRefreshing(true);
    try {
      const response = await apiClient.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (metadataLoading && tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="text-slate-500 font-medium animate-pulse">Initializing Board...</p>
      </div>
    );
  }

  if (metadataError) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-red-700 font-medium">
        Error loading metadata: {metadataError}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            Tasks Management
            <button 
              onClick={fetchTasks}
              className={`p-1.5 text-slate-400 hover:text-primary-600 rounded-full hover:bg-primary-50 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCw size={18} />
            </button>
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage, track and collaborate on all your tenant tasks.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* View Switcher */}
          <div className="bg-slate-200/50 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
            <button 
              onClick={() => setView('kanban')}
              className={`p-2 rounded-lg transition-all ${view === 'kanban' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <TableIcon size={18} />
            </button>
          </div>
          
          <PermissionGate permission="tasks:create">
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary-100 hover:-translate-y-0.5 active:scale-95">
              <Plus size={20} className="stroke-[3]" />
              New Task
            </button>
          </PermissionGate>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Quick search by task title or project..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
              <Filter size={16} />
              Filters
              <span className="ml-1 w-5 h-5 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-[10px]">2</span>
           </button>
           
           <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
              Sort by
              <ChevronDown size={16} />
           </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 min-h-0">
        {view === 'kanban' ? (
          <KanbanBoard tasks={tasks} statuses={statuses} priorities={priorities} />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center text-slate-400 font-medium italic">
            List View is under development...
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
