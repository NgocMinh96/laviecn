"use client"

import { Form, FormControl, FormField } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { PasswordInput } from "../components/password-input"

export default function PasswordInputDemo() {
  const form = useForm({
    defaultValues: {
      password: "",
    },
  })

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormControl>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              autoComplete="current-password"
              {...field}
            />
          </FormControl>
        )}
      />
    </Form>
  )
}
