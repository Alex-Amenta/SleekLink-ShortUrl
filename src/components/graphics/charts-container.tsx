import { ClicksAreaChart } from "./areachart";
import { ClickCounterBarChart } from "./barchart";

const ChartsContainer = () => {
  return (
    <>
      <ClickCounterBarChart />
      <ClicksAreaChart />
    </>
  );
};

export default ChartsContainer;
