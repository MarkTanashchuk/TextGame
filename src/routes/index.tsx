import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { subscribeKey } from "valtio/utils";

import { ResponsiveWrapper, Menu } from "../features";
import { world } from "../stores/world";

const sessionId = nanoid();
export default function App() {
  const state = useSnapshot(world.state);

  function currentLocationListener() {
    world.api.addCurrentRoomInformation(sessionId);

    const unsubscribe = subscribeKey(world.state, "currentLocation", () => {
      world.api.addCurrentRoomInformation(sessionId);
      console.log(state);
    });

    return () => {
      unsubscribe();
    };
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(currentLocationListener, []);

  if (state.currentLocation === null) {
    return <Menu changeLocation={() => world.api.changeLocation("Кабінет")} />;
  }

  return <ResponsiveWrapper>App</ResponsiveWrapper>;
}
