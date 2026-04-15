import { NavLink } from 'react-router-dom';
import { BiHomeAlt2 } from "react-icons/bi";
import { PiClockBold, PiChartLineBold } from "react-icons/pi";

const Navbar = () => {
    const baseStyle =
        "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 font-medium text-xs sm:text-base";

    const activeStyle = "bg-[#244d3f] text-white shadow-sm";
    const inactiveStyle = "text-[#64748b] hover:text-[#244d3f]";

    return (
        <nav className="w-full border-b border-[#e9e9e9] bg-white sticky top-0 z-50 px-4 md:px-20 lg:px-60">
            <div className="mx-auto max-w-[1600px]">
                
                <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:h-20 gap-4 sm:gap-0">

                    <div className="shrink-0">
                        <img
                            src="/assets/logo.png"
                            alt="logo"
                            className="h-8 md:h-10 w-auto"
                        />
                    </div>

                    <div className="flex flex-row items-center justify-center gap-0.5 sm:gap-4 w-full sm:w-auto">

                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                            }
                        >
                            <BiHomeAlt2 className="text-lg" />
                            <span>Home</span>
                        </NavLink>

                        <NavLink
                            to="/timeline"
                            className={({ isActive }) =>
                                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                            }
                        >
                            <PiClockBold className="text-lg" />
                            <span>Timeline</span>
                        </NavLink>

                        <NavLink
                            to="/stats"
                            className={({ isActive }) =>
                                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                            }
                        >
                            <PiChartLineBold className="text-lg" />
                            <span>Stats</span>
                        </NavLink>

                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
