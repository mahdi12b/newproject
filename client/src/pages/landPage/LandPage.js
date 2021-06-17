import React from "react";
import "./LandPage.css";
const Landpage = () => {
  return (
    <div className="b">
      <div className="landing"></div>
      {/**/}
      <div className="features">
        <div className="container">
          <div className="feat">
            <h3>Tell Us Your Idea</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut lab
            </p>
          </div>
          <div className="feat">
            <i className="far fa-gem fa-3x" />
            <h3>We Will Do All The Work</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut lab
            </p>
          </div>
          <div className="feat">
            <i className="fas fa-globe-asia fa-3x" />
            <h3>Your Product is Worldwide</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut lab
            </p>
          </div>
        </div>
      </div>
      {/* */}
      <div className="services" id="services">
        <div className="container">
          <h2 className="special-heading">Services</h2>
          <p>Don't be busy, be productive</p>
          <div className="services-content">
            <div className="col">
              {/* Start Service */}
              <div className="srv">
                {/*<i className="fas fa-palette fa-2x" />  <i className="fas fa-calculator-alt" />*/}
                <i className="fas fa-calculator" />
                <div className="text">
                  <h3>Mathematique</h3>
                  <p>
                    Graphic design is the process of visual communication and
                    problem-solving using one or more of typography, photography
                    and illustration.
                  </p>
                </div>
              </div>
              <div className="srv">
                <i className="fab fa-sketch fa-2x" />
                <div className="text">
                  <h3>Physique</h3>
                  <p>
                    Process of enhancing user satisfaction with a product by
                    improving the usability, accessibility, and pleasure
                    provided in the interaction.
                  </p>
                </div>
              </div>
              {/* End Service */}
            </div>
            <div className="col">
              {/* Start Services */}
              <div className="srv">
                {/*<i className="fas fa-vector-square fa-2x" /> */}
                <i className="fas fa-dna" />
                <div className="text">
                  <h3>science</h3>
                  <p>
                    Web design encompasses many different skills and disciplines
                    in the production and maintenance of websites.
                  </p>
                </div>
              </div>
              <div className="srv">
                <i className="fas fa-pencil-ruler fa-2x" />
                <div className="text">
                  <h3>Technique</h3>
                  <p>
                    Web development is a broad term for the work involved in
                    developing a web site for the Internet or an intranet.
                  </p>
                </div>
              </div>
              {/* End Services */}
            </div>
            <div className="col">
              <div className="image image-column">
                <img
                  src="https://pedagoo.com/wp-content/uploads/2020/06/2250x1500_czy-warto-korzystac-ze-szkolen-online-ollh.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/**/}
      <div className="about">
        <div className="container">
          <h2 className="special-heading">About</h2>
          <p>Less is more work</p>
          <div className="about-content">
            <div className="image">
              <img
                src="https://www.codeur.com/blog/wp-content/uploads/2019/01/codeur-site-elearning.jpg"
                alt=""
              />
            </div>
            <div className="text">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                nemo neque voluptate tempora velit cum non, fuga vitae
                architecto delectus sed maxime rerum impedit aliquam obcaecati,
                aut excepturi iusto laudantium!
              </p>
              <hr />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
                sapiente. Velit iure exercitationem dolores nesciunt dolore. Eum
                officiis dolorum hic voluptate quaerat minima, similique
                inventore esse, alias, sed quo officia?
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* */}
      <div className="contact">
        <div className="container">
          <h2 className="special-heading">Contact</h2>
          <p>We are born to create</p>
          <div className="info">
            <p className="label">Feel free to drop us a line at:</p>
            <a
              href="mailto:leonagency@mail.com?subject=Contact"
              className="link"
            >
              connecti.9raya@gmail.com
            </a>
            <div className="social">
              Find Us On Social Networks
              <i className="fab fa-youtube" />
              <i className="fab fa-facebook-f" />
              <i className="fab fa-twitter" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landpage;
/*
import React from "react";
import "./Landpage.css";
const Landpage = () => {
  return (
    <div className="b">
      <div className="landing">
        <div className="intro-text">
          <h1>Hello There</h1>
          <p>We are Connecti 9raya &amp; Education platform</p>
        </div>
      </div>
      
      <div className="features">
        <div className="container">
          <div className="feat">
            <i className="fas fa-magic fa-3x" />
            <h3>Tell Us Your Idea</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut lab
            </p>
          </div>
          <div className="feat">
            <i className="far fa-gem fa-3x" />
            <h3>We Will Do All The Work</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut lab
            </p>
          </div>
          <div className="feat">
            <i className="fas fa-globe-asia fa-3x" />
            <h3>Your Product is Worldwide</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut lab
            </p>
          </div>
        </div>
      </div>
      {/* }
      <div className="services" id="services">
        <div className="container">
          <h2 className="special-heading">Services</h2>
          <p>Don't be busy, be productive</p>
          <div className="services-content">
            <div className="col">
              {/* Start Service }
              <div className="srv">
                {/*<i className="fas fa-palette fa-2x" />  <i className="fas fa-calculator-alt" />}
                <i class="fas fa-calculator" />
                <div className="text">
                  <h3>Mathematique</h3>
                  <p>
                    Graphic design is the process of visual communication and
                    problem-solving using one or more of typography, photography
                    and illustration.
                  </p>
                </div>
              </div>
              <div className="srv">
                <i className="fab fa-sketch fa-2x" />
                <div className="text">
                  <h3>Physique</h3>
                  <p>
                    Process of enhancing user satisfaction with a product by
                    improving the usability, accessibility, and pleasure
                    provided in the interaction.
                  </p>
                </div>
              </div>
              {/* End Service }
            </div>
            <div className="col">
              {/* Start Services }
              <div className="srv">
                {/*<i className="fas fa-vector-square fa-2x" /> *)
                <i className="fas fa-dna" />
                <div className="text">
                  <h3>science</h3>
                  <p>
                    Web design encompasses many different skills and disciplines
                    in the production and maintenance of websites.
                  </p>
                </div>
              </div>
              <div className="srv">
                <i className="fas fa-pencil-ruler fa-2x" />
                <div className="text">
                  <h3>Technique</h3>
                  <p>
                    Web development is a broad term for the work involved in
                    developing a web site for the Internet or an intranet.
                  </p>
                </div>
              </div>
              {/* End Services *
            </div>
            <div className="col">
              <div className="image image-column">
                <img
                  src="https://pedagoo.com/wp-content/uploads/2020/06/2250x1500_czy-warto-korzystac-ze-szkolen-online-ollh.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*}
      <div className="about">
        <div className="container">
          <h2 className="special-heading">About</h2>
          <p>Less is more work</p>
          <div className="about-content">
            <div className="image">
              <img
                src="https://www.codeur.com/blog/wp-content/uploads/2019/01/codeur-site-elearning.jpg"
                alt=""
              />
            </div>
            <div className="text">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                nemo neque voluptate tempora velit cum non, fuga vitae
                architecto delectus sed maxime rerum impedit aliquam obcaecati,
                aut excepturi iusto laudantium!
              </p>
              <hr />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
                sapiente. Velit iure exercitationem dolores nesciunt dolore. Eum
                officiis dolorum hic voluptate quaerat minima, similique
                inventore esse, alias, sed quo officia?
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* }
      <div className="contact">
        <div className="container">
          <h2 className="special-heading">Contact</h2>
          <p>We are born to create</p>
          <div className="info">
            <p className="label">Feel free to drop us a line at:</p>
            <a
              href="mailto:leonagency@mail.com?subject=Contact"
              className="link"
            >
              connecti.9raya@gmail.com
            </a>
            <div className="social">
              Find Us On Social Networks
              <i className="fab fa-youtube" />
              <i className="fab fa-facebook-f" />
              <i className="fab fa-twitter" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landpage */
