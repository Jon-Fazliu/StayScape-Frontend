import Header from "../Header";
import Navbar from "../Navbar";
import MailList from "../MailList";
import Footer from "../Footer";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />

      <div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
