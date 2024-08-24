import { AnyMxRecord } from "dns";
import { FC, MouseEventHandler, ReactElement, ReactNode } from "react";

interface Comprops {
  children: ReactNode;
}

const Card: FC<Comprops> = ({ children }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[50rem] flex flex-col items-center">
      {children}
    </div>
  );
};

const Button = ({
  message,
  onClick,
}: {
  message: string;
  onClick: MouseEventHandler | undefined;
}) => {
  return (
    <a
      href="#"
      className="flex items-center  justify-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
      onClick={onClick}
    >
      {message}
    </a>
  );
};
export { Card, Button };
