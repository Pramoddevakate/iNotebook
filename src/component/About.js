import React from "react";

function About() {
  return (
    <div>
      <div className="about-section paddingTB60 gray-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-sm-6">
              <div className="about-title clearfix">
               
                <h1>Welcome to iNotebook</h1>

                <p className="about-paddingB">
                  iNotebook is a simple note-taking application built with
                  React. It allows you to create, edit, and delete notes, and
                  keeps your data secure with user authentication.
                </p>
                <p>
                This project is a part of my learning journey and is meant to showcase my React and frontend development skills.
      
                </p>
                <div className="about-icons">
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/">
                        <i
                          id="social-fb"
                          className="fa fa-facebook-square fa-3x social"
                        ></i>
                      </a>{" "}
                    </li>
                    <li>
                      <a href="https://twitter.com/">
                        <i
                          id="social-tw"
                          className="fa fa-twitter-square fa-3x social"
                        ></i>
                      </a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="https://plus.google.com/">
                        <i
                          id="social-gp"
                          className="fa fa-google-plus-square fa-3x social"
                        ></i>
                      </a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="mailto:bootsnipp@gmail.com">
                        <i
                          id="social-em"
                          className="fa fa-envelope-square fa-3x social"
                        ></i>
                      </a>{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-sm-6">
              <div className="about-img">
                <img
                  src="https://devitems.com/preview/appmom/img/mobile/2.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
