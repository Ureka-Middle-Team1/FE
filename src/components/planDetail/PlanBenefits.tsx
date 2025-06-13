"use client";

import { Benefit } from "@/types/planDetail";
import BenefitCard from "./BenefitCard";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface PlanBenefitsProps {
  benefits: Benefit[];
}

export default function PlanBenefits({ benefits }: PlanBenefitsProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 20,
      origin: "center",
    },
    mode: "free-snap",
  });

  return (
    <div className="relative mt-15">
      <div ref={sliderRef} className="keen-slider px-4 py-2">
        {benefits.map((item, index) => (
          <div key={index} className="keen-slider__slide">
            <BenefitCard
              imageSrc={item.imageSrc}
              title={item.title}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
