
import * as React from "react"
import { X } from "lucide-react"
import { Command as CommandPrimitive } from "cmdk"
import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"

export type Option = {
  value: string
  label: string
  disable?: boolean
  /** fixed options can't be removed */
  fixed?: boolean
}

type MultiSelectorProps = {
  value?: Option[]
  defaultOptions?: Option[]
  placeholder?: string
  /** manually controlled options */
  options?: Option[]
  /** async options */
  loadOptions?: (inputValue: string) => Promise<Option[]>
  /** can create new options */
  creatable?: boolean
  /** delay in ms before loading options */
  delay?: number
  /** callback when value changes */
  onChange?: (options: Option[]) => void
  /** max limit of selected options */
  maxSelected?: number
  /** custom classNames */
  className?: string
  /** custom badge render */
  badgeRender?: (option: Option, index: number) => React.ReactNode
}

export function MultipleSelector({
  value = [],
  defaultOptions = [],
  placeholder,
  options: controlledOptions,
  loadOptions,
  creatable = false,
  delay = 300,
  onChange,
  maxSelected,
  className,
  badgeRender,
}: MultiSelectorProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [options, setOptions] = React.useState<Option[]>(
    controlledOptions || defaultOptions || []
  )
  const [selected, setSelected] = React.useState<Option[]>(value || [])
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUnselect = React.useCallback(
    (option: Option) => {
      const newSelected = selected.filter((s) => s.value !== option.value)
      setSelected(newSelected)
      onChange?.(newSelected)
    },
    [onChange, selected]
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && selected.length > 0) {
            const lastSelected = selected[selected.length - 1]
            if (!lastSelected.fixed) {
              handleUnselect(lastSelected)
            }
          }
        }
        // This is not a default behavior of the <input /> field
        if (e.key === "Escape") {
          input.blur()
        }
      }
    },
    [handleUnselect, selected]
  )

  React.useEffect(() => {
    if (controlledOptions) {
      setOptions(controlledOptions)
    }
  }, [controlledOptions])

  React.useEffect(() => {
    const loadOptionsDelayed = setTimeout(async () => {
      if (!loadOptions || inputValue === "") return
      setIsLoading(true)
      const newOptions = await loadOptions(inputValue)
      setOptions(newOptions)
      setIsLoading(false)
    }, delay)

    return () => clearTimeout(loadOptionsDelayed)
  }, [delay, inputValue, loadOptions])

  const createOption = React.useCallback(
    (inputValue: string) => {
      const newOption = {
        value: inputValue.toLowerCase(),
        label: inputValue,
      }
      setOptions((prev) => [...prev, newOption])
      const newSelected = [...selected, newOption]
      setSelected(newSelected)
      onChange?.(newSelected)
      setInputValue("")
    },
    [onChange, selected]
  )

  const handleSelect = React.useCallback(
    (option: Option) => {
      const newSelected = [...selected, option]
      setSelected(newSelected)
      onChange?.(newSelected)
      setInputValue("")
    },
    [onChange, selected]
  )

  const selectables = options.filter(
    (option) => !selected.some((s) => s.value === option.value)
  )

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={`overflow-visible bg-transparent ${className}`}
      shouldFilter={false}
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((option, index) => (
            <Badge
              key={option.value}
              className="bg-purple-100 text-purple-800 hover:bg-purple-200 data-[fixed]:bg-purple-200 data-[fixed]:hover:bg-purple-200"
              data-fixed={option.fixed}
              variant="secondary"
            >
              {badgeRender ? (
                badgeRender(option, index)
              ) : (
                <>
                  {option.label}
                  {!option.fixed && (
                    <button
                      type="button"
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onClick={() => handleUnselect(option)}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </>
              )}
            </Badge>
          ))}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            disabled={maxSelected !== undefined && selected.length >= maxSelected}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative">
        {open && (selectables.length > 0 || (creatable && inputValue.length > 0)) ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {creatable && inputValue.length > 0 && (
                <CommandItem
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onSelect={() => createOption(inputValue)}
                  className="flex items-center gap-2 text-sm"
                >
                  Create &quot;{inputValue}&quot;
                </CommandItem>
              )}
              {selectables.map((option) => (
                <CommandItem
                  key={option.value}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onSelect={() => handleSelect(option)}
                  className="flex items-center gap-2 text-sm"
                  disabled={option.disable}
                >
                  {option.label}
                </CommandItem>
              ))}
              {isLoading && <CommandItem>Loading...</CommandItem>}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  )
}
