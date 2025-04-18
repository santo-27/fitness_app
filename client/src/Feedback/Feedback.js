import React, { useState, useContext, useEffect } from "react";
import Header from "../Header";
import "./Feedback.css";
import axios from "axios";
import AuthContext from "../authContext";


function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const posts = [
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    // More posts...
  ]
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    stars: "1",
  });
  const {user} = useContext(AuthContext)
  const [submitted, setSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    try{
      await axios.post("/feedbackPost", {
        review: formData.message,
        stars: formData.stars,
        name: formData.name,

        email: user.email
      })
      
    }
    catch(err){
      console.log(err);
    }
    setSubmitted(true);
  };

  //get the feedbacks from the db
  const get_data = async () => {
    const response = await axios.get("/feedbacks")
    console.log(response)
    return response.data
  }

  useEffect(() => {
    get_data().then(response => {
      console.log(response.response.rows)
      setFeedbacks(response.response.rows);
      
    })

  })

  return (
    <div>
      <Header />
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

            {/* <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label> */}

            <label>
              Stars:
              <select name="stars" value={formData.category} onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
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
       <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Reviews from our users</h2>
          <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {feedbacks.map((feedback) => (
            <article key={feedback.user_email} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                {/* <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time> */}
                <a
                  
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {feedback.user_name}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  {/* <a href={post.href}> */}
                 
                    stars : {feedback.stars}

                  {/* </a> */}
                </h3>
                <p className="mt-5 line-clamp-3 text-sm text-gray-600">
                  {feedback.message_user}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                
                {/* <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      {post.author.name}
                    </a>
                  </p>     
                  <p className="text-gray-600">{post.author.role}</p>
                </div> */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default Feedback;
