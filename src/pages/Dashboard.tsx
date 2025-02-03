import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access');
        if (!token) {
          throw new Error('Token not found');
        }

        // Fetch spending summary (total, spent, remaining)
        const spendingSummaryResponse = await axios.get(
          'http://127.0.0.1:8000/spending-summary/',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Fetch goals, budget, income, expenses, etc.
        const budgetResponse = await axios.get('http://127.0.0.1:8000/budget/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const incomeResponse = await axios.get('http://127.0.0.1:8000/income/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const expenseResponse = await axios.get('http://127.0.0.1:8000/expenses/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const debtResponse = await axios.get('http://127.0.0.1:8000/debts/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDashboardData({
          spendingSummary: spendingSummaryResponse.data,
          budgets: budgetResponse.data,
          incomes: incomeResponse.data,
          expenses: expenseResponse.data,
          debts: debtResponse.data,
        });
      } catch (err: any) {
        setError(`An error occurred while fetching dashboard data: ${err.message}`);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <h1>Financial Dashboard</h1>

      {/* Spending Summary */}
      <div className="my-4">
        <h2>Spending Summary</h2>
        <p>Total Allocated: ${dashboardData.spendingSummary.total_allocated}</p>
        <p>Total Spent: ${dashboardData.spendingSummary.total_spent}</p>
        <p>Remaining Budget: ${dashboardData.spendingSummary.remaining_budget}</p>
      </div>

      {/* Goals */}
      <div className="my-4">
        <h2>Your Financial Goals</h2>
        {dashboardData.goals && dashboardData.goals.length > 0 ? (
          <ul>
            {dashboardData.goals.map((goal: any) => (
              <li key={goal.id}>
                <strong>{goal.name}</strong> - Target: ${goal.target_amount} - Remaining: ${goal.remaining}
              </li>
            ))}
          </ul>
        ) : (
          <p>No goals set yet.</p>
        )}
      </div>

      {/* Budget Categories */}
      <div className="my-4">
        <h2>Your Budget Categories</h2>
        {dashboardData.budgets && dashboardData.budgets.length > 0 ? (
          <ul>
            {dashboardData.budgets.map((budget: any) => (
              <li key={budget.id}>
                <strong>{budget.category.name}</strong> - Allocated: ${budget.allocated_amount} - Spent: ${budget.spent_amount} - Remaining: ${budget.remaining}
              </li>
            ))}
          </ul>
        ) : (
          <p>No budgets set yet.</p>
        )}
      </div>

      {/* Expenses */}
      <div className="my-4">
        <h2>Your Expenses</h2>
        {dashboardData.expenses && dashboardData.expenses.length > 0 ? (
          <ul>
            {dashboardData.expenses.map((expense: any) => (
              <li key={expense.id}>
                {expense.description} - ${expense.amount} - Date: {expense.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses recorded yet.</p>
        )}
      </div>

      {/* Debts */}
      <div className="my-4">
        <h2>Your Debts</h2>
        {dashboardData.debts && dashboardData.debts.length > 0 ? (
          <ul>
            {dashboardData.debts.map((debt: any) => (
              <li key={debt.id}>
                Debt to {debt.creditor_name} - Amount: ${debt.amount} - Remaining: ${debt.remaining} - Due: {debt.due_date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No debts recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
