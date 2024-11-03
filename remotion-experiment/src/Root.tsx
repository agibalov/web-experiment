import './tailwind.css';
import { Composition } from "remotion";
import { LongClip } from "./LongClip";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition 
        id="LongClip"
        component={LongClip} 
        durationInFrames={620}
        fps={30}
        width={480}
        height={640} />
    </>
  );
};
