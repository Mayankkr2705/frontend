import { Square, CheckSquare } from 'lucide-react';

const TodoItem = ({ todo, onToggleTodo, onDeleteTodo }) => {

  const id = todo.documentId || todo.id;
  const title = todo.attributes?.title ?? todo.title;
  const isCompleted = todo.attributes?.isCompleted ?? todo.isCompleted;

  // A safeguard in case the todo object is malformed.
  if (title === undefined || isCompleted === undefined) {
    return null; // Or a loading/error state
  }

  return (
    <div
      className={`group flex items-center justify-between p-4 transition-all duration-300 ${
        isCompleted 
          ? 'bg-primary/5' 
          : 'bg-card hover:bg-[#050505]'
      }`}
    >
      <div 
        className="flex items-center space-x-4 cursor-pointer flex-grow"
        onClick={() => onToggleTodo(id, isCompleted)}
      >
        <div className="transition-transform duration-200">
          {isCompleted ? (
            <CheckSquare className="text-primary size-5" />
          ) : (
            <Square className="text-muted-foreground size-5" />
          )}
        </div>
        <span
          className={`font-mono text-sm uppercase transition-all ${
            isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'
          }`}
        >
          {title}
        </span>
      </div>
      
      <button
        onClick={() => onDeleteTodo(id)}
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-400 border border-red-400/30 px-3 py-1 hover:bg-red-400/10 transition-colors cursor-pointer opacity-100 sm:opacity-0 group-hover:opacity-100"
      >
        DELETE
      </button>
    </div>
  );
};

export default TodoItem;