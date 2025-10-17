"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Main Navbar */}
      <div className={`w-full transition-all duration-300 ${
        scrolled ? 'backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Olivebytes
              </span>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#about" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Über uns
              </a>
              <a 
                href="#projects" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Projekte
              </a>
              <a 
                href="mailto:info@olivebytes.org?subject=Kontaktaufnahme mit Olivebytes&body=Guten Tag,%0D%0A%0D%0AIch würde gerne mehr über Olivebytes erfahren.%0D%0A%0D%0AMit freundlichen Grüßen" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Kontakt
              </a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {/* Mobile menu button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="text-left">
                      <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        Olivebytes
                      </span>
                    </SheetTitle>
                    <SheetDescription className="text-left text-muted-foreground">
                      Navigation
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-8">
                    <a 
                      href="#about" 
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={handleLinkClick}
                    >
                      Über uns
                    </a>
                    <a 
                      href="#projects" 
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={handleLinkClick}
                    >
                      Projekte
                    </a>
                    <a 
                      href="mailto:info@olivebytes.org?subject=Kontaktaufnahme mit Olivebytes&body=Guten Tag,%0D%0A%0D%0AIch würde gerne mehr über Olivebytes erfahren.%0D%0A%0D%0AMit freundlichen Grüßen" 
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={handleLinkClick}
                    >
                      Kontakt
                    </a>
                    <div className="pt-6 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Theme:</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                          className="ml-auto"
                        >
                          {theme === "dark" ? (
                            <>
                              <Sun className="h-4 w-4 mr-2" />
                              Hell
                            </>
                          ) : (
                            <>
                              <Moon className="h-4 w-4 mr-2" />
                              Dunkel
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};