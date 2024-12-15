import React from 'react';
import "../styles/Home.css";
import { Container, Row, Col } from 'reactstrap';
import heroVideo from "../assets/images/hero-video.mp4";
import Subtitle from '../Shared/Subtitle';
import SearchBar from '../Shared/SearchBar';
import ServiceList from '../Services/ServiceList';
import FeaturedToursList from '../Components/FeaturedTours/FeaturedToursList';
import MasonryImagesGallery from '../Components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../Components/Testimonials/Testimonials';
import Newsletter from '../Shared/Newsletter';
import Contact from './Contact';
import FeaturedBlogsList from '../Components/FeaturedBlogs.jsx/FeaturedBlogsList';

const Home = () => {
  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="hero-section">
        <video className="hero-video" src={heroVideo} autoPlay loop muted />
        <Container>
          <Row>
            <Col lg="6" md="12" className="d-flex align-items-center">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You Go"} />
                </div>
                <h1>
                  Traveling Opens The Door To Creating{" "}
                  <span className="highlight">Memories</span>
                </h1>
                <p>
                Whether you're looking for thrilling adventures, relaxing escapes, or cultural explorations, we offer travel experiences that suit all kinds of wanderlust. From the snow-capped mountains of the Himalayas to the pristine beaches of the Caribbean, we bring the world closer to you.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Search Bar Section */}
      <section>
        <SearchBar />
      </section>

      {/* Services Section */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <h5 className="services__subtitle">What We Serve</h5>
              <h2 className="services__title">We Offer Our Best Services</h2>
            </Col>
          </Row>
          <ServiceList />
        </Container>
      </section>

      {/* Featured Tours Section */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title">Our Featured Tours</h2>
            </Col>
            <FeaturedToursList />
          </Row>
        </Container>
      </section>

      {/* Experience Section */}
      <section>
        <Container>
          <Row className="align-items-center">
            <Col lg="6" md="12">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />
                <h2>With all our experience <br /> we will serve you</h2>
                <p>
                Explore hidden gems and iconic locations with our expertly crafted travel packages designed just for you.
                  <br />
                  Phasellus tempus massa vitae elit consectetur, ut convallis massa ultricies.
                </p>
              </div>
              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful Trips</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular Clients</h6>
                </div>
                <div className="counter__box">
                  <span>15+</span>
                  <h6>Years Experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6" md="12">
              <img
                className="img-fluid"
                src={"../assets/images/experience.png"}
                alt="Experience"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Gallery Section */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">Visit Our Customers' Tour Gallery</h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Blogs Section */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Featured Blogs"} />
              <h2 className="blogs__title">Check Out Our Latest Blogs</h2>
            </Col>
            <FeaturedBlogsList />
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Testimonial"} />
              <h2 className="testimonials__title">What Our Customers Say About Us</h2>
            </Col>
            <Testimonials />
          </Row>
        </Container>
      </section>

      {/* Contact and Newsletter */}
      <Contact />
      <Newsletter />
    </>
  );
};

export default Home;
