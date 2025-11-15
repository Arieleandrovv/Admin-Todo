'use client';
import { Todo } from '@/generated/prisma/client';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const baseStyles =
    'rounded-lg shadow-sm p-5 border-dashed flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0';
  const doneStyles = 'line-through bg-blue-50 border-blue-500';
  const pendingStyles = 'bg-red-50 border-red-500';

  return (
    <div
      className={`${baseStyles} ${todo.complete ? doneStyles : pendingStyles}`}
    >
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4 text-black'>
        <div
          onClick={() => toggleTodo(todo.id, !todo.complete)}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            todo.complete ? 'bg-blue-100' : 'bg-red-100'
          }`}
        >
          {todo.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
      </div>
      <div className='text-center sm:text-left text-black'>
        {todo.description}
      </div>
    </div>
  );
};
