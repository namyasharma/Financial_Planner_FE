import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Paper, Typography, Box, Alert } from "@mui/material";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const navigate = useNavigate();

  interface AuthResponse {
    access: string;
    refresh: string;
    error?: string;
  }

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const url = isLogin ? "http://localhost:8000/login/" : "http://localhost:8000/register/";
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data: AuthResponse = await response.json();
      if (response.ok) {
        if (isLogin) {
          localStorage.setItem("accessToken", data.access);
          localStorage.setItem("refreshToken", data.refresh);
          console.log(localStorage.getItem("accessToken"));
          console.log(localStorage.getItem("refreshToken"));
          navigate("/dashboard");
        } else {
          // Registration success, switch to login view or show a success message
          setIsLogin(true);
          setError("Registration successful! Please log in.");
        }
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          {isLogin ? "Login" : "Register"}
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleAuth} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLogin ? "Login" : "Register"}
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => {
              setError(""); // Reset error message when toggling
              setIsLogin(!isLogin); // Toggle form mode
            }}
            sx={{ mt: 2 }}
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Auth;
