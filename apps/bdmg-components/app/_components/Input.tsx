"use client"

import { useState } from "react"
import { TextInput } from "@workspace/ui/components/text-input"
import { TextArea } from "@workspace/ui/components/text-area"
import { SelectInput } from "@workspace/ui/components/select-input"
import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input"
import { RadioButtonGroup } from "@workspace/ui/components/radio-button-group"

const selectOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
]

const searchableSelectOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
  { label: "Elderberry", value: "elderberry" },
  { label: "Fig", value: "fig" },
  { label: "Grape", value: "grape" },
]

const radioOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
]

export default function Input() {
  const [text, setText] = useState("")
  const [textarea, setTextarea] = useState("")
  const [select, setSelect] = useState("")
  const [searchableSelect, setSearchableSelect] = useState("")
  const [phone, setPhone] = useState("")
  const [zip, setZip] = useState("")
  const [radio, setRadio] = useState("")
  const [radio1Col, setRadio1Col] = useState("")
  const [radio2, setRadio2] = useState("")
  const [radio3, setRadio3] = useState("")
  const [radio3Col, setRadio3Col] = useState("")
  const [radio4, setRadio4] = useState("")

  return (
    <div className="p-6 space-y-8 max-w-2xl">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Form inputs</h2>
        <div className="grid gap-6 sm:grid-cols-1">
          <TextInput
            label="Text Input"
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <TextArea
            label="Text Area"
            placeholder="Enter longer text"
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
            resize={false}
            rows={4}
          />
          <SelectInput
            label="Select Input"
            placeholder="Choose an option"
            options={selectOptions}
            value={select}
            onChange={setSelect}
          />
          <SelectInput
            label="Searchable Select"
            placeholder="Search fruits..."
            options={searchableSelectOptions}
            value={searchableSelect}
            onChange={setSearchableSelect}
            searchable
            searchPlaceholder="Search..."
          />
          <PhoneNumberInput
            label="Phone Number"
            value={phone}
            onChange={setPhone}
          />
          <ZipCodeInput
            label="Zip Code"
            value={zip}
            onChange={setZip}
            hint="5 digits only"
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-foreground">
          Radio button types
        </h2>
        <div className="grid gap-8 sm:grid-cols-1">
          <RadioButtonGroup
            label="Type 1 – default (circle + label)"
            name="demo-radio-1"
            options={radioOptions}
            value={radio}
            onChange={setRadio}
            type="1"
            layout="row"
          />
          <RadioButtonGroup
            label="Type 1 – column layout"
            name="demo-radio-1-col"
            options={radioOptions}
            value={radio1Col}
            onChange={setRadio1Col}
            type="1"
            layout="column"
          />
          <RadioButtonGroup
            label="Type 2 – pill"
            name="demo-radio-2"
            options={radioOptions}
            value={radio2}
            onChange={setRadio2}
            type="2"
            layout="row"
          />
          <RadioButtonGroup
            label="Type 3 – bordered card"
            name="demo-radio-3"
            options={radioOptions}
            value={radio3}
            onChange={setRadio3}
            type="3"
            layout="row"
          />
          <RadioButtonGroup
            label="Type 3 – column layout"
            name="demo-radio-3-col"
            options={radioOptions}
            value={radio3Col}
            onChange={setRadio3Col}
            type="3"
            layout="column"
          />
          <RadioButtonGroup
            label="Type 4 – segmented control"
            name="demo-radio-4"
            options={radioOptions}
            value={radio4}
            onChange={setRadio4}
            type="4"
          />
        </div>
      </section>
    </div>
  )
}
