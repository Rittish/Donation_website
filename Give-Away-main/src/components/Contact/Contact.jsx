import React, { useState } from "react";
import axios from "axios";
import { DecoratedHeader } from "../DecoratedHeader/DecoratedHeader";
import "./Contact.scss";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  async function submitForm() {
    try {
      await axios.post(
        "https://fer-api.coderslab.pl/v1/portfolio/contact",
        {
          name: name,
          email: email,
          message: message,
        },
        {
          "Content-Type": "application/json",
        }
      );
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitSuccess(false);
      alert(
        "Message not sent due to error, please check if your email is correct and try again."
      );
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let noErrors = true;

    if (name.includes(" ") || name.length === 0) {
      setNameError(true);
      setSubmitSuccess(false);
      noErrors = false;
    } else {
      setNameError(false);
    }

    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setEmailError(true);
      setSubmitSuccess(false);
      noErrors = false;
    } else {
      setEmailError(false);
    }
    if (message.length < 50) {
      setMessageError(true);
      setSubmitSuccess(false);
      noErrors = false;
    } else {
      setMessageError(false);
    }
    noErrors
      ? submitForm()
      : () => {
          return;
        };
  };

  return (
    <div className="Contact">
      <div className="Contact-image"></div>
      <div className="Contact-form">
        <DecoratedHeader text2="Contact us" />
        <label className={submitSuccess ? "success" : "hidden"}>
          Message succesfully sent! <br></br>We will contact you soon.
        </label>
        <form>
          <fieldset>
            <div className="Contact-form-data">
              <div className="Contact-form-data-info">
                <div className="labelInput">
                  <label className="label">Enter your name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="Contact-form-data-info__field"
                    style={{
                      borderColor: nameError ? "red" : "",
                    }}
                    value={name}
                    placeholder="Enter the name"
                  ></input>
                  <label className={nameError ? "error" : "hidden"}>
                    Incorrect name
                  </label>
                </div>
                <div className="labelInput">
                  <label className="label">Enter your email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="Contact-form-data-info__field"
                    style={{
                      borderColor: emailError ? "red" : "",
                    }}
                    value={email}
                    placeholder="abc@xyz.com"
                  ></input>
                  <label className={emailError ? "error" : "hidden"}>
                    Incorrect email
                  </label>
                </div>
              </div>
              <div className="labelInput">
                <label className="label">Enter your message</label>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  className="Contact-form-data__text"
                  style={{
                    borderColor: messageError ? "red" : "",
                  }}
                  value={message}
                  rows={4}
                  placeholder="Enter your message."
                ></textarea>
                <label className={messageError ? "error" : "hidden"}>
                  Message should be longer than 120 signs
                </label>
              </div>
              <input
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="Contact-form-data__btn"
                value="Send"
              ></input>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
