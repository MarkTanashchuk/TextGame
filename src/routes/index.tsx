import { useSnapshot } from "valtio";

import { ResponsiveWrapper } from "../features";
import { world } from "../stores/world";

export default function App() {
  const state = useSnapshot(world);
  console.log(state);
  return <ResponsiveWrapper>App</ResponsiveWrapper>;
}
