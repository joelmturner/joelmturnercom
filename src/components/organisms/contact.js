import React from 'react'

const ContactForm = () => {
  return (
    <form name="contact" method="POST" netlify>
      <p>
        <label>
          Email: <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Message: <textarea name="message" />
        </label>
      </p>
      <div data-netlify-recaptcha />
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  )
}

export default ContactForm
