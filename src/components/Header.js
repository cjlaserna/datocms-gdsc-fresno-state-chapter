import React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import googleDevLogo from "../assets/google_developers_logomark_color.png"
import { useTheme } from "next-themes"
import { FiMoon, FiSun } from "react-icons/fi"
import Link from "next/link"
import { navLinks } from "./NavLinks"
// import { useLocalStorage } from "next-local-storage"
// header / navbar

// @TODO Pages: Home, Highlights (Show up to 3), Events, Organizers, Contact Us
export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const body = document.body
    body.setAttribute("data-theme", theme)
  }, [theme])

  const renderThemeChanger = () => {
    if (!mounted) return null
    const currentTheme = theme === "system" ? systemTheme : theme
    if (currentTheme === "business") {
      return (
        <>
          <FiSun className="w-5 h-5" role="button" onClick={() => setTheme("corporate")} />
          <p className="lg:hidden md:hidden sm:block" onClick={() => setTheme("corporate")}>
            Set Light Mode
          </p>
        </>
      )
    } else {
      return (
        <>
          <FiMoon className="w-5 h-5 " role="button" onClick={() => setTheme("business")} />
          <p className="lg:hidden md:hidden sm:block" onClick={() => setTheme("business")}>
            Set Dark Mode
          </p>
        </>
      )
    }
  }

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-base-100 text-sm py-4 dark:bg-gray-800">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-x-2 text-xl dark:text-white">
            <div className="w-10 h-auto flex items-center justify-center">
              <Image src={googleDevLogo} alt="Google Student Developers Club Logo" />
            </div>
            <p className="whitespace-nowrap">
              <Link href="/">GDSC - Fresno State</Link>
            </p>
          </div>
          <div className="dropdown dropdown-left sm:hidden">
            <label tabIndex="0" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks.map((link, index) => {
                return (
                  <li key={index}>
                    <Link href={link.path}>{link.name}</Link>
                  </li>
                )
              })}
              <li>{renderThemeChanger()}</li>
            </ul>
          </div>
        </div>
        <div
          id="navbar-image-and-text-2"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
            {navLinks.map((link, index) => {
              return (
                <Link key={index} href={link.path}>
                  {link.name}
                </Link>
              )
            })}
            {/* light / dark mode */}
            <div>{renderThemeChanger()}</div>
          </div>
        </div>
      </nav>
    </header>
  )
}
