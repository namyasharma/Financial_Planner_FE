import { useState } from "react";
import { Menu, Home, BarChart, CreditCard, Target, Settings, Bell } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";


import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg p-4 ${sidebarOpen ? "w-64" : "w-20"} transition-all`}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-4">
          <Menu />
        </button>
        <ul className="space-y-6">
          <li className="flex items-center space-x-2"><Home /> {sidebarOpen && <span>Dashboard</span>}</li>
          <li className="flex items-center space-x-2"><BarChart /> {sidebarOpen && <span>Budgets</span>}</li>
          <li className="flex items-center space-x-2"><CreditCard /> {sidebarOpen && <span>Expenses</span>}</li>
          <li className="flex items-center space-x-2"><Target /> {sidebarOpen && <span>Goals</span>}</li>
          <li className="flex items-center space-x-2"><Settings /> {sidebarOpen && <span>Settings</span>}</li>
        </ul>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="flex justify-between items-center bg-white shadow-md p-4">
          <h1 className="text-xl font-bold">Financial Dashboard</h1>
          <div className="flex space-x-4">
            <Bell className="cursor-pointer" />
            <Button>Profile</Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Summary Cards */}
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold">Total Budget</h2>
              <p className="text-2xl font-bold">$5,000</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold">Total Spent</h2>
              <p className="text-2xl font-bold text-red-500">$3,200</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold">Remaining</h2>
              <p className="text-2xl font-bold text-green-500">$1,800</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
