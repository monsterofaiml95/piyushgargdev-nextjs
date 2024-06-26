import React, { useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import SectionSubtitle from "./SectionSubtitle";
import classes from "../../styles/contact.module.css";
import axios from "axios";
import NewTwitterLogo from "./NewTwitterlogo";
import { RiYoutubeFill, RiGithubFill, RiTwitterFill, RiLinkedinFill } from "react-icons/ri";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  // Create refs for form fields
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };
    console.log(data);
    try {
      const response = await axios.post("/api/contact", data);
      if (response.status === 200) {
        setSubmitted(true);
        // Clear the form fields
        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
        console.log("Form submitted");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="contact" className={`${classes.contact}`}>
      <Container>
        <Row className="flex justify-between flex-col md:flex-row">
          <Col lg="4" md="6">
            <h3 className="mt-4 mb-4 text-2xl">Connect with me</h3>
            <ul className={`${classes.contact__info__list}`}>
              <li className={`${classes.info__item}`}>
                <span>
                  <i className="ri-map-pin-line"></i>
                </span>
                <p>Planet Earth 🌍</p>
              </li>
              <li className={`${classes.info__item}`}>
                <span>
                  <a href="mailto:piyushgarg.dev@gmail.com">
                    <i className="ri-mail-line"></i>
                  </a>
                </span>
                <p>
                  <a className="hover:text-[#01d293]" href="mailto:piyushgarg.dev@gmail.com">
                    piyushgarg.dev@gmail.com
                  </a>
                </p>
              </li>
            </ul>
            <div className={`${classes.social__links}`}>
              <Link
                className="hover:text-[#01d293] duration-300"
                aria-label="Youtube Channel"
                href="https://youtube.com/@piyushgargdev"
                target="_blank"
              >
                <RiYoutubeFill />
              </Link>
              <Link
                className="hover:text-[#01d293] duration-300"
                aria-label="Github Profile"
                href="https://github.com/piyushgarg-dev"
                target="_blank"
              >
                <RiGithubFill />
              </Link>
              <Link
                className="hover:text-[#01d293] duration-300"
                aria-label="Twitter Account"
                href="https://twitter.com/piyushgarg_dev"
                target="_blank"
              >
                <NewTwitterLogo />
              </Link>
              <Link
                className="hover:text-[#01d293] duration-300"
                aria-label="LinkedIn Account"
                href="https://www.linkedin.com/in/piyushgarg195/"
                target="_blank"
              >
                <RiLinkedinFill />
              </Link>
            </div>
          </Col>
          <Col lg="5" md="6">
            {submitted ? (
              <div className="flex justify-center items-center text-xl font-bold h-[30vh]">
                <p>Message Sent!</p>
              </div>
            ) : (
              <>
                <div className="mt-4 mb-4 text-2xl">
                  <SectionSubtitle subtitle="Contact me" />
                </div>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                  <input
                    className="text-md border-transparent rounded-lg block w-full p-2.5 bg-[#171f38] placeholder-gray-400 text-white"
                    type="text"
                    name="name"
                    ref={nameRef}
                    placeholder="Your Full Name"
                    required
                    autoComplete="off"
                  />
                  <input
                    className="text-md border-transparent rounded-lg block w-full p-2.5 bg-[#171f38] placeholder-gray-400 text-white"
                    type="email"
                    name="email"
                    ref={emailRef}
                    placeholder="Your Email"
                    required
                    autoComplete="off"
                  />
                  <textarea
                    className="text-md border-transparent rounded-lg block w-full p-2.5 bg-[#171f38] placeholder-gray-400 text-white"
                    name="message"
                    ref={messageRef}
                    placeholder="Your Message"
                    required
                    rows="4"
                    autoComplete="off"
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
