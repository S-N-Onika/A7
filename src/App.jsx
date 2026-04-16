import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import Navbar from "./component/Navbar";
import Banner from "./component/Banner";
import FriendsCards from "./component/FriendsCards";
import Footer from "./component/Footer";
import FriendDetails from "./component/FriendsDetails";

const Home = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/Friends.json");
        const data = await res.json();
        setFriends(data || []);
      } catch (error) {
        console.error("Failed to fetch friends", error);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <Banner />
      <FriendsCards friends={friends} />
    </>
  );
};

const Timeline = () => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    import("./component/Timeline").then((module) => {
      setComponent(() => module.default);
    });
  }, []);

  return Component ? <Component /> : null;
};


const Stats = () => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    import("./component/Stats").then((module) => {
      setComponent(() => module.default);
    });
  }, []);

  return Component ? <Component /> : null;
};

const NotFound = () => {
  const baseStyle = "flex items-center gap-2 px-4 py-2 rounded-lg transition-all";
  const activeStyle = "bg-[#244d3f] text-white";
  const inactiveStyle = "text-[#244d3f] border border-[#244d3f] hover:bg-[#244d3f] hover:text-white";

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col place-content-center items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-center text-[#244d3f] capitalize ">
        404
      </h1>
      <h3 className="text-2xl font-semibold text-gray-700">Page Not Found</h3>
      <p className="text-gray-500 text-lg">The page you are looking for does not exist.</p>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
        }
        style={{ marginBottom: 10 }}
      >
        <BiHomeAlt2 className="text-lg" />
        <span className="font-semibold">Back To Home</span>
      </NavLink>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>

      <Toaster />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/friend/:id" element={<FriendDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;