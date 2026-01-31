"use client";

import React, { forwardRef } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ReactCountryFlag from "react-country-flag";
import { cn } from "@/lib/utils";

/* =========================
   Phone Input Wrapper
========================= */

export function PhoneNumberInput({ value, onChange, className }) {
  return (
    <PhoneInput
      international
      defaultCountry="DZ"
      value={value}
      onChange={onChange}
      className={cn(
        "flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm",
        className
      )}
      countrySelectComponent={CountrySelect}
      inputComponent={Input}
    />
  );
}

/* =========================
   Country Selector (Flags)
========================= */

function CountrySelect({ value, onChange, options }) {
  const selected = options.find((option) => option.value === value);

  const callingCode = selected?.label?.match(/\+\d+/)?.[0] || "";

  return (
    <div className="relative flex items-center gap-2 mr-2">
      {value && (
        <ReactCountryFlag
          svg
          countryCode={value}
          className="h-5 w-5 rounded-sm"
        />
      )}

      {/* Visible selected value (NO country name) */}
      <span className="text-sm font-medium cursor-pointer">{callingCode}</span>

      {/* Hidden select overlay (shows full names on click) */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value || undefined)}
        className="absolute bottom-0 inset-0 opacity-0 cursor-pointer"
      >
        {options.map((option, index) => (
          <option
            key={`${option.value || "country"}-${index}`}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}



/* =========================
   Input (shadcn-style)
========================= */

const Input = forwardRef(function Input(props, ref) {
  return (
    <input
      ref={ref}
      {...props}
      className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
    />
  );
});
