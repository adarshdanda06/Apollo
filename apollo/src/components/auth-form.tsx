import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PropTypes from 'prop-types';
import {login, signup} from '@/utils/supabase/actions'


interface AuthFormProps extends React.ComponentProps<"form"> {
  logIn: boolean;
}

export function AuthForm({
  className,
  logIn,
  ...props
}: AuthFormProps) {
  return (
    <form className={cn("flex flex-col gap-6", className)} action={logIn ? login : signup} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{logIn ? 'Login to your account' : 'Sign up for an account'}</h1>
        <p className="text-muted-foreground text-sm text-balance">
          {logIn ? 'Enter your email below to login to your account' : 'Enter your email below to sign up for an account'}
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" name="password" required />
        </div>
        <Button type="submit" className="w-full">
          {logIn ? "Login" : "Sign up"}
        </Button>
      </div>
      <div className="text-center text-sm">
        {(logIn ? "Don't have an account?" : "Already have an account?") + " "}
        <a href={logIn ? "/signup" : "/login"} className="underline underline-offset-4">
          {logIn ? "Sign up" : "Login"}
        </a>
      </div>
    </form>
  )
}

AuthForm.propTypes = {
  logIn: PropTypes.bool.isRequired,
}