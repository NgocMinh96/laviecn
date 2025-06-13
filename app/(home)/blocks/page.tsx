import { BlockDisplay } from "@/components/block-display"

export default function BlocksPage() {
  return (
    <div className="flex flex-col gap-12 md:gap-24">
      <BlockDisplay name={"login"} key={"login"} />
    </div>
  )
}
