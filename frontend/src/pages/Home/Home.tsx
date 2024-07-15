import Footer from "./Footer";
import Features from "./Compos"
import Newsletter from "./Subscribe";
import Heading from "./Heading";
import FAQ from "./FAQs";


const Home = () => {
  return (
    <div className="">
      <Heading />
      <div style={{ marginTop: '20px' }}></div>
      <div style={{ marginTop: '20px' }}></div>
      <div style={{ marginTop: '20px' }}></div>
      <div style={{ marginTop: '20px' }}></div>
      <Features />
      {/* <Newsletter /> */}
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;