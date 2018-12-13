import React from 'react'

const ContactForm = () => {
  return (
    <form name="contact" method="POST" action="/" netlify>
      <p>
        <label>
          Your Name: <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Your Email: <input type="email" name="email" />
        </label>
      </p>
      <p>
        <label>
          Your Role:{' '}
          <select name="role[]" multiple>
            <option value="leader">Leader</option>
            <option value="follower">Follower</option>
          </select>
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
