import React from "react"

function Avatar(props) {
  const styles = {
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
  }

  return (
    <img
      style={styles}
      src="https://res.cloudinary.com/joelmturner/b_rgb:e7e5e5/monster-01.png"
      alt="Joel turner portrait"
      title="Monster P. Whittington"
    />
  )
}

export default Avatar
