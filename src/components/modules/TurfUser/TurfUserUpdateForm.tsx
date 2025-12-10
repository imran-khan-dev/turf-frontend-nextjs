/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import updateTurfUserAction from "@/services/turf/updateTurfUserProfile";

interface TurfUserUpdateProfileForm {
  turfUser: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    photo?: string | null;
  };
}

const TurfUserUpdateProfileForm: React.FC<TurfUserUpdateProfileForm> = ({
  turfUser,
}) => {
  const [state, formAction, isPending] = useActionState(
    updateTurfUserAction,
    null
  );

  const getFieldError = (fieldName: string) => {
    if (state && "errors" in state) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error ? error.message : null;
    }
  
    return null;
  };

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    console.log("profileResult", state);
    if (state && state.success) {
      toast.success("Profile updated successfully!");
    }
  }, [state]);

  return (
    <form action={formAction} encType="multipart/form-data">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" name="name" defaultValue={turfUser.name} />
          {getFieldError("name") && (
            <FieldDescription className="text-red-600">
              {getFieldError("name")}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={turfUser.email}
          />
          {getFieldError("email") && (
            <FieldDescription className="text-red-600">
              {getFieldError("email")}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
          <Input id="phone" name="phone" defaultValue={turfUser.phone} />
          {getFieldError("phone") && (
            <FieldDescription className="text-red-600">
              {getFieldError("phone")}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="photo">Profile Image</FieldLabel>
          <Input id="file" name="file" type="file" accept="image/*" />
          {getFieldError("photo") && (
            <FieldDescription className="text-red-600">
              {getFieldError("photo")}
            </FieldDescription>
          )}
        </Field>

        {/* Hidden turfUserId */}
        <Input type="hidden" name="turfUserId" value={turfUser.id} />

        <FieldGroup className="mt-4">
          <div className="mt-6 flex justify-center">
            <Button
              type="submit"
              disabled={isPending}
              className="text-sm px-4 py-2"
            >
              {isPending ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default TurfUserUpdateProfileForm;
