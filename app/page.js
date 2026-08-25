import { RobotHero } from "@/components/hero/hero";
import { Glimpses } from "@/components/glimpse/Glimpses";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <RobotHero />
      <Glimpses />
    </div>
  );
}
