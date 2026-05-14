import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-20 border border-border bg-card">
        <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em]">ALL CAUGHT UP!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-px bg-border border border-border">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;