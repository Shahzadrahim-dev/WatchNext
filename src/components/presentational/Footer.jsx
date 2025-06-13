import logo from "../../assets/logo.png";
import facebook from "../../assets/facebook.svg";
import youtube from "../../assets/youtube.svg";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="bg-[#17191e] pb-6 pt-6 mt-10">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2">
            <img src={logo} className="h-[5rem]" />
          </div>
          <div className="text-center">
            <p className="mb-1.5">
              Bookmark Your Next Binge!
            </p>
            <p>Copyright © 2025 — All rights reserved</p>
          </div>
          <div className="flex gap-6 mt-5">
            <Link to="/">
              <img src={facebook} className="h-8" />
            </Link>
            <Link to="/">
              <img src={youtube} className="h-8" />
            </Link>
            <Link to="/">
              <img src={twitter} className="h-8" />
            </Link>
            <Link to="/">
              <img src={instagram} className="h-8" />{" "}
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
