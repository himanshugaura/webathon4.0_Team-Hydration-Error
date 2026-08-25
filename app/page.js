import { RobotHero } from "@/components/hero/hero";
import { Glimpses } from "@/components/glimpse/Glimpses";
import CountdownAndTimeline from "@/components/CountdownAndTimeline";
import { ReadyForEvent } from "@/components/hero/ready";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <RobotHero />
      <Glimpses />
      <CountdownAndTimeline />
      <ReadyForEvent />
    </div>
  );
}
