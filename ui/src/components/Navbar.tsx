import { useContext } from "react";
import { useNavigate, Link } from "react-router";
import { AppContext } from "@/AppContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { t } = useTranslation();
  const { clear, currentEvent, setCurrentEvent, events } =
    useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    clear();
    navigate("/auth/signin");
  };

  const hasEvents = events.length > 0;
  if (hasEvents && events.length === 1 && currentEvent === null) {
    setCurrentEvent(events[0]);
  }

  return (
    <nav className="w-full shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">Logo</Link>
      </div>
      <div className="flex gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                      >
                        <div className="text-sm font-medium leading-none">
                          Option 1
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          <div>help</div>
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                      >
                        <div className="text-sm font-medium leading-none">
                          Option 2
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          <div>help</div>
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
            {!hasEvents ? (
              <NavigationMenuItem>
                <Link to="/events/create">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {t("firstEvent")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ) : (
              <>
                <strong className="mr-8">
                  <Link to="/events">
                    {t("event")}: <u>{currentEvent?.name}</u>
                  </Link>
                </strong>
                {currentEvent && (
                  <NavigationMenuItem>
                    <Link to={`/events/${currentEvent.id}/guests`}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {t("guests")}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )}
                {currentEvent && (
                  <NavigationMenuItem>
                    <Link to={`/events/${currentEvent.id}/budgets`}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {t("budgets")}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )}
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://via.placeholder.com/40" alt="User" />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link to="/account">{t("profile")}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/account/settings">{t("settings")}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>{t("logout")}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
