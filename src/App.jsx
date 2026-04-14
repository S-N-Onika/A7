import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import Banner from "./component/Banner";
import FriendsCards from "./component/FriendsCards";

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

const Timeline = () => <h1 className="p-6 text-2xl">Timeline Page</h1>;
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App