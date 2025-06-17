import logo from "../../assets/logo.png";
import facebook from "../../assets/facebook.svg";
import youtube from "../../assets/youtube.svg";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="bg-[#17191e] mt-10 py-6">
        <div className="flex justify-between max-w-screen-xl mx-auto px-[4rem]">
          <div className="flex gap-20 self-end">
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
                Explore
              </h6>

              <Link to="/" className="hover:opacity-80">
                Features
              </Link>
              <Link to="/" className="hover:opacity-80">
                Enterprise
              </Link>
              <Link to="/" className="hover:opacity-80">
                Securty
              </Link>
              <Link to="/" className="hover:opacity-80">
                Pricing
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

          <div className="flex flex-col gap-3 self-center mb-7 mr-2">
            <h6 className="text-[2rem] text-gray-400 font-bold text-center">
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
