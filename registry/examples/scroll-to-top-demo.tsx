import ScrollToTop from "../components/scroll-to-top"

export function ScrollToTopDemo() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <span className="text-3xl font-bold">scroll to see the button at bottom right </span>
      </div>
      <ScrollToTop />
    </>
  )
}
