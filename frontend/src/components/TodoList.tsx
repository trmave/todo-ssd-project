import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api';
import type { Todo, TodoInput as TodoInputType } from '../api';
import { TodoItem } from './TodoItem';
import { TodoInput } from './TodoInput';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const data = await getTodos();
      // Sort by open tasks first, then by date created
      setTodos(data.sort((a, b) => {
        if (a.completed === b.completed) {
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        }
        return a.completed ? 1 : -1;
      }));
    } catch (err) {
      setError('Could not load tasks. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (input: TodoInputType) => {
    try {
      const newTodo = await createTodo(input);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      console.error(err);
      alert('Failed to add task.');
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    setTodos((prev) => prev.map((t) => t.id === id ? { ...t, completed } : t));
    try {
      await updateTodo(id, completed);
    } catch (err) {
      console.error(err);
      setTodos((prev) => prev.map((t) => t.id === id ? { ...t, completed: !completed } : t));
      alert('Failed to update task.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete task.');
    }
  };

  const remaining = todos.filter(t => !t.completed).length;

  return (
    <div className="space-y-6">
      <TodoInput onAdd={handleAddTodo} />
      
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-lg font-semibold text-[var(--color-on-background)]">Daily Tasks</h3>
          <span className="text-[var(--color-on-surface-variant)] text-[10px] font-label uppercase tracking-widest">{remaining} Items Remaining</span>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-[var(--color-error-container)] text-[var(--color-on-error-container)] rounded-xl border border-[var(--color-error)]">
            {error}
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center p-12 bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/10 text-[var(--color-on-surface-variant)] rounded-xl font-body">
            Your farm is waiting for some action.
          </div>
        ) : (
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onToggle={handleToggle} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </section>
      
      {/* Decorative Seasonal Tip Card */}
      <section>
        <div className="relative rounded-2xl overflow-hidden aspect-[16/7] bg-[var(--color-surface-container-highest)] group">
          <img className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="stardew landscape" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBeSs442eCZBDGxW1esyYgnCQowR5HQ23cSKHIb79b17EfeQ6V-W8LAbGzepo_eeLKkNnkbvTayID5We5dlHSLnvjI67IB5f4memsedU-1RO6ktlkue715Q1Gdsac3OEEduI019GLYGwhhtY9zraKIepyxR8Fh_I4utB7w17l6u6pSrSir_UFXPDNqwogRIMTc_DUReORRoHI3IDGhLyc8AYgcuVC2Rgg3t6gWhOqlf249KlJpB3TW_e1BVqmpY5gUhMfWoDgQHHZJ"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-left">
            <p className="text-[var(--color-secondary)] font-label text-[9px] uppercase tracking-[0.2em] mb-1">Seasonal Wisdom</p>
            <h4 className="font-headline text-lg font-bold text-white leading-tight">Plant your seeds before season ends</h4>
          </div>
        </div>
      </section>
    </div>
  );
};
