import logo from "../../assets/logo.png";
import facebook from "../../assets/facebook.svg";
import youtube from "../../assets/youtube.svg";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="bg-[#17191e] pb-4 pt-4 mt-10">
        <div className="flex justify-between max-w-screen-xl mx-auto px-[2rem]">
          <div>
            <div className="mb-2 ml-[-5px]">
              <Link to="/">
                <img src={logo} className="h-[5rem]" />
              </Link>
            </div>

            <div className="text-left">
              <p className="mb-1.5">
                Bookmark Your Next Binge!
              </p>
              <p className="text-gray-400">
                Copyright © 2025 - All rights reserved
              </p>
            </div>
          </div>

          <div className="flex gap-12 self-end">
            <nav className="flex flex-col">
              <h6 className="text-[1.5rem] font-bold text-gray-400 mb-[.4rem]">
                Services
              </h6>
              <Link to="/" className="hover:opacity-80">
                Branding
              </Link>
              <Link to="/" className="hover:opacity-80">
                Design{" "}
              </Link>
              <Link to="/" className="hover:opacity-80">
                Marketing
              </Link>
              <Link to="/" className="hover:opacity-80">
                Advertisement
              </Link>
            </nav>
            <nav className="flex flex-col">
              <h6 className="text-[1.5rem] font-bold text-gray-400 mb-[.4rem]">
                Company
              </h6>

              <Link to="/" className="hover:opacity-80">
                About us
              </Link>
              <Link to="/" className="hover:opacity-80">
                Contact
              </Link>
              <Link to="/" className="hover:opacity-80">
                Jobs
              </Link>
              <Link to="/" className="hover:opacity-80">
                Press kit
              </Link>
            </nav>

            <nav className="flex flex-col">
              <h6 className="text-[1.5rem] font-bold text-gray-400 mb-[.4rem]">
                Legal
              </h6>

              <Link to="/" className="hover:opacity-80">
                Terms of use
              </Link>
              <Link to="/" className="hover:opacity-80">
                Privacy policy
              </Link>
              <Link to="/" className="hover:opacity-80">
                Cookie policy
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-3 mt-5 self-center mb-[1.5rem]">
            <h6 className="text-[2rem] text-gray-400 font-bold">
              Socials
            </h6>
            <div className="flex gap-4">
              <Link to="/" className="hover:opacity-80">
                <img src={facebook} className="h-8" />
              </Link>
              <Link to="/" className="hover:opacity-80">
                <img src={youtube} className="h-8" />
              </Link>
              <Link to="/" className="hover:opacity-80">
                <img src={twitter} className="h-8" />
              </Link>
              <Link to="/" className="hover:opacity-80">
                <img src={instagram} className="h-8" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
