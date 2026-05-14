"use client";
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { updateTodo, deleteTodo } from '../../services/todoServices';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import Loader from '../../components/Loader';
import useToastStore from '../../store/toastStore';

export default function DashboardClient({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const { user, loading: authLoading } = useContext(AuthContext);

  // Sync state when server action revalidates the path
  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  const handleToggleTodo = async (id, isCompleted) => {
    try {
      const updatedTodo = await updateTodo(id, isCompleted);
      setTodos(todos.map(todo => ((todo.documentId || todo.id) === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      useToastStore.getState().addToast('Failed to update task status.', 'error');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => (todo.documentId || todo.id) !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
      useToastStore.getState().addToast('Failed to delete task.', 'error');
    }
  };

  if (authLoading) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-[1200px] mx-auto pt-24 pb-20 px-8">
        <header className="mb-12 border-b border-border pb-6 flex items-end justify-between">
          <div>
            <h1 style={{ fontFamily: 'var(--font-anton)' }} className="text-6xl tracking-widest text-foreground uppercase mb-2">
              DASHBOARD
            </h1>
            <p className="text-muted-foreground font-mono text-[10px] tracking-[0.4em] uppercase">
              ACTIVE TASKS: <span className="text-primary">{todos.length}</span>
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <b>
            <span className="bg-primary text-white font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1">
              {user?.username || 'USER'}
            </span>
            </b>
          </div>
        </header>

        <section className="mt-8">
          <TodoForm />
          <div className="mt-8 border border-border bg-card p-6">
            <TodoList
              todos={todos}
              onToggleTodo={handleToggleTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
