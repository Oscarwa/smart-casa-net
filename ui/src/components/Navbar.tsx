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

export const Navbar = () => {
  const { clear } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    clear();
    navigate("/auth/signin");
  };

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
            <NavigationMenuItem>
              <Link to="/event">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Event
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/guests">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Guests
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/budget">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Budget
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
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
            <Link to="/account">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/account/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
