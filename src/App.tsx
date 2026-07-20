import React from "react";

import {
  Swatch,
  SwatchPicker,
  SwatchPickerModeToggle,
  SwatchPickerPreview,
  SwatchPickerSavedSwatches,
  SwatchPickerWheel,
  getLastSavedMode,
} from "@/components/SwatchPicker";

function App() {
  const [swatch, setSwatch] = React.useState<Swatch>({
    mode: "gradient",
    colors: ["#bdc3c7", "#bdc3c7"],
  });

  return (
    <main className="flex size-full flex-col items-center justify-center">
      <SwatchPicker
        onSwatchChange={(color) => console.log("Swatch changed: ", color)}
        onSwatchSave={(color) => console.log("Swatch saved: ", color)}
        swatch={swatch}
        // disabled
      >
        <div className="flex flex-col items-center gap-5 p-4 font-sans">
          <SwatchPickerModeToggle />

          <SwatchPickerWheel />
          <SwatchPickerPreview />

          <SwatchPickerSavedSwatches />
        </div>
      </SwatchPicker>

      <button
        className="bg-orange-60 text-white h-12 cursor-pointer rounded-full px-4 typography-label-30"
        onClick={() => {
          console.log("Last saved mode was: ", getLastSavedMode());
          setSwatch({ mode: "gradient", colors: ["#bdc3c7", "#bdc3c7"] });
        }}
      >
        Set To Predefined Swatch
      </button>
    </main>
  );
}

export default App;
