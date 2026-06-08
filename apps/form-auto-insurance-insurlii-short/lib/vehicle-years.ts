const YEARS_API = "https://leadsubmission.enduranceapi.com/api/v2/vehicle/years"

export interface VehicleYearRow {
  id: number
  year: number
}

interface EnduranceYear {
  id: number
  name: string
}

export async function fetchYearsFromEndurance(): Promise<VehicleYearRow[]> {
  const response = await fetch(YEARS_API, {
    next: { revalidate: 86400 },
  })

  if (!response.ok) {
    throw new Error(`Endurance years API returned ${response.status}`)
  }

  const data = (await response.json()) as EnduranceYear[]

  return data
    .filter((y) => y.id !== 0 && y.name !== "0")
    .map((y) => ({
      id: y.id,
      year: parseInt(y.name, 10),
    }))
    .filter((y) => !Number.isNaN(y.year) && y.year > 0)
    .sort((a, b) => b.year - a.year)
}
