import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"
import { loginUser } from "./AuthManager"


export const Login = () => {
  const username = useRef()
  const password = useRef()
  const invalidDialog = useRef()
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault()
    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user)
      .then(res => {
        if ("valid" in res && res.valid && "token" in res) {
          localStorage.setItem("auth_token", res.token)
          history.push("/map")
        }
        else {
          invalidDialog.current.showModal()
        }
      })
  }

  return (
    <main className="auth-container" style={{ height: '100vh'}}>
        <dialog className="dialog" ref={invalidDialog}>
          <div>Username or password was not valid.</div>
          <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
        </dialog>
        <section>
          <form className="form--login" onSubmit={handleLogin}>
            <p id="login--title">The Chatturday Morning Cartoons Guide to Chattanooga!</p>
            <p id="login--subtitle">Log in to your account</p>
            <fieldset>
              <label htmlFor="inputUsername"> Username</label>
              <input className="form-control" ref={username} type="username" id="username" placeholder="Username" required autoFocus />
            </fieldset>
            <fieldset>
              <label htmlFor="inputPassword"> Password </label>
              <input className="form-control" ref={password} type="password" id="password" placeholder="Password" required />
            </fieldset>
            <fieldset>
              <button type="submit">Sign In</button>
            </fieldset>
            <fieldset>
            <p >Art and Code by Zach Dugger</p>
          </fieldset>
          </form>
        </section>
        <section>
          <Link to="/register">Not a member yet?</Link>
        </section>
    </main>
  )
}
