import { useEffect, useState } from "react";
// import { useOutletContext } from "react-router-dom";
import "./PostingsPage.css";

const PostingsPage = () => {
  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://67aca84f3f5a4e1477db6274.mockapi.io/postings")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setPostings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load postings:", err.message);
        setError("Could not load job postings.");
        setLoading(false);
      });   
  }, []);

  if (loading) return <p className="center-text" >Loading postings...</p>;
  if (error) return <p className="center-text error-text">{error}</p>;
  if (!postings.length)
    return <p className="center-text">No postings available yet.</p>;

  return (
    <div className="postings-container">
      <h2 className="page-title">Available Job Postings</h2>
      <div className="postings-grid">
        {postings.map((post) => (
          <div key={post.id} className="posting-card">
            <div className="posting-info">
              <p>
                <strong>Full Name:</strong> {post.fullName || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {post.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {post.phone || "N/A"}
              </p>
              <p>
                <strong>Gender:</strong> {post.gender || "N/A"}
              </p>
              <p>
                <strong>Employment Type:</strong> {post.employmentType || "N/A"}
              </p>
              <p>
                <strong>Notice Period:</strong> {post.noticePeriod || "N/A"}{" "}
                days
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostingsPage;
