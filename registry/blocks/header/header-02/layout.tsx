import { ReactNode } from "react"

import Header from "./header"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="container mx-auto flex min-h-screen flex-col gap-8 py-6 max-sm:px-4 max-sm:pt-18">
        {children}
      </main>
    </>
  )
}
