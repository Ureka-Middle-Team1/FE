"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface BenefitCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default function BenefitCard({
  imageSrc,
  title,
  description,
}: BenefitCardProps) {
  return (
    <Card className="flex h-60 w-40 flex-col items-center justify-start rounded-xl bg-white p-4 shadow-md">
      <div className="mb-3 h-24 w-24 overflow-hidden rounded-full">
        <Image
          src={imageSrc}
          alt={title}
          width={96}
          height={96}
          className="object-cover"
        />
      </div>
      <h3 className="text-center text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-center text-xs text-gray-600">{description}</p>
    </Card>
  );
}
