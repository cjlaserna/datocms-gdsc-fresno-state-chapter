import React from "react"
import blue from "../../assets/banners/banners-blue.png"
import red from "../../assets/banners/banners-red.png"
import yellow from "../../assets/banners/banners-yellow.png"
import green from "../../assets/banners/banners-green.png"

export default function randomBanners() {
  var bannerColors = [blue, red, yellow, green]
  var num = Math.floor(Math.random() * bannerColors.length)

  return bannerColors[num]
}
