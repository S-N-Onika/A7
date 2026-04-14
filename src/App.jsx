import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import Banner from "./component/Banner";
import FriendsCards from "./component/FriendsCards";
import Footer from "./component/Footer";
import FriendDetails from "./component/FriendsDetails";


const getApi = async () => {
  const res = await fetch("/Friends.json");
  return res.json();
};

const Home = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getApi();
      setFriends(data || []);
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

  return Component ? <Component /> : <div>Loading...</div>;
};
const Stats = () => <h1 className="p-6 text-2xl">Stats Page</h1>;
const NotFound = () => (
  <div className="min-h-[calc(100vh-80px)] flex place-content-center items-center justify-center">
    <h1 className="text-6xl font-bold text-center text-[#244d3f] capitalize ">
      404 Page Not Found
    </h1>
  </div>
);

function App() {
  return (
    <BrowserRouter>

      <Toaster />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/friend/:id" element={<FriendDetails />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;