import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import logo from "../../assets/logo.png";
import profileIcon from "../../assets/profile-image.jpg";
import downIcon from "../../assets/down.svg";
import searchIcon from "../../assets/search.svg";
import Crown from "../presentational/Crown";
import { useSearch } from "../../contexts/useSearchContext";

function Header() {
  const { setSearchInput, searchInput } = useSearch();

  const navigate = useNavigate();

  function handleChange() {
    if (searchInput.length >= 2) {
      navigate("search");
    }
  }

  return (
    <>
      <header className="flex justify-between mb-[.5rem]">
        <div className="flex gap-6 items-center">
          <a href="/" className="flex h-[5rem] w-[10rem]">
            <img
              src={logo}
              alt="logo"
              className="ml-[.4rem] h-[4.3rem] object-cover object-center"
            />
          </a>

          <div className="flex gap-14 items-center mb-[1rem]">
            <nav>
              <ul className="flex gap-6 text-[.93rem]">
                <li>
                  <NavLink
                    to="movies"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#DB1819]"
                        : "hover:text-[#DB1819] transition-[color] duration-200"
                    }
                  >
                    Movies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="tvshows"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#DB1819] "
                        : "hover:text-[#DB1819] transition-[color] duration-200"
                    }
                  >
                    TV Shows
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="anime"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#DB1819] "
                        : "hover:text-[#DB1819] transition-[color] duration-200"
                    }
                  >
                    Anime
                  </NavLink>
                </li>

                <NavLink to="trending">
                  {({ isActive }) => (
                    <li className="relative group">
                      <Crown
                        className={
                          "absolute left-[53.5px] top-[-5.5px]"
                        }
                        fill={
                          isActive ? "#DB1819" : "#f9fafc"
                        }
                        height={`1.2rem`}
                        width={`1.2rem`}
                      />
                      <span
                        className={
                          isActive
                            ? "text-[#DB1819]"
                            : "group-hover:text-[#DB1819] transition-[color] duration-200"
                        }
                      >
                        Trending
                      </span>
                    </li>
                  )}
                </NavLink>
              </ul>
            </nav>

            <div className="relative">
              <img
                src={searchIcon}
                className="absolute h-[1.35rem] left-[0.6875rem] top-[0.4375rem]"
              />
              <input
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  handleChange();
                }}
                className="outline-none bg-[#21242D] border border-[#292931]
                  rounded-[3.5px] h-[2.125rem] w-[16.15rem] pl-[2.55rem]
                  placeholder:text-gray-500 text-[#f9fafc] text-[.85rem]"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-1">
          <div className="flex gap-[3px]">
            <p className="mt-[1.377rem] text-[.81rem]">
              Dart
            </p>
            <img
              src={downIcon}
              alt="down-arrow"
              className="h-[.43rem] mt-[1.85rem] cursor-pointer"
            />
          </div>
          <div className="mt-[.6rem]">
            <img
              src={profileIcon}
              alt="profile-image"
              className="w-[2.5rem] h-[2.7rem] border-[2px] border-[#373942] rounded
                object-cover mr-[.5rem]"
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
