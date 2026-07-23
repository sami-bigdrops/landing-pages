"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@workspace/ui/lib/utils"
import {
  parseAddressComponents,
  parseCityStateFromPrediction,
} from "@/lib/parse-place-address"

type GMapsPlacePrediction = {
  place_id: string
  description: string
  structured_formatting: {
    main_text: string
    secondary_text: string
  }
  terms?: Array<{ offset: number; value: string }>
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

export type AddressResult = {
  address: string
  city: string
  state: string
  zipCode: string
}

export interface AddressAutocompleteProps {
  id?: string
  label?: string
  value: string
  city?: string
  state?: string
  zipCode?: string
  onChange: (value: string) => void
  onPlaceSelect: (details: AddressResult) => void
  placeholder?: string
  labelClassName?: string
  className?: string
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

function normalizeZip(zip: string): string {
  return zip.replace(/\D/g, "").slice(0, 5)
}

export function AddressAutocomplete({
  id,
  label,
  value,
  city = "",
  state = "",
  zipCode = "",
  onChange,
  onPlaceSelect,
  placeholder = "Enter Your Street Address",
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
    if (!apiKey) {
      console.warn("[AddressAutocomplete] NEXT_PUBLIC_GOOGLE_PLACES_API_KEY is not set")
      return
    }

    let cancelled = false
    loadGoogleMaps(apiKey)
      .then(() => {
        if (cancelled) return
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
      .catch((error) => {
        console.error("[AddressAutocomplete] failed to load Google Maps", error)
      })

    return () => {
      cancelled = true
    }
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
        {
          input,
          types: ["address"],
          componentRestrictions: { country: "us" },
        },
        (preds, status) => {
          setIsFetching(false)
          const win = window as unknown as GMapsWindow
          const OK = win.google?.maps?.places?.PlacesServiceStatus?.OK ?? "OK"
          if (status !== OK || !preds) {
            setPredictions([])
            setShowDropdown(false)
            return
          }
          setPredictions(preds)
          setShowDropdown(preds.length > 0)
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

    const selectedMainText = pred.structured_formatting.main_text.trim()
    const fallbackCityState = parseCityStateFromPrediction(pred)

    onChange(selectedMainText)

    const applySelection = (result: AddressResult) => {
      onChange(result.address)
      onPlaceSelect(result)
    }

    if (!placesRef.current) {
      applySelection({
        address: selectedMainText,
        city: fallbackCityState.city,
        state: fallbackCityState.state,
        zipCode: "",
      })
      return
    }

    placesRef.current.getDetails(
      { placeId: pred.place_id, fields: ["address_components"] },
      (place) => {
        if (!place?.address_components) {
          applySelection({
            address: selectedMainText,
            city: fallbackCityState.city,
            state: fallbackCityState.state,
            zipCode: "",
          })
          return
        }

        const { streetNumber, route, parsedCity, parsedState, parsedZip } = parseAddressComponents(
          place.address_components
        )
        const address =
          (streetNumber ? `${streetNumber} ${route}`.trim() : route.trim()) || selectedMainText

        applySelection({
          address,
          city: parsedCity || fallbackCityState.city,
          state: parsedState || fallbackCityState.state,
          zipCode: normalizeZip(parsedZip),
        })
      }
    )
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      {label ? (
        <label
          htmlFor={id}
          className={cn("mb-1.5 block text-sm font-medium leading-none text-foreground", labelClassName)}
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
            "w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-base font-normal text-foreground shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            className
          )}
          aria-autocomplete="list"
        />
        {isFetching ? (
          <span
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-[#2F6FED] border-t-transparent animate-spin"
            aria-hidden
          />
        ) : null}
      </div>

      {showDropdown && predictions.length > 0 ? (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-[5px] border border-[#102E50] bg-white shadow-lg">
          {predictions.map((pred) => (
            <button
              key={pred.place_id}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                handleSelect(pred)
              }}
              className="w-full cursor-pointer border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-[#F3F6FE]"
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

      {(city || state) ? (
        <p className="mt-2 text-left text-[0.7rem] font-medium text-[#1C1C1C] xl:text-[0.8rem]">
          {[city, state].filter(Boolean).join(", ")}
          {zipCode ? ` ${zipCode}` : ""}
        </p>
      ) : null}
    </div>
  )
}
