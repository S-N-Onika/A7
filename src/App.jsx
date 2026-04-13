import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";

// temporary pages
const Home = () => <h1 className="p-6 text-2xl">Home Page</h1>;
const Timeline = () => <h1 className="p-6 text-2xl">Timeline Page</h1>;
const Stats = () => <h1 className="p-6 text-2xl">Stats Page</h1>;
const NotFound = () => <h1 className="p-6 text-2xl">404 Page Not Found</h1>;

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

export default App;