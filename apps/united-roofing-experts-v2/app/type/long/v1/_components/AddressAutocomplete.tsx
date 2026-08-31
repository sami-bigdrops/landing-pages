"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import { cn } from "@workspace/ui/lib/utils"

type GMapsPlacePrediction = {
  place_id: string
  description: string
  structured_formatting: {
    main_text: string
    secondary_text: string
  }
}

type GMapsAddressComponent = {
  long_name: string
  short_name: string
  types: string[]
}

type GMapsPlaceResult = {
  address_components?: GMapsAddressComponent[]
}

type GMapsAutocompleteService = {
  getPlacePredictions(
    req: { input: string; types: string[]; componentRestrictions: { country: string } },
    cb: (predictions: GMapsPlacePrediction[] | null, status: string) => void
  ): void
}

type GMapsPlacesService = {
  getDetails(
    req: { placeId: string; fields: string[] },
    cb: (result: GMapsPlaceResult | null, status: string) => void
  ): void
}

type GMapsWindow = {
  google?: {
    maps?: {
      places?: {
        AutocompleteService: new () => GMapsAutocompleteService
        PlacesService: new (el: HTMLElement) => GMapsPlacesService
        PlacesServiceStatus: { OK: string }
      }
    }
  }
}

let googleMapsLoadPromise: Promise<void> | null = null

function loadGoogleMaps(apiKey: string): Promise<void> {
  if (googleMapsLoadPromise) return googleMapsLoadPromise
  const win = window as unknown as GMapsWindow
  if (win.google?.maps?.places) {
    googleMapsLoadPromise = Promise.resolve()
    return googleMapsLoadPromise
  }
  googleMapsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load Google Maps"))
    document.head.appendChild(script)
  })
  return googleMapsLoadPromise
}

export interface AddressAutocompleteProps {
  id?: string
  label?: string | null
  value: string
  onChange: (value: string) => void
  onPlaceSelect: (details: { address: string; city: string; state: string; zipCode: string }) => void
  placeholder?: string
  labelClassName?: string
  className?: string
  googleReady?: boolean
}

export function AddressAutocomplete({
  id,
  label = "Address",
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Address",
  labelClassName,
  className,
}: AddressAutocompleteProps) {
  const [predictions, setPredictions] = useState<GMapsPlacePrediction[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [mapsReady, setMapsReady] = useState(false)

  const autocompleteRef = useRef<GMapsAutocompleteService | null>(null)
  const placesRef = useRef<GMapsPlacesService | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hiddenDivRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
    if (!apiKey) return

    loadGoogleMaps(apiKey)
      .then(() => {
        const win = window as unknown as GMapsWindow
        const places = win.google?.maps?.places
        if (!places) return
        autocompleteRef.current = new places.AutocompleteService()
        if (!hiddenDivRef.current) {
          hiddenDivRef.current = document.createElement("div")
        }
        placesRef.current = new places.PlacesService(hiddenDivRef.current)
        setMapsReady(true)
      })
      .catch(() => {
        // Google Maps failed to load; manual entry still works
      })
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const fetchPredictions = useCallback(
    (input: string) => {
      if (!autocompleteRef.current || !mapsReady) return
      setIsFetching(true)
      autocompleteRef.current.getPlacePredictions(
        { input, types: ["address"], componentRestrictions: { country: "us" } },
        (preds, status) => {
          setIsFetching(false)
          const win = window as unknown as GMapsWindow
          const OK = win.google?.maps?.places?.PlacesServiceStatus?.OK ?? "OK"
          if (status === OK && preds?.length) {
            setPredictions(preds)
            setShowDropdown(true)
          } else {
            setPredictions([])
            setShowDropdown(false)
          }
        }
      )
    },
    [mapsReady]
  )

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!inputValue.trim() || inputValue.length < 3) {
      setPredictions([])
      setShowDropdown(false)
      return
    }
    debounceRef.current = setTimeout(() => fetchPredictions(inputValue), 300)
  }

  const handleSelect = (pred: GMapsPlacePrediction) => {
    setShowDropdown(false)
    setPredictions([])

    const mainText = pred.structured_formatting.main_text
    onChange(mainText)

    if (!placesRef.current) return

    placesRef.current.getDetails(
      { placeId: pred.place_id, fields: ["address_components"] },
      (place) => {
        if (!place?.address_components) return

        let streetNumber = ""
        let route = ""
        let city = ""
        let state = ""
        let zipCode = ""

        for (const component of place.address_components) {
          if (component.types.includes("street_number")) streetNumber = component.long_name
          if (component.types.includes("route")) route = component.long_name
          if (component.types.includes("locality")) city = component.long_name
          if (component.types.includes("sublocality_level_1") && !city) {
            city = component.long_name
          }
          if (component.types.includes("administrative_area_level_1")) {
            state = component.short_name
          }
          if (component.types.includes("postal_code")) {
            zipCode = component.long_name.replace(/\D/g, "").slice(0, 5)
          }
        }

        const address = streetNumber ? `${streetNumber} ${route}`.trim() : route.trim()

        onChange(address || mainText)
        onPlaceSelect({
          address: address || mainText,
          city: city.trim(),
          state: state.trim().toUpperCase().slice(0, 2),
          zipCode,
        })
      }
    )
  }

  return (
    <div className="relative space-y-1.5" ref={containerRef}>
      {label ? (
        <label
          htmlFor={id}
          className={cn("text-sm font-medium text-foreground leading-none", labelClassName)}
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (predictions.length > 0) setShowDropdown(true)
          }}
          placeholder={placeholder}
          autoComplete="off"
          className={cn(
            "w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-base font-normal text-foreground shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            className
          )}
          aria-autocomplete="list"
          aria-expanded={showDropdown && predictions.length > 0}
        />
        {isFetching ? (
          <span
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin rounded-full border-2 border-[#102E50] border-t-transparent"
            aria-hidden
          />
        ) : null}
      </div>

      {showDropdown && predictions.length > 0 ? (
        <div className="absolute z-[100] mt-1 w-full overflow-hidden rounded-[5px] border border-[#102E50] bg-white shadow-lg">
          {predictions.map((pred) => (
            <button
              key={pred.place_id}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                handleSelect(pred)
              }}
              className="w-full cursor-pointer border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-[#fde9ea]"
            >
              <p className="truncate text-sm font-medium text-[#111827]">
                {pred.structured_formatting.main_text}
              </p>
              <p className="mt-0.5 truncate text-xs text-[#6B7280]">
                {pred.structured_formatting.secondary_text}
              </p>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
