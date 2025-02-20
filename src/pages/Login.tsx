import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Alert, Divider } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        navigate("/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await fetch("http://localhost:8000/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        navigate("/dashboard");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  
  

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Left Side - Carousel */}
      <Box sx={{ width: "50vw", height: "100vh", position: "relative" }}>
        <Slider {...sliderSettings}>
          {[
            "https://img.freepik.com/free-photo/broker-looking-laptop-analyzing-stock-market-invest-trading-stocks-graph_169016-47428.jpg?t=st=1739973659~exp=1739977259~hmac=c0c6961e35690bfacd14b2c2afc8770c6d2f27b021aa2e7bfabab75c9e51ce9a&w=740",
            "https://img.freepik.com/free-photo/forex-trading-workplace_1409-5578.jpg?t=st=1739973928~exp=1739977528~hmac=c923ef95dffa743de4fc8ac5f115f73eddf3dd620262060961fae2a0f59619b4&w=1380",
            "https://img.freepik.com/free-photo/plant-growing-coins-glass-jar_155003-1174.jpg?t=st=1739974003~exp=1739977603~hmac=428d2a63c87697642ac9e9e3a67696becbba88f0d27f4956462700de646d56b0&w=740",
          ].map((img, index) => (
            <Box
              key={index}
              sx={{
                height: "100vh",
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}

        </Slider>
      </Box>

      {/* Right Side - Login Form */}
      <Box
        sx={{
          width: "50vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 6,
          backgroundColor: "#fff",
          boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Welcome Back
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mb: 4 }}>
          Enter your credentials to access your account.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            InputProps={{
              startAdornment: <PersonIcon sx={{ marginRight: 1 }} />,
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: <LockIcon sx={{ marginRight: 1 }} />,
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: 1.5,
              fontSize: 16,
              borderRadius: 3,
              backgroundColor: "#1e88e5",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Sign In
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" sx={{ color: "gray" }}>
          Don't have an account? <Button variant="text">Sign Up</Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
