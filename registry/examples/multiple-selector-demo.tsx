import MultipleSelector from "../components/multiple-selector"

const options = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Ajax", value: "ajax" },
  { label: "Angular", value: "angular" },
  { label: "Remix", value: "remix" },
]

export default function MultipleSelectorDemo() {
  return (
    <div>
      <MultipleSelector
        size="md"
        commandProps={{
          label: "Select frameworks",
        }}
        defaultOptions={options}
        placeholder="Multiple Select"
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
        className="w-2xs"
      />
    </div>
  )
}
