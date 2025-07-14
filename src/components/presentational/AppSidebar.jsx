import {
  Heart,
  SquareCheck,
  BadgePlus,
  Clock8,
  Trophy,
  Clapperboard,
  ChevronRight,
} from "lucide-react";
import { useGenres } from "../../contexts/useGenresContext";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSidebar } from "../ui/sidebar";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuBadge,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Recent",
    icon: Clock8,
    link: "recent",
  },
  {
    title: "Favorites",
    icon: Heart,
    link: "favorites",
  },
  {
    title: "Watched",
    icon: SquareCheck,
    link: "watched",
  },
  {
    title: "Watchlist",
    icon: BadgePlus,
    link: "watchlisted",
  },
  {
    title: "Top Rated",
    icon: Trophy,
    link: "toprated",
  },
];

export function AppSidebar() {
  const [tmdbGenreOpen, setTmdbGenreOpen] = useState(false);
  const [animeGenreOpen, setAnimeGenreOpen] =
    useState(false);
  const [tmdbGenreNames, setTmdbGenreNames] = useState([]);
  const [jikanGenreNames, setJikanGenreNames] = useState(
    [],
  );
  const { setIsTopRatedOn, setGenre, setJaikanGenre } =
    useGenres();
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    async function fetchAllGenres() {
      const token = import.meta.env.VITE_TMDB_API_TOKEN;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      };

      try {
        const [moviesRes, tvRes, animeRes] =
          await Promise.all([
            fetch(
              `https://api.themoviedb.org/3/genre/movie/list`,
              options,
            ),
            fetch(
              `https://api.themoviedb.org/3/genre/tv/list`,
              options,
            ),
            fetch(`https://api.jikan.moe/v4/genres/anime`),
          ]);

        if (!moviesRes.ok || !tvRes.ok || !animeRes.ok) {
          throw new Error("Error fetching genres");
        }

        const movieGenres = await moviesRes.json();
        const tvGenres = await tvRes.json();
        const animeGenres = await animeRes.json();
        const excludedAnimeGenreIds = [
          28, 26, 12, 9, 49, 50, 75, 58, 53, 64, 65, 73, 82,
          83, 27, 35, 15, 74,
        ];

        const animeGenresWithGenreType = animeGenres.data
          .filter(
            (anime) =>
              !excludedAnimeGenreIds.includes(anime.mal_id),
          )
          .map((anime) => ({
            ...anime,
            type: "Anime",
          }));

        const mGenresWithGenreType =
          movieGenres?.genres?.map((movieGenre) => {
            const existsInTV = tvGenres?.genres?.some(
              (tvGenre) => tvGenre.id === movieGenre.id,
            );
            return {
              ...movieGenre,
              type: existsInTV ? "Both" : "Movie",
            };
          });

        const tvGenresWithGenreType = tvGenres?.genres?.map(
          (tvGenre) => {
            const existsInMovie = movieGenres?.genres?.some(
              (movieGenre) => tvGenre.id === movieGenre.id,
            );
            return {
              ...tvGenre,
              type: existsInMovie ? "Both" : "TV",
            };
          },
        );

        const merged = [
          ...mGenresWithGenreType,
          ...tvGenresWithGenreType.filter(
            (g) =>
              !movieGenres.genres.some(
                (m) => m.id === g.id,
              ),
          ),
        ];

        setTmdbGenreNames(merged);
        setJikanGenreNames(animeGenresWithGenreType);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.log(e.message);
        }
      }
    }

    fetchAllGenres();
    return () => controller.abort();
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  onClick={() => toggleSidebar()}
                >
                  <SidebarMenuButton asChild>
                    {item.title === "Top Rated" ? (
                      <Link
                        onClick={() => {
                          setIsTopRatedOn(true);
                        }}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    ) : (
                      <Link to={item.link}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <Collapsible
                defaultOpen
                className="group/collapsible"
                open={tmdbGenreOpen}
                onOpenChange={setTmdbGenreOpen}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                      <Link>
                        <Clapperboard />
                        <span>TMDB API Genres</span>
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <SidebarMenuBadge>
                    <ChevronRight
                      size={16}
                      className={cn(
                        "transition-transform",
                        tmdbGenreOpen && "rotate-90",
                      )}
                    />
                  </SidebarMenuBadge>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {tmdbGenreNames.map((genre) => {
                        return (
                          <SidebarMenuSubItem
                            key={genre.id}
                            className={cn(
                              `flex items-center justify-between hover:bg-sidebar-accent
                              cursor-pointer rounded-sm ml-1 w-[100%] pr-1 text-[.6rem]`,
                            )}
                            onClick={() => {
                              setGenre(genre);
                              toggleSidebar();
                              if (genre.type === "Movie") {
                                navigate("movies");
                              } else if (
                                genre.type === "TV"
                              ) {
                                navigate("tvshows");
                              } else {
                                navigate("movies");
                              }
                            }}
                          >
                            <SidebarMenuSubButton
                              asChild
                              className={cn("wid")}
                            >
                              <Link>
                                <span>{genre.name}</span>
                              </Link>
                            </SidebarMenuSubButton>

                            <div className="text-[.57rem]">
                              {genre.type === "Movie" ? (
                                <span
                                  className="inline-block rounded-full px-1 py-0.5 text-[#8b8b8b]
                                    font-bold"
                                >
                                  Mov
                                </span>
                              ) : genre.type === "TV" ? (
                                <span
                                  className="inline-block rounded-full px-1 pt-0.5 text-[#8b8b8b]
                                    font-bold"
                                >
                                  TV
                                </span>
                              ) : (
                                <span
                                  className="inline-block rounded-full px-1.5 py-0.5 text-[#8b8b8b]
                                    font-bold"
                                >
                                  M & TV
                                </span>
                              )}
                            </div>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* for Jaikan Api */}
              <Collapsible
                defaultOpen
                className="group/collapsible"
                open={animeGenreOpen}
                onOpenChange={setAnimeGenreOpen}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                      <Link>
                        <Clapperboard />
                        <span>Jikan API Genres</span>
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <SidebarMenuBadge>
                    <ChevronRight
                      size={16}
                      className={cn(
                        "transition-transform",
                        animeGenreOpen && "rotate-90",
                      )}
                    />
                  </SidebarMenuBadge>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {jikanGenreNames.map((genre) => {
                        return (
                          <SidebarMenuSubItem
                            key={genre.mal_id}
                            className={cn(
                              `flex items-center justify-between hover:bg-sidebar-accent
                              cursor-pointer rounded-sm ml-1 w-[100%] pr-1 text-[.6rem]`,
                            )}
                            onClick={() => {
                              setJaikanGenre(genre);
                              toggleSidebar();
                              navigate("anime");
                            }}
                          >
                            <SidebarMenuSubButton
                              asChild
                              className={cn("wid")}
                            >
                              <Link>
                                <span>{genre.name}</span>
                              </Link>
                            </SidebarMenuSubButton>

                            <div className="text-[.57rem]">
                              <span
                                className="inline-block rounded-full px-1 py-0.5 text-[#8b8b8b]
                                  font-bold"
                              >
                                Anime
                              </span>
                            </div>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
