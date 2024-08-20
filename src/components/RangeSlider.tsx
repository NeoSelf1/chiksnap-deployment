import React from "react";
import { Range, getTrackBackground } from "react-range";

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: number[];
  onChange: (values: number[]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
}) => {
  return (
    <Range
      step={step}
      min={min}
      max={max}
      values={value}
      onChange={onChange}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          className="w-64 h-1 bg-gray-200 rounded-full"
          style={{
            background: getTrackBackground({
              values: value,
              colors: ["#E7EBEF", "#1F2127", "#E7EBEF"],
              min,
              max,
            }),
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div {...props} className="w-5 h-5 bg-gray-800 rounded-full shadow" />
      )}
    />
  );
};

export default RangeSlider;
