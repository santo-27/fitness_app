import React, { useState, useContext, useEffect } from "react";
import Header from "../Header";
import "./Feedback.css";
import axios from "axios";
import AuthContext from "../authContext";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    stars: "5",
  });
  const { user } = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/feedbackPost", {
        review: formData.message,
        stars: formData.stars,
        name: formData.name,
        email: user.email,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch feedbacks
  const get_data = async () => {
    const response = await axios.get("/feedbacks");
    return response.data;
  };

  useEffect(() => {
    get_data().then((res) => {
      setFeedbacks(res.response.rows);
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="feedback-container">
        <h2>Feedback</h2>
        <p>We value your feedback! Let us know what you think.</p>

        {submitted ? (
          <p className="success-message">Thank you for your feedback! ✅</p>
        ) : (
          <form onSubmit={handleSubmit} className="feedback-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Stars:
              <select
                name="stars"
                value={formData.stars}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <label>
              Message:
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        )}
      </div>

      {/* User Reviews Display */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Reviews from our users
            </h2>
            <p className="mt-2 text-lg text-gray-600 display_h2">
              Hear how our tools are keeping users on track.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {feedbacks.map((feedback, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 display_name">
                    {feedback.user_name}
                  </h3>
                  <div className="flex items-center mb-4 display_name">
                    {Array.from({ length: parseInt(feedback.stars) }, (_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">
                        ⭐
                      </span>
                    ))}
                    {Array.from({ length: 5 - parseInt(feedback.stars) }, (_, i) => (
                      <span key={i} className="text-yellow-500 text-2xl">
                        ✰
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic">“{feedback.message_user}”</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
