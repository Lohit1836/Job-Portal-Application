import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const initial = {
  postProfile: "",
  reqExperience: "",
  postTechStack: [],
  postDesc: "",
};

const Create = () => {
  const skillSet = [
    { name: "Javascript" },
    { name: "Java" },
    { name: "Python" },
    { name: "Django" },
    { name: "Rust" },
  ];

  const navigate = useNavigate();
  const [form, setForm] = useState(initial);

  // ✅ Checkbox toggle handler
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setForm((prev) => ({
        ...prev,
        postTechStack: [...prev.postTechStack, value],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        postTechStack: prev.postTechStack.filter((tech) => tech !== value),
      }));
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      postProfile: form.postProfile,
      reqExperience: parseInt(form.reqExperience),
      postDesc: form.postDesc,
      postTechStack: form.postTechStack,
    };

    try {
      console.log("📤 Sending job to backend:", newJob);

      const response = await axios.post("http://localhost:8080/jobPost", newJob, {
        auth: {
          username: "lohit",
          password: "1234",
        },
      });

      console.log("✅ Job added successfully:", response.data);
      alert("✅ Job added successfully!");
      setForm(initial); // reset form
      navigate("/allPosts"); // redirect to list
    } catch (error) {
      console.error("❌ Error adding job:", error);
      alert("Failed to add job!");
    }
  };

  return (
    <Paper sx={{ padding: "2rem", margin: "2rem" }} elevation={2}>
      <Typography align="center" variant="h5" sx={{ mb: 3 }}>
        ➕ Create New Job Post
      </Typography>

      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ width: "50%", margin: "1rem" }}
            required
            onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
            label="Job Profile"
            value={form.postProfile}
          />

          <TextField
            sx={{ width: "50%", margin: "1rem" }}
            required
            onChange={(e) => setForm({ ...form, reqExperience: e.target.value })}
            label="Experience (Years)"
            type="number"
            value={form.reqExperience}
          />

          <TextField
            sx={{ width: "50%", margin: "1rem" }}
            required
            multiline
            rows={3}
            onChange={(e) => setForm({ ...form, postDesc: e.target.value })}
            label="Job Description"
            value={form.postDesc}
          />

          <Box sx={{ width: "50%", margin: "1rem" }}>
            <Typography variant="h6">Required Skills:</Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {skillSet.map(({ name }, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      name={name}
                      value={name}
                      checked={form.postTechStack.includes(name)}
                      onChange={handleCheckboxChange}
                    />{" "}
                    {name}
                  </label>
                </li>
              ))}
            </ul>
          </Box>

          <Button
            sx={{ width: "50%", margin: "1rem" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Create;
