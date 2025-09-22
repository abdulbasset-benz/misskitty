import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 pl-2">
          <div className="size-10 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg font-aboreto">
              MK
            </span>
          </div>
          <span className="font-bold text-xl font-aboreto">Miss Kitty</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu className="font-poppins">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  to="/"
                  className={cn(
                    "group inline-flex h-12 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive("/") && " text-accent-foreground bg-grey-100"
                  )}
                >
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/products"
                  className={cn(
                    "group inline-flex h-12 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive("/") && " text-accent-foreground bg-grey-100"
                  )}
                >
                  Collection
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8 p-3">
                <Link
                  to="/"
                  className={cn(
                    "flex items-center py-2 text-lg font-semibold",
                    isActive("/") && "text-primary"
                  )}
                >
                  Home
                </Link>
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-semibold">Collection</span>
                  <div className="pl-4 flex flex-col gap-2">
                    <Link
                      to="/products"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      All Products
                    </Link>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
