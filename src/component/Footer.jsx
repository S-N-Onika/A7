const Footer = () => {
    return (
        <footer className="bg-[#1B4332] text-white py-12 px-4 md:px-20 lg:px-61.25">
            <div className="max-w-400 mx-auto text-center lg:px-20">

                <h2 className="text-6xl font-bold mb-3 tracking-tight">KeenKeeper</h2>

                <p className="text-gray-300 text-sm mx-auto mb-8">
                    Your personal shelf of meaningful connections. Browse, track, and nurture the relationships that matter most.
                </p>

                <div className="mb-12">
                    <p className="text-md font-medium mb-4">Social Links</p>
                    <div className="flex justify-center gap-4">
                        <a href="https://www.instagram.com/" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1B4332] hover:bg-gray-100 transition-colors">
                            <img src="./assets/instagram.png"></img>
                        </a>
                        <a href="https://www.facebook.com/" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1B4332] hover:bg-gray-100 transition-colors">
                            <img src="./assets/facebook.png"></img>
                        </a>
                        <a href="https://www.x.com/" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1B4332] hover:bg-gray-100 transition-colors">
                            <img src="./assets/twitter.png"></img>
                        </a>
                    </div>
                </div>

                <hr className="border-white/25" />

                <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[16px] text-gray-400 gap-4">
                    <p>© 2026 KeenKeeper. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
