import house from "../../assets/menu/house.svg";
import clock from "../../assets/menu/clock.svg";
import check from "../../assets/menu/check.svg";
import download from "../../assets/menu/download.svg";
import heart from "../../assets/menu/heart.svg";
import logout from "../../assets/menu/logout.svg";
import settings from "../../assets/menu/settings.svg";
import star from "../../assets/menu/star.svg";
import stats from "../../assets/menu/stats.svg";
import watchlist from "../../assets/menu/watchlist.svg";

function Sidebar() {
  return (
    <>
      <aside className="mt-[0em] ml-[1em] w-[10%]">
        <h2 className="mb-[.7em]">Menu</h2>
        <div>
          <ul className="text-[.8rem]">
            <li className="flex items-center gap-3 mb-[1em]">
              <img src={house} className="h-[1.8em]" />
              <span className="text-[.9rem]">Home</span>
            </li>
            <li className="flex items-center gap-3 mb-[1em]">
              <img src={clock} className="h-[1.59em]" />
              <span className="text-[.9rem]">Recent</span>
            </li>
            <li className="flex items-center gap-3 mb-[1em]">
              <img src={check} className="w-[1.54em]" />
              <span className="text-[.9rem]">Watched</span>
            </li>

            <li className="flex items-center gap-3 mb-[1em]">
              <img src={watchlist} className="w-[1.5em]" />
              <span className="text-[.9rem]">
                Watchlist
              </span>
            </li>
            <li className="flex items-center gap-3 mb-[1em]">
              <img src={heart} className="w-[1.5em]" />
              <span className="text-[.9rem]">
                Favorites
              </span>
            </li>
            <li className="flex items-center gap-3 mb-[1em]">
              <img src={stats} className="w-[1.6em]" />
              <span className="text-[.9rem]">
                Statistics
              </span>
            </li>
            <li className="flex items-center gap-3 mb-[1em]">
              <img src={settings} className="w-[1.55em]" />
              <span className="text-[.9rem]">Settings</span>
            </li>
            <li className="flex items-center gap-3 mb-[1em]">
              <img src={logout} className="w-[1.55em]" />
              <span className="text-[.9rem]">Log out</span>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
