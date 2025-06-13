import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { ParsedPlan } from "@/types/Chat";
import { Badge } from "../ui/badge";

export default function PlanCard({
  name,
  data,
  voice,
  sms,
  price,
  tel,
}: ParsedPlan) {
  return (
    <Card className="w-full max-w-xs border-0 shadow-lg">
      <CardHeader className="relative flex items-start justify-between px-4 pb-2">
        <span className="text-sm text-gray-800">LG U+</span>
        <CardAction className="text-sm font-semibold text-pink-600">
          {price}
        </CardAction>
      </CardHeader>
      <CardContent className="px-4 pt-0">
        <CardTitle className="text-lg font-bold">{name}</CardTitle>
        {/* 배지 영역 */}
        <div className="scrollbar-hide mt-2 flex w-full gap-2 overflow-x-auto pb-1">
          <Badge
            variant="outline"
            className="border-0 bg-yellow-100 whitespace-nowrap">
            {data}
          </Badge>
          <Badge
            variant="outline"
            className="border-0 bg-yellow-100 whitespace-nowrap">
            {voice}
          </Badge>
          <Badge
            variant="outline"
            className="border-0 bg-yellow-100 whitespace-nowrap">
            SMS {sms}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
