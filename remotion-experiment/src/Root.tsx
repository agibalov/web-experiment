import './tailwind.css';
import { Composition, Still } from "remotion";
import { LongClip } from "./LongClip";
import { OneImage } from "./OneImage";

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
      <Still
        id="OneImage"
        component={OneImage}
        width={800}
        height={600} />
    </>
  );
};
