"use client"

import { forwardRef, useState } from "react"
import { Eye, EyeClosed } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const disabled = props.value === "" || props.value === undefined || props.disabled

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("hide-password-toggle pr-10", className)}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-0 right-0 h-full px-3 py-2 text-muted-foreground hover:bg-transparent!"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
      >
        <span className="relative block w-4 h-4">
          <Eye
            className={cn(
              "absolute inset-0 transition-all duration-200 ease-in-out",
              showPassword && !disabled ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
          />
          <EyeClosed
            className={cn(
              "absolute inset-0 transition-all duration-200 ease-in-out",
              !showPassword || disabled ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
          />
        </span>
        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
      </Button>

      {/* hides browsers password toggles */}
      <style>
        {`
        .hide-password-toggle::-ms-reveal,
        .hide-password-toggle::-ms-clear {
          visibility: hidden;
          pointer-events: none;
          display: none;
        }
			`}
      </style>
    </div>
  )
})
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
