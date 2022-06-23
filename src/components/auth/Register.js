import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { registerUser } from "./AuthManager"
import './Auth.css'
// TODO: This should get you started on registering a new user. 
// Add new fields depending on your server side registration
export const Register = () => {
  const username = useRef()
  const password = useRef()
  const history = useHistory()

  const handleRegister = (e) => {
    e.preventDefault()

    const newUser = {
      "username": username.current.value,
      "password": password.current.value
    }

    registerUser(newUser).then(res => {
      if ("token" in res) {
        localStorage.setItem("auth_token", res.token)
        history.push("/map")
      }
    })
  }

return (
  <main className="auth-container" style={{ height: '100vh'}}>
    <form className="form--login" onSubmit={handleRegister}>
      <p id="login--title">The Chatturday Morning Cartoons Guide to Chattanooga!</p>
      <p id="login--subtitle">Register an account</p>
      <fieldset>
        <label htmlFor="inputUsername">Email</label>
        <input className="form-control" ref={username} type="text" name="username" placeholder="Email" required />
      </fieldset>
      <fieldset>
        <label htmlFor="inputPassword"> Password </label>
        <input className="form-control" ref={password} type="password" name="password" placeholder="Password" required />
      </fieldset>
      <fieldset>
        <button type="submit">Register</button>
      </fieldset>
      <fieldset>
        <p >Art and Code by Zach Dugger</p>
      </fieldset>
    </form>
    <section>
      Already registered? <Link to="/login">Login</Link>
    </section>
  </main>
)
}
