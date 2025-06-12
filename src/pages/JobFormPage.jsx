import { useState } from "react";
import Modal from "../components/UI/Modal";

const API_URL = "https://67aca84f3f5a4e1477db6274.mockapi.io/postings";

const JobFormPage = () => {
  const initialData={
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "Male",
      employmentType: "",
      noticePeriod: "",
      resume: null,
      portfolio: "",
      notes: "",
    }
  const [form, setForm] = useState(initialData);

  const [activeTab, setActiveTab] = useState("personal");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target; 
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleClear = () => {
    setForm(initialData);
  };

  const handleSubmit = async () => {
    const { resume, ...submitData } = form;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        alert("Job posting submitted!");
        handleClear();
      } else {
        alert("Submission failed.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred.");
    } finally {
      setShowModal(false);
    }
  };

  const styles = {
    container: {
      width: "600px",
      margin: "40px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      fontFamily: "Arial, sans-serif",
    },
    input: {
      padding: "10px",
      margin: "10px 0 ",
      borderRadius: "4px",
      border: "1px solid #ccc",
      
    },
   button: {
  padding: "10px 16px",
  border: "none",
  borderRadius: "9px",
  cursor: "pointer",
  backgroundColor: "#007bff",
  color: "#fff",

},
    discard: {
      backgroundColor: "#6c757d",
    },
    tab: {
      padding: "10px 16px",
      marginRight: "10px",
      border: "1px solid #ccc",
      cursor: "pointer",
      backgroundColor: "#e0e0e0",
    },
    activeTab: {
      backgroundColor: "#fff",
      fontWeight: "bold",
    },
    radioGroup: {
      display: "flex",
      gap: "20px",
      margin: "10px 0",
    },
    form: {
      width: "100%",
      display: "flex",
      flexDirection : "column",
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: '20px'}}>Job Posting Form</h2>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("personal")}
          style={
            activeTab === "personal"
              ? { ...styles.tab, ...styles.activeTab }
              : styles.tab
          }
        >
          Personal Info
        </button>
        <button
          onClick={() => setActiveTab("work")}
          style={
            activeTab === "work"
              ? { ...styles.tab, ...styles.activeTab }
              : styles.tab
          }
        >
          Work Details
        </button>
      </div>

      <form
        style={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        {activeTab === "personal" && (
          <>
            <input
              style={styles.input}
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              required
            />
            <div style={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={form.gender === "Male"}
                  onChange={handleChange}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={form.gender === "Female"}
                  onChange={handleChange}
                />{" "}
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={form.gender === "Other"}
                  onChange={handleChange}
                />{" "}
                Other
              </label>
            </div>
          </>
        )}

        {activeTab === "work" && (
          <>
            <select
              style={styles.input}
              name="employmentType"
              value={form.employmentType}
              onChange={handleChange}
            >
              <option value="">Select Employment Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Freelance">Freelance</option>
            </select>
            <input
              style={styles.input}
              name="noticePeriod"
              type="number"
              placeholder="Notice Period (days)"
              value={form.noticePeriod}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              name="resume"
              type="file"
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="portfolio"
              type="url"
              placeholder="Portfolio Website"
              value={form.portfolio}
              onChange={handleChange}
              required
            />
            <textarea
              style={{ ...styles.input,resize:"vertical" , minHeight:"50hv",maxHeight:"50hv",height: "100px" }}
              name="notes"
              placeholder="Additional Notes"
              value={form.notes}
              onChange={handleChange}
            />
          </>
        )}

       
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
  <button type="submit" style={{ ...styles.button, minWidth: "100px" }}>Submit</button>
  <button
    type="button"
    onClick={handleClear}
    style={{ ...styles.button, ...styles.discard, minWidth: "100px" }}
  >
    Discard
  </button>
</div>

      </form>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleSubmit}
        message="Are you sure you want to submit the form?"
      />
    </div>
  );
};

export default JobFormPage;
