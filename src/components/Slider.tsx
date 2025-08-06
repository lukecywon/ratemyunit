import React, { useState } from "react";
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";

export default function InputDemo() {
    const [value, setValue] = useState(50);

    return (
        <div className="card flex justify-content-center">
            <div className="w-14rem">
                <InputText value={value} onChange={(e) => setValue(e.target.value)} className="w-full" />
                <Slider value={value} onChange={(e) => setValue(e.value)} className="w-full" />
            </div>
        </div>
    )
}
