import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Typography, Box, Alert } from "@mui/material";
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Left side - Carousel */}
      <Box
        sx={{
          width: "50%",
          backgroundColor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "600px" }}>
          <Slider {...settings}>
            <Box component="img" src="https://via.placeholder.com/500x500?text=Image+1" alt="Carousel Image 1" sx={{ width: "100%" }} />
            <Box component="img" src="https://via.placeholder.com/500x500?text=Image+2" alt="Carousel Image 2" sx={{ width: "100%" }} />
            <Box component="img" src="https://via.placeholder.com/500x500?text=Image+3" alt="Carousel Image 3" sx={{ width: "100%" }} />
          </Slider>
        </Box>
      </Box>

      {/* Right side - Login form */}
      <Box
        sx={{
          width: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={8}
          sx={{
            padding: 3,
            width: "80%",
            maxWidth: 400,
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 4,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
            Login to Your Account
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 5,
                },
              }}
              InputProps={{
                startAdornment: <PersonIcon sx={{ marginRight: 1 }} />,
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 5,
                },
              }}
              InputProps={{
                startAdornment: <LockIcon sx={{ marginRight: 1 }} />,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: 1.5,
                fontSize: 16,
                borderRadius: 5,
              }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
