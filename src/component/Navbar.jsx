import { NavLink } from 'react-router-dom';
import { BiHomeAlt2 } from "react-icons/bi";
import { PiClockBold, PiChartLineBold } from "react-icons/pi";

const Navbar = () => {
    const baseStyle =
        "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 font-medium text-sm md:text-base";

    const activeStyle = "bg-[#244d3f] text-white";
    const inactiveStyle = "text-[#64748b] hover:text-[#244d3f]";

    return (
        <nav className="w-full border-b border-[#e9e9e9] bg-white sticky top-0 z-50 px-4 md:px-20 lg:px-20">
            <div className="mx-auto max-w-400">
                <div className="flex flex-row justify-between items-center h-auto sm:h-16 py-3 sm:py-0 gap-3 sm:gap-0">

                    <div className="shrink-0">
                        <img src="/assets/logo.png" alt="logo" />
                    </div>

                    <div className="flex flex-row items-center gap-2 sm:gap-4">

                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                            }
                        >
                            <BiHomeAlt2 size={18} />
                            <span>Home</span>
                        </NavLink>

                        <NavLink
                            to="/timeline"
                            className={({ isActive }) =>
                                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                            }
                        >
                            <PiClockBold size={18} />
                            <span>Timeline</span>
                        </NavLink>

                        <NavLink
                            to="/stats"
                            className={({ isActive }) =>
                                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                            }
                        >
                            <PiChartLineBold size={18} />
                            <span>Stats</span>
                        </NavLink>

                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;