import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Function to refresh access token
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }

      const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
        refresh: refreshToken,
      });

      const newAccessToken = response.data.access;
      localStorage.setItem("accessToken", newAccessToken);
      console.log(localStorage.getItem("accessToken"));
          console.log(localStorage.getItem("refreshToken"));

      return newAccessToken;
    } catch (err) {
      console.error("Error refreshing token:", err);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setError("Session expired. Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
      return null;
    }
  };

  // Function to fetch dashboard data
  const fetchDashboardData = async (retry = true) => {
    let token = localStorage.getItem("accessToken");

    if (!token) {
      setError("Access token not found. Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };

      const responses = await Promise.all([
        axios.get("http://127.0.0.1:8000/spending-summary/", { headers }),
        axios.get("http://127.0.0.1:8000/budget/", { headers }),
        axios.get("http://127.0.0.1:8000/income/", { headers }),
        axios.get("http://127.0.0.1:8000/expenses/", { headers }),
        axios.get("http://127.0.0.1:8000/debts/", { headers }),
        axios.get("http://127.0.0.1:8000/goals/", { headers }),
      ]);

      setDashboardData({
        spendingSummary: responses[0].data,
        budgets: responses[1].data,
        incomes: responses[2].data,
        expenses: responses[3].data,
        debts: responses[4].data,
        goals: responses[5].data,
      });
    } catch (err: any) {
      if (err.response?.status === 401 && retry) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          return fetchDashboardData(false); // Retry once with new token
        }
      }
      setError("Failed to load dashboard data. Please try again later.");
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
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
