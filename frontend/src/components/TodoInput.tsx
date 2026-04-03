import React, { useState } from 'react';
import type { TodoInput as TodoInputType } from '../api';

interface TodoInputProps {
  onAdd: (todo: TodoInputType) => Promise<void>;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onAdd({ title: title.trim(), description: description.trim() || undefined });
      setTitle('');
      setDescription('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative group rounded-xl">
        <div className="absolute inset-0 bg-[var(--color-primary-container)]/5 blur-xl group-focus-within:bg-[var(--color-primary-container)]/10 transition-all duration-500 rounded-xl"></div>
        <div className="relative flex items-center bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)]/20 rounded-xl p-1.5 focus-within:border-[var(--color-primary)]/50 transition-all">
          <div className="flex-1 flex flex-col">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's on your farm today?"
              required
              className="w-full bg-transparent border-none outline-none focus:ring-0 text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-variant)]/50 px-4 py-3 text-sm font-body"
            />
            {title && (
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details (optional)"
                className="w-full bg-transparent border-none outline-none focus:ring-0 text-[var(--color-on-surface)]/70 placeholder:text-[var(--color-on-surface-variant)]/30 px-4 pb-2 text-xs font-body"
              />
            )}
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting || !title.trim()}
            className="bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] px-6 py-3 rounded-lg font-headline font-bold text-sm tracking-tight glow-primary active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:active:scale-100"
          >
            <span>{isSubmitting ? '...' : 'CREATE'}</span>
            {!isSubmitting && <span className="material-symbols-outlined text-xs">add</span>}
          </button>
        </div>
      </div>
    </form>
  );
};
