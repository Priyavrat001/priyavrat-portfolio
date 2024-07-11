import {  useState } from "react";
import toast from 'react-hot-toast';



export default function ContactMe() {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://priyavrat-portfolio-backend.onrender.com/api/v1/contact", {
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body: JSON.stringify(contact)
    });
    const json = await response.json();

    if(json.success){
      return toast.success("Message send successfully")
    }
    
    } catch (error) {
      toast.error("Something went wrong")
    }
  };
  
  

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  }
  

  return (
    <section id="Contact" className="contact--section">
      <div>
        <p className="sub--title">Get In Touch</p>
        <h2>Contact Me</h2>
        <p className="text-lg">
         Feel Free to to drop some message
        </p>
      </div>
      <form className="contact--form--container" onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="firstName" className="contact--label">
            <span className="text-md">First Name</span>
            <input
              onChange={handleChange}
              type="text"
              className="contact--input text-md"
              name="firstName"
              value={contact.firstName}
              id="first-name"
              required
            />
          </label>
          <label htmlFor="lastName" className="contact--label">
            <span className="text-md">Last Name</span>
            <input
              onChange={handleChange}
              type="text"
              className="contact--input text-md"
              name="lastName"
              value={contact.lastName}
              id="last-name"
              required
            />
          </label>
          <label htmlFor="email" className="contact--label">
            <span className="text-md">Email</span>
            <input
              onChange={handleChange}
              type="email"
              className="contact--input text-md"
              name="email"
              value={contact.email}
              id="email"
              required
            />
          </label>
          <label htmlFor="phoneNumber" className="contact--label">
            <span className="text-md">phone-number</span>
            <input
              type="number"
              className="contact--input text-md"
              name="phoneNumber"
              onChange={handleChange}
              value={contact.phoneNumber}
              id="phone-number"
              required
            />
          </label>
        </div>
        <label htmlFor="message" className="contact--label">
          <span className="text-md">Message</span>
          <textarea
          value={contact.message}
            className="contact--input text-md"
            id="message"
            name="message"
            onChange={handleChange}
            rows="8"
            placeholder="Type your message..."
          />
        </label>
        <div>
          <button type="submit" className="btn btn-primary contact--form--btn">Submit</button>
        </div>
      </form>
    </section>
  );
}