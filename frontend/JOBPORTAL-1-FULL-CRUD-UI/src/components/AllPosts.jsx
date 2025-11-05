import React, { useEffect, useState } from "react";
import { Card, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const AllPosts = () => {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 NEW LINE

  const handleEdit = (id) => {
    navigate("/edit", { state: { id } });
  };

  const fetchInitialPosts = async () => {
    try {
      console.log("🌐 Sending request to backend...");
      const response = await axios.get("http://localhost:8080/jobPosts", {
        auth: {
          username: "lohit",
          password: "1234",
        },
      });
      console.log("✅ Backend data:", response.data);
      setPost(response.data);
    } catch (error) {
      console.error("❌ Error fetching posts:", error);
    }
  };

  // 👇 useEffect will now run when location changes
  useEffect(() => {
    fetchInitialPosts();
  }, [location]); // 👈 Refresh when you come back to this page


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/jobPost/${id}`, {
        auth: {
          username: "lohit",
          password: "1234",
        },
      });
      console.log("✅ Deleted successfully!");
      // Refresh posts after delete
      setPost((prev) => prev.filter((p) => p.postId !== id));
    } catch (error) {
      console.error("❌ Error deleting post:", error);
    }
  };

  return (
    <Grid container spacing={2} sx={{ margin: "2%" }}>
      {post.length === 0 ? (
        <Typography variant="h6" sx={{ margin: "2%" }}>
          No job posts found 😔
        </Typography>
      ) : (
        post.map((p) => (
          <Grid key={p.postId} item xs={12} md={6} lg={4}>
            <Card
              sx={{
                padding: "3%",
                overflow: "hidden",
                width: "84%",
                backgroundColor: "#ADD8E6",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: "2rem",
                  fontWeight: "600",
                  fontFamily: "sans-serif",
                }}
              >
                {p.postProfile}
              </Typography>

              <Typography
                sx={{
                  color: "#585858",
                  marginTop: "2%",
                  fontFamily: "cursive",
                }}
              >
                Description: {p.postDesc}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontFamily: "unset",
                  marginTop: "1rem",
                }}
              >
                Experience: {p.reqExperience} years
              </Typography>

              <Typography sx={{ fontFamily: "serif", marginTop: "0.5rem" }}>
                Skills:
              </Typography>
              {p.postTechStack?.map((s, i) => (
                <Typography key={i} display="inline">
                  {s}
                  {i < p.postTechStack.length - 1 ? ", " : ""}
                </Typography>
              ))}

              <div style={{ marginTop: "1rem" }}>
                <DeleteIcon
                  onClick={() => handleDelete(p.postId)}
                  sx={{ cursor: "pointer", color: "red", marginRight: "1rem" }}
                />
                <EditIcon
                  onClick={() => handleEdit(p.postId)}
                  sx={{ cursor: "pointer", color: "blue" }}
                />
              </div>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default AllPosts;
