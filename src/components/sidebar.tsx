"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  BarChart3,
  Settings,
  Star,
  LinkIcon,
  Users,
  Building,
  LogOut,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SidebarProps {
  isAdmin?: boolean
}

export default function Sidebar({ isAdmin = false }: SidebarProps) {
  const location = useLocation()
  const pathname = location.pathname
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const adminLinks = [
    { name: "Dashboard", href: "/components/admin/dashboard", icon: BarChart3 },
    { name: "Businesses", href: "/components/admin/businesses", icon: Building },
    { name: "Users", href: "/components/admin/users", icon: Users },
    { name: "Settings", href: "/components/admin/settings", icon: Settings },
  ]

  const businessLinks = [
    { name: "Dashboard", href: "/components/business/dashboard", icon: BarChart3 },
    { name: "Reviews", href: "/components/business/reviews", icon: Star },
    { name: "Review Link", href: "/components/business/review-link", icon: LinkIcon },
    { name: "Settings", href: "/components/business/settings", icon: Settings },
  ]

  const links = isAdmin ? adminLinks : businessLinks

  const handleLogout = () => {
    window.location.href = "/login"
  }

  const SidebarContent = () => (
    <div className="h-full flex flex-col pt-12 bg-orange-50 text-orange-900 shadow-md rounded-r-xl overflow-hidden animate-fade-in">
      
      <div className="flex-1 px-5 py-6 overflow-y-auto">
        <nav
          className="space-y-2"
          aria-label={isAdmin ? "Admin navigation" : "Business navigation"}
        >
          {links.map((link, index) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "group flex items-center gap-4 rounded-lg px-4 py-3 text-base font-medium transition-all duration-300 ease-in-out transform",
                  isActive
                    ? "bg-orange-500 text-white shadow-md"
                    : "hover:bg-orange-100 hover:text-orange-800 hover:translate-x-1"
                )}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <link.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="transition-opacity duration-300">{link.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-orange-200">
        <Button
          variant="ghost"
          className="w-full flex items-center gap-3 justify-start text-red-600 hover:text-white hover:bg-red-500 px-4 py-2 transition-all duration-300 rounded-lg"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )

  if (!mounted) return null

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50 text-orange-700 bg-white rounded-full shadow-lg border border-orange-200"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 bg-orange-50 text-orange-900 w-64 animate-slide-in-left"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-orange-200 bg-orange-50">
        <SidebarContent />
      </div>
    </>
  )
}
