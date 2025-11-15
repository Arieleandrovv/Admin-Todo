'use client';
import { Todo } from '@/generated/prisma/client';
import { startTransition, useOptimistic } from 'react';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    }),
  );
  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));

      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete);
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
    }
  };

  const baseStyles =
    'rounded-lg shadow-sm p-5 border-dashed flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0';
  const doneStyles = 'line-through bg-blue-50 border-blue-500';
  const pendingStyles = 'bg-red-50 border-red-500';

  return (
    <div
      className={`${baseStyles} ${
        todoOptimistic.complete ? doneStyles : pendingStyles
      }`}
    >
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4 text-black'>
        <div
          /*onClick={() =>
            toggleTodo(todoOptimistic.id, !todoOptimistic.complete)
          }*/
          onClick={onToggleTodo}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'
          }`}
        >
          {todoOptimistic.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
      </div>
      <div className='text-center sm:text-left text-black'>
        {todoOptimistic.description}
      </div>
    </div>
  );
};
