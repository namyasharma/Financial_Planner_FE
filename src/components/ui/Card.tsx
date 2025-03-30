import { ReactNode } from 'react';

const Card = ({ children }: { children: ReactNode }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">{children}</div>
  );
  
  const CardContent = ({ children }: { children: ReactNode }) => <div>{children}</div>;
  
  export { Card, CardContent };
  