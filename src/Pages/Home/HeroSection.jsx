import PriyavratPort from "../../data/CV/Priyavrat_kumar.pdf";

export default function HeroSection() {
  return (
    <section id="heroSection" className="hero--section">
      <div className="hero--section--content--box">
        <div className="hero--section--content">
          <p className="section--title">Hey, I'm Priyavrat</p>
          <h1 className="hero--section--title">
            <span className="hero--section-title--color">Full Stack</span>{" "}
            <br />
            Developer
          </h1>
          <p className="hero--section-description">

            MERN stack developer: JavaScript, TypeScript, MongoDB, Express.js, React.js, Node.js proficiency.
            <br />  Full-stack expertise.
          </p>
        </div>
        <a href={PriyavratPort} download="priyavratCV.pdf" className="btn btn-primary button-center mt-5">Download CV</a>
      </div>
      <div className="hero--section--img">
        <img src="	https://i.pinimg.com/736x/a8/ab/a8/a8aba8597ff696d9f8b423a25e396c64.jpg" alt="Hero Section" />
      </div>
    </section>
  );
}