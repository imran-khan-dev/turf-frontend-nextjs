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
import createTurfField from "@/services/turf/createTurfField";

interface TurfFieldFormProps {
  turfProfileId: string;
}

const TurfFieldForm: React.FC<TurfFieldFormProps> = ({ turfProfileId }) => {
  const [state, formAction, isPending] = useActionState(createTurfField, null);

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

    if (state && state.success) {
      toast.success("Turf field created successfully!");
    }
  }, [state]);

  return (
    <form action={formAction} encType="multipart/form-data">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Turf Field Name</FieldLabel>
          <Input id="name" name="name" placeholder="Main Field" />
          {getFieldError("name") && (
            <FieldDescription className="text-red-600">
              {getFieldError("name")}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="pricePerSlot">Price per Slot</FieldLabel>
          <Input
            id="pricePerSlot"
            name="pricePerSlot"
            type="number"
            placeholder="500"
          />
          {getFieldError("pricePerSlot") && (
            <FieldDescription className="text-red-600">
              {getFieldError("pricePerSlot")}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="slotDuration">
            Slot Duration (minutes)
          </FieldLabel>
          <Input
            id="slotDuration"
            name="slotDuration"
            type="number"
            placeholder="90"
          />
          {getFieldError("slotDuration") && (
            <FieldDescription className="text-red-600">
              {getFieldError("slotDuration")}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="available">Available</FieldLabel>
          <select
            id="available"
            name="available"
            className="border rounded p-2 w-full"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {getFieldError("available") && (
            <FieldDescription className="text-red-600">
              {getFieldError("available")}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="photos">Photos</FieldLabel>
          <Input
            id="photos"
            name="photos"
            type="file"
            accept="image/*"
            multiple
          />
          {getFieldError("photos") && (
            <FieldDescription className="text-red-600">
              {getFieldError("photos")}
            </FieldDescription>
          )}
        </Field>

        {/* Hidden turfProfileId */}
        <Input type="hidden" name="turfProfileId" value={turfProfileId} />

        <FieldGroup className="mt-4">
          <div className="mt-6 flex justify-center">
            <Button
              type="submit"
              disabled={isPending}
              className="text-sm px-4 py-2"
            >
              {isPending ? "Adding..." : "Add Turf Field"}
            </Button>
          </div>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default TurfFieldForm;
