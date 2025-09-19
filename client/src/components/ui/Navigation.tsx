import { Link, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 pl-2">
          <div className="size-10 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg font-aboreto">MK</span>
          </div>
          <span className="font-bold text-xl font-aboreto">Miss Kitty</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu className='font-poppins'>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  to="/"
                  className={cn(
                    "group inline-flex h-12 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive('/') && " text-accent-foreground bg-grey-100"
                  )}
                >
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn( "capitalize font-medium text-lg",
                    isActive('/products') && ""
                  )}
                >
                  Collection
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <div className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/products"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-yellow-200"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            All collection
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Browse our complete product catalog
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                    <div className="grid gap-1">
                      <Link
                        to="/products/electronics"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-yellow-100 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Dresses</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Latest gadgets and devices
                        </p>
                      </Link>
                      <Link
                        to="/products/clothing"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-yellow-100 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Clothing</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Fashion and apparel
                        </p>
                      </Link>
                      <Link
                        to="/products/home"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-yellow-100 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Home & Garden</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Everything for your home
                        </p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button */}
          <Button asChild className="px-10 py-5 text-lg font-semibold tracking-wider rounded-full bg-white text-black border border-transparent hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 shadow-lg font-aboreto">
            <Link to="/contact">Contact Us</Link>
          </Button>
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
                    isActive('/') && "text-primary"
                  )}
                >
                  Home
                </Link>
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-semibold">Products</span>
                  <div className="pl-4 flex flex-col gap-2">
                    <Link
                      to="/products"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      All Products
                    </Link>
                    <Link
                      to="/products/electronics"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Electronics
                    </Link>
                    <Link
                      to="/products/clothing"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clothing
                    </Link>
                    <Link
                      to="/products/home"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Home & Garden
                    </Link>
                  </div>
                </div>
                <Button asChild className="mt-4">
                  <Link to="/contact">Get Started</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;