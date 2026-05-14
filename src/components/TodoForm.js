"use client";
import { useRef } from 'react';
import { addTodoAction } from '../app/actions';
import useToastStore from '../store/toastStore';

const TodoForm = () => {
  const formRef = useRef(null);

  const action = async (formData) => {
    const result = await addTodoAction(formData);
    if (result?.error) {
      useToastStore.getState().addToast(result.error, 'error');
    } else {
      formRef.current?.reset();
    }
  };

  return (
    <form ref={formRef} action={action} className="mb-8 flex gap-2">
      <input
        type="text"
        name="title"
        placeholder="WHAT NEEDS TO BE DONE?"
        className="flex-grow bg-input border border-border text-foreground font-mono text-sm h-12 px-4 focus:outline-none focus:border-primary focus:ring-0 placeholder:text-muted-foreground uppercase transition-colors"
        required
      />
      <button
        type="submit"
        className="bg-primary text-white font-bold font-mono text-xs uppercase tracking-[0.25em] px-6 h-12 hover:brightness-110 transition-all duration-200 cursor-pointer flex items-center justify-center whitespace-nowrap"
      >
        ADD TASK
      </button>
    </form>
  );
};

export default TodoForm;