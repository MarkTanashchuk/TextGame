import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { subscribeKey } from "valtio/utils";

import { ResponsiveWrapper, Menu } from "../features";
import { Chat } from "../features/chat";
import { Panel } from "../features/panel";
import { world } from "../stores/world";

const sessionId = nanoid();
export default function App() {
  const { actions, character, currentLocation, points, messages } = useSnapshot(
    world.state
  );

  function currentLocationListener() {
    world.api.addCurrentRoomInformation(sessionId);

    const unsubscribe = subscribeKey(world.state, "currentLocation", () => {
      world.api.addCurrentRoomInformation(sessionId);
    });

    return () => {
      unsubscribe();
    };
  }

  useEffect(currentLocationListener, []);

  if (currentLocation === null) {
    return <Menu changeLocation={() => world.api.changeLocation("Кабінет")} />;
  }

  return (
    <ResponsiveWrapper>
      <Panel
        actions={actions}
        characterInfo={character}
        points={points}
        title={currentLocation}
        activateAction={world.api.activateAction}
      />
      <Chat restartGame={world.api.restartGame} messages={messages} />
    </ResponsiveWrapper>
  );
}
