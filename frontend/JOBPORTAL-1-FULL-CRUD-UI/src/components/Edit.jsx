import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Paper, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    postId: "",
    postProfile: "",
    reqExperience: 0,
    postTechStack: [],
    postDesc: "",
  });

  const currId = location.state?.id;

  // ✅ Fetch job details by ID
  useEffect(() => {
    const fetchJob = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/jobPost/${id}`, {
          auth: {
            username: "lohit",
            password: "1234",
          },
        });

        const data = response.data;
        console.log("✅ Fetched job data:", data);

        // ✅ Ensure postTechStack is always an array
        const safeTechStack = Array.isArray(data.postTechStack)
          ? data.postTechStack
          : data.postTechStack
          ? data.postTechStack.split(",").map((s) => s.trim())
          : [];

        setForm({
          postId: data.postId || "",
          postProfile: data.postProfile || "",
          reqExperience: data.reqExperience || 0,
          postDesc: data.postDesc || "",
          postTechStack: safeTechStack,
        });
      } catch (error) {
        console.error("❌ Error fetching job:", error);
        alert("Failed to load job details!");
      }
    };

    if (currId) fetchJob(currId);
  }, [currId]);

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Toggle skills (checkbox)
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      postTechStack: checked
        ? [...prev.postTechStack, value]
        : prev.postTechStack.filter((tech) => tech !== value),
    }));
  };

  // ✅ Submit edited job (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("📤 Updating job:", form);
      const response = await axios.put("http://localhost:8080/jobPost", form, {
        auth: {
          username: "lohit",
          password: "1234",
        },
      });

      console.log("✅ Job updated successfully:", response.data);
      alert("✅ Job updated successfully!");
      navigate("/allPosts");
    } catch (error) {
      console.error("❌ Error updating job:", error);
      alert("❌ Failed to update job!");
    }
  };

  const skillSet = [
    { name: "Javascript" },
    { name: "Java" },
    { name: "Python" },
    { name: "Django" },
    { name: "Rust" },
  ];

  return (
    <Paper sx={{ padding: "2rem", margin: "2rem" }} elevation={3}>
      <Typography sx={{ marginBottom: "2rem" }} align="center" variant="h5">
        ✏️ Edit Job Post
      </Typography>

      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* ID (read-only) */}
          <TextField
            sx={{ width: "50%", margin: "1rem" }}
            label="Post ID"
            value={form.postId}
            disabled
          />

          <TextField
            sx={{ width: "50%", margin: "1rem" }}
            label="Job Profile"
            name="postProfile"
            value={form.postProfile}
            onChange={handleInputChange}
            required
          />

          <TextField
            sx={{ width: "50%", margin: "1rem" }}
            label="Experience (Years)"
            name="reqExperience"
            type="number"
            value={form.reqExperience}
            onChange={handleInputChange}
            required
          />

          <TextField
            sx={{ width: "50%", margin: "1rem" }}
            label="Job Description"
            name="postDesc"
            multiline
            rows={4}
            value={form.postDesc}
            onChange={handleInputChange}
            required
          />

          {/* ✅ Skills */}
          <Box sx={{ margin: "1rem" }}>
            <Typography variant="h6">Required Skills:</Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {skillSet.map(({ name }, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      value={name}
                      checked={Array.isArray(form.postTechStack)
                        ? form.postTechStack.includes(name)
                        : false}
                      onChange={handleCheckboxChange}
                    />{" "}
                    {name}
                  </label>
                </li>
              ))}
            </ul>
          </Box>

          <Button
            sx={{ width: "50%", marginTop: "1rem" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Update Job
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Edit;
