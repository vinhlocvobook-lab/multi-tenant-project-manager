import React from 'react';
import { Task, StatusDefinition, PriorityDefinition } from '@multi-tenant/shared-types';
import { MoreVertical, MessageSquare, Paperclip, Calendar } from 'lucide-react';

interface KanbanBoardProps {
  tasks: Task[];
  statuses: StatusDefinition[];
  priorities: PriorityDefinition[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, statuses, priorities }) => {
  const getTasksByStatus = (statusId: string) => {
    return tasks.filter((task) => task.statusId === statusId);
  };

  const getPriorityColor = (priorityId: string) => {
    return priorities.find((p) => p.id === priorityId)?.color || '#94A3B8';
  };

  const getPriorityName = (priorityId: string) => {
    return priorities.find((p) => p.id === priorityId)?.name || 'Medium';
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 h-full min-h-[600px]">
      {statuses.map((status) => (
        <div key={status.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
          {/* Column Header */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: status.color }} 
              />
              <h3 className="font-bold text-slate-700 uppercase tracking-wider text-sm">
                {status.name}
              </h3>
              <span className="ml-1 px-2 py-0.5 bg-slate-200 text-slate-500 text-xs font-bold rounded-full">
                {getTasksByStatus(status.id).length}
              </span>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              <MoreVertical size={16} />
            </button>
          </div>

          {/* Cards Container */}
          <div className="flex-1 flex flex-col gap-3 p-2 bg-slate-100/50 rounded-2xl border border-slate-200/50 min-h-[200px]">
            {getTasksByStatus(status.id).map((task) => (
              <div 
                key={task.id} 
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-primary-200 transition-all cursor-pointer group"
              >
                {/* Task Meta (Project/Priority) */}
                <div className="flex items-center justify-between mb-2">
                  <span 
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ 
                      backgroundColor: `${getPriorityColor(task.priorityId)}15`, 
                      color: getPriorityColor(task.priorityId) 
                    }}
                  >
                    {getPriorityName(task.priorityId)}
                  </span>
                  {task.projectId && (
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate max-w-[100px]">
                      Project ID: {task.projectId.split('-')[0]}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="font-bold text-slate-800 group-hover:text-primary-600 transition-colors leading-snug mb-3">
                  {task.title}
                </h4>

                {/* Footer Info */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="flex items-center gap-1 text-[11px] font-medium">
                      <MessageSquare size={13} />
                      <span>2</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-medium">
                      <Paperclip size={13} />
                      <span>1</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {task.dueDate && (
                       <div className="flex items-center gap-1 text-[11px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">
                          <Calendar size={12} />
                          <span>Mar 31</span>
                       </div>
                    )}
                    <div className="w-6 h-6 bg-slate-100 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                      {task.assigneeId ? 'JD' : '?'}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Add Placeholder */}
            <button className="py-2 px-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm font-bold hover:bg-white hover:border-primary-300 hover:text-primary-500 transition-all">
              + Add Task
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
