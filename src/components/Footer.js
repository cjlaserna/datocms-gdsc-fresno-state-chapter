import React from "react"
import Link from "next/link"
import googleDevLogo from "../assets/google_developers_logomark_color.png"
import Image from "next/image"
import { BsInstagram } from "react-icons/bs"
export default function Footer({ links }) {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <div>
        <div className="w-10 h-auto flex items-center justify-center">
          <Image src={googleDevLogo} alt="Google Student Developers Club Logo" />
        </div>
        <p>
          GDSC - CSU Fresno
          <br />
          Fresno State GDSC Club
        </p>
      </div>
      <div>
        <span className="footer-title">Social</span>
        <div className="grid grid-flow-col gap-4">
          <Link href={"https://www.instagram.com/gdsc.fresnostate/"} target="_blank">
            <span className=" hover:cursor-pointer underline">
              <BsInstagram />
              Instagram
            </span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
