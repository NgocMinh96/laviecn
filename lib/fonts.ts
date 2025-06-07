import { Anta, Audiowide, Emilys_Candy } from "next/font/google"

const EmilysCandy = Emilys_Candy({ subsets: ["latin"], weight: "400" })

const _Audiowide = Audiowide({ subsets: ["latin"], weight: "400" })

const _Anta = Anta({ subsets: ["latin"], weight: "400" })

export const fonts = {
  EmilysCandy: EmilysCandy.className,
  Audiowide: _Audiowide.className,
  Anta: _Anta.className,
}
