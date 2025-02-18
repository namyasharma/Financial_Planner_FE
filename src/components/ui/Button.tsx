import { ReactNode } from 'react';
const Button = ({ children }: { children: ReactNode }) => (
    <button className="bg-blue-500 text-white px-4 py-2 rounded">{children}</button>
  );
  
  export { Button };
  