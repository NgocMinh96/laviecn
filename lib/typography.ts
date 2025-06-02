import { Emilys_Candy } from "next/font/google"

export const EmilysCandy = Emilys_Candy({ subsets: ["latin"], weight: "400" })

export const typography = {
  EmilysCandy: EmilysCandy.className,
}
