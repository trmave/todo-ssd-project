import React from 'react';
import type { Todo } from '../api';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/10 p-4 rounded-xl flex items-center justify-between group hover:bg-[var(--color-surface-container)] transition-colors">
      <div className="flex items-center gap-4">
        {todo.completed ? (
          <div 
            onClick={() => onToggle(todo.id, false)}
            className="w-6 h-6 rounded border-2 border-[var(--color-secondary)] flex items-center justify-center bg-[var(--color-secondary)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[var(--color-on-secondary)] text-sm font-bold">check</span>
          </div>
        ) : (
          <div 
            onClick={() => onToggle(todo.id, true)}
            className="w-6 h-6 rounded border-2 border-[var(--color-outline-variant)]/40 flex items-center justify-center hover:border-[var(--color-primary)] transition-colors cursor-pointer"
          >
          </div>
        )}
        
        <div>
          <span className={`font-body text-sm ${todo.completed ? 'text-[var(--color-on-surface-variant)] line-through' : 'text-[var(--color-on-surface)]'}`}>
            {todo.title}
          </span>
          {todo.description && (
            <p className="text-[var(--color-on-surface-variant)] text-xs mt-0.5 max-w-sm truncate">{todo.description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onDelete(todo.id)} className="text-[var(--color-on-surface-variant)]/30 hover:text-[var(--color-error)] transition-colors" title="Delete">
          <span className="material-symbols-outlined text-xl">delete</span>
        </button>
      </div>
    </div>
  );
};

