import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div class="container a">
      <form id="contact" action="" method="post">
        <h3>Contact Admin</h3>
        <h4>Contact us for custom quote</h4>
        <fieldset>
          <input
            placeholder="Your name"
            type="text"
            tabindex="1"
            required
            autofocus
          />
        </fieldset>
        <fieldset>
          <input
            placeholder="Your Email Address"
            type="email"
            tabindex="2"
            required
          />
        </fieldset>
        <fieldset>
          <input
            placeholder="Your Phone Number (optional)"
            type="tel"
            tabindex="3"
            required
          />
        </fieldset>
        <fieldset>
          <textarea
            placeholder="Type your message here...."
            tabindex="5"
            required
          ></textarea>
        </fieldset>
        <fieldset>
          <button
            name="submit"
            type="submit"
            id="contact-submit"
            data-submit="...Sending"
          >
            Submit
          </button>
        </fieldset>
        <p class="copyright">
          back to /
          <a href="http://localhost:3000/" target="_blank" title="Colorlib">
            home
          </a>
        </p>
      </form>
    </div>
  );
};

export default ContactUs;
