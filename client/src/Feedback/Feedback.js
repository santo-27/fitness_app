import React, { useState } from "react";
import "./Feedback.css";

function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    category: "feedback",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setSubmitted(true);
  };

  return (
    <div className="feedback-container">
      <h2>Feedback</h2>
      <p>We value your feedback! Let us know what you think.</p>

      {submitted ? (
        <p className="success-message">Thank you for your feedback! ✅</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>

          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <label>
            Category:
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="feedback">Feedback</option>
              <option value="query">Query</option>
              <option value="bug">Bug Report</option>
              <option value="review">Review</option>
            </select>
          </label>

          <label>
            Message:
            <textarea name="message" value={formData.message} onChange={handleChange} required />
          </label>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Feedback;
