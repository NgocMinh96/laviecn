"use client"

import { forwardRef, useState } from "react"
import { Eye, EyeClosed, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const hasValue = value && value.toString().length > 0
    const disabled = props.disabled

    return (
      <div className="relative">
        <Input
          placeholder="••••••••"
          type={showPassword ? "text" : "password"}
          className={cn(
            "hide-password-toggle tracking-[0.3em]",
            hasValue && !disabled ? "pr-18" : "pr-10",
            className
          )}
          ref={ref}
          value={value}
          onChange={onChange}
          {...props}
        />

        {hasValue && !disabled && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground absolute top-0 right-8 h-full hover:bg-transparent!"
            onClick={() => {
              const event = {
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>
              onChange?.(event)
            }}
          >
            <X className="size-4" />
          </Button>
        )}

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground absolute top-0 right-0 h-full hover:bg-transparent!"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
        >
          <span className="relative block size-4">
            <Eye
              className={cn(
                "absolute inset-0 transition-all duration-200 ease-in-out",
                showPassword && !disabled
                  ? "scale-100 opacity-100"
                  : "scale-90 opacity-0"
              )}
            />
            <EyeClosed
              className={cn(
                "absolute inset-0 transition-all duration-200 ease-in-out",
                !showPassword || disabled
                  ? "scale-100 opacity-100"
                  : "scale-90 opacity-0"
              )}
            />
          </span>
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>

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
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
