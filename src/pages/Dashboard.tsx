import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDashboardData } from "../features/dashboard/dashboardSlice";
import { RootState, AppDispatch } from "../store/store";
import { Container, Typography, Card, CardContent, Grid, Alert, CircularProgress } from "@mui/material";


const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: dashboardData, loading, error } = useSelector((state: RootState) => state.dashboard);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (loading || !dashboardData) {
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
        {dashboardData.goals.length > 0 ? (
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
        {dashboardData.budgets.length > 0 ? (
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
        {dashboardData.expenses.length > 0 ? (
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
        {dashboardData.debts.length > 0 ? (
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
