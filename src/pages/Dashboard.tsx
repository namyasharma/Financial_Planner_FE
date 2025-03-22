import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDashboardData } from '../features/dashboard/dashboardSlice';
import { RootState, AppDispatch } from '../store/store';
import { Box, Typography, Paper, List, ListItem, ListItemText, Alert, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2' 

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: dashboardData, loading, error } = useSelector((state: RootState) => state.dashboard);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching dashboard data...");
    dispatch(fetchDashboardData());
  }, [dispatch]);
  console.log("Dashboard data again: ",dashboardData)
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Financial Dashboard
      </Typography>

      {/* Spending Summary */}
      <Paper elevation={3} sx={{ p: 2, my: 2 }}>
        <Typography variant="h6">Spending Summary</Typography>
        <Typography>Total Allocated: ${dashboardData.spendingSummary.total_allocated}</Typography>
        <Typography>Total Spent: ${dashboardData.spendingSummary.total_spent}</Typography>
        <Typography>Remaining Budget: ${dashboardData.spendingSummary.remaining_budget}</Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* Goals */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Your Financial Goals</Typography>
            {dashboardData.goals.length > 0 ? (
              <List>
                {dashboardData.goals.map((goal: any) => (
                  <ListItem key={goal.id}>
                    <ListItemText primary={`${goal.name} - Target: $${goal.target_amount} - Remaining: $${goal.remaining}`} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No goals set yet.</Typography>
            )}
          </Paper>
        </Grid>

        {/* Budget Categories */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Your Budget Categories</Typography>
            {dashboardData.budgets.length > 0 ? (
              <List>
                {dashboardData.budgets.map((budget: any) => (
                  <ListItem key={budget.id}>
                    <ListItemText primary={`${budget.category.name} - Allocated: $${budget.allocated_amount} - Spent: $${budget.spent_amount} - Remaining: $${budget.remaining}`} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No budgets set yet.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
