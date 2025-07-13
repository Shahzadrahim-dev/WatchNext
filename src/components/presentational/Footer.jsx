import logo from "../../assets/logo.png";
import facebook from "../../assets/facebook.svg";
import youtube from "../../assets/youtube.svg";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <>
      <footer className="bg-[#17191e] mt-4.5 py-6">
        <div className="flex justify-between max-w-screen-xl mx-auto px-[4rem]">
          <div className="flex gap-15 self-end">
            <nav className="flex flex-col">
              <h6 className="text-[1.4rem] font-bold text-gray-400 mb-[.4rem]">
                Services
              </h6>
              <Link
                to="/"
                className="hover:opacity-80 text-[.9rem]"
              >
                Branding
              </Link>
              <Link
                to="/"
                className="hover:opacity-80 text-[.9rem]"
              >
                Design{" "}
              </Link>
              <Link
                to="/"
                className="hover:opacity-80 text-[.9rem]"
              >
                Marketing
              </Link>
              <Link
                to="/"
                className="hover:opacity-80 text-[.9rem]"
              >
                Advertisement
              </Link>
            </nav>
            <nav className="flex flex-col">
              <h6 className="text-[1.4rem] font-bold text-gray-400 mb-[.4rem]">
                Company
              </h6>

              <Link
                to="/"
                className="hover:opacity-80 text-[.9rem]"
              >
                About us
              </Link>
              <Link
                to="/"
                className="hover:opacity-80 text-[.9rem]"
              >
                Contact
              </Link>
              <Link
                to="/"
                className="hover:opacity-80 text-[.9rem]"
              >
                Jobs
              </Link>
              <Link
                to="/"
                className="hover:opacity-80 text-[.9rem]"
              >
                Press kit
              </Link>
            </nav>

            <nav className="flex flex-col">
              <h6 className="text-[1.4rem] font-bold text-gray-400 mb-[.4rem]">
                Explore
              </h6>

              <Link
                to="/"
                className="hover:opacity-80 text-[.9rem]"
              >
                Features
              </Link>
              <Link
                to="/"
                className="hover:opacity-80 text-[.9rem]"
              >
                Enterprise
              </Link>
              <Link
                to="/"
                className="hover:opacity-80 text-[.9rem]"
              >
                Securty
              </Link>
              <Link
                to="/"
                className="hover:opacity-80 text-[.9rem]"
              >
                Pricing
              </Link>
            </nav>
            <nav className="flex flex-col">
              <h6 className="text-[1.4rem] font-bold text-gray-400 mb-[.4rem]">
                Legal
              </h6>

              <Link
                to="/"
                className="hover:opacity-80 text-[.9rem]"
              >
                Terms of use
              </Link>
              <Link
                to="/"
                className="hover:opacity-80 text-[.9rem]"
              >
                Privacy policy
              </Link>
              <Link
                to="/"
                className="hover:opacity-80 text-[.9rem]"
              >
                Cookie policy
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-2 self-center mb-7 mr-2">
            <h6 className="text-[1.85rem] text-gray-400 font-bold text-center">
              Socials
            </h6>
            <div className="flex gap-4">
              <Link to="/" className="hover:opacity-80">
                <img
                  src={facebook}
                  className="h-[1.9rem]"
                />
              </Link>

              <Link to="/" className="hover:opacity-80">
                <img src={youtube} className="h-[1.9rem]" />
              </Link>

              <Link to="/" className="hover:opacity-80">
                <img src={twitter} className="h-[1.9rem]" />
              </Link>

              <Link to="/" className="hover:opacity-80">
                <img
                  src={instagram}
                  className="h-[1.9rem]"
                />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
