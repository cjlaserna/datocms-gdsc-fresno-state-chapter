import React from "react"
import Section from "./Section"
import emailjs from "@emailjs/browser"

export default function Contact() {
  function handleOnSubmit(e) {
    e.preventDefault()
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        "#contactForm",
        process.env.NEXT_PUBLIC_PUBLIC_KEY,
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text)
        },
        (err) => {
          console.log("FAILED...", err)
        },
      )
    e.target.reset()
  }

  return (
    <div>
      <div className="grid lg:grid-cols-auto-fit">
        <form id="contactForm" onSubmit={handleOnSubmit}>
          <div className="grid grid-rows-1 gap-2 mb-2 lg:grid-cols-auto-fit lg:gap-4 lg:mb-4">
            <input
              type="text"
              id="from_name"
              name="from_name"
              placeholder="First Name"
              className="input input-secondary w-full"
            />
            <input
              type="text"
              id="reply_to"
              name="reply_to"
              placeholder="Your Email"
              className="input input-secondary w-full"
            />
            <input
              type="text"
              id="to_name"
              name="to_name"
              placeholder="Subject Line"
              className="input input-secondary w-full"
            />
          </div>
          <div>
            <textarea
              rows="4"
              cols="50"
              type="text"
              id="message"
              name="message"
              placeholder="Type your message here..."
              className="textarea textarea-secondary textarea-bordered w-full mb-4"
            />
            <input type="submit" value="Send Message" className="btn float-right" />
          </div>
        </form>
      </div>
    </div>
  )
}
