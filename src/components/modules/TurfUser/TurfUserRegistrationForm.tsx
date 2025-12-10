/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import turfUserRegister from "@/services/auth/turfUserRegister";
import { toast } from "sonner";

const TurfUserRegisterForm = ({
  turfProfileSlug,
}: {
  turfProfileSlug: string;
}) => {
  const [state, formAction, isPending] = useActionState(turfUserRegister, null);

  const getFieldError = (fieldName: string) => {
    if (state && "errors" in state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (state && !state.success && "message" in state && state.message) {
      toast.error(state.message);
    }
  }, [state]);
  
  return (
    <form action={formAction} encType="multipart/form-data">
      <input type="hidden" name="turfProfileSlug" value={turfProfileSlug} />
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" name="name" type="text" placeholder="John Doe" />
            {getFieldError("name") && (
              <FieldDescription className="text-red-600">
                {getFieldError("name")}
              </FieldDescription>
            )}
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
            />
            {getFieldError("email") && (
              <FieldDescription className="text-red-600">
                {getFieldError("email")}
              </FieldDescription>
            )}
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" name="password" type="password" />
            {getFieldError("password") && (
              <FieldDescription className="text-red-600">
                {getFieldError("password")}
              </FieldDescription>
            )}
          </Field>

          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />
            {getFieldError("confirmPassword") && (
              <FieldDescription className="text-red-600">
                {getFieldError("confirmPassword")}
              </FieldDescription>
            )}
          </Field>

          {/* Phone */}
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input id="phone" name="phone" type="text" placeholder="+8801..." />
            {getFieldError("phone") && (
              <FieldDescription className="text-red-600">
                {getFieldError("phone")}
              </FieldDescription>
            )}
          </Field>

          {/* Photo (optional) */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="file">Photo</FieldLabel>
            <Input id="file" name="file" type="file" accept="image/*" />
            {getFieldError("photo") && (
              <FieldDescription className="text-red-600">
                {getFieldError("photo")}
              </FieldDescription>
            )}
          </Field>
        </div>

        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Already have an account?{" "}
              <a
                href={`/${turfProfileSlug}/turf-user/login`}
                className="text-blue-600 hover:underline"
              >
                Sign in
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default TurfUserRegisterForm;
