import { Img, spring, staticFile } from "remotion";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { springTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { Caption1 } from "./Caption1";
import { Caption2 } from "./Caption2";

export function LongClip() {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  const scale = spring({
    fps: videoConfig.fps,
    frame,
  });

  return <>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={60}>
        <AbsoluteFill style={{
          justifyContent: "center",
          alignItems: "center",
          fontSize: 100,
          backgroundColor: "#ff6600",
        }}>
          <Img src={staticFile("awesome.png")} style={{ width: 400, height: 400, transform: `scale(${scale})` }} />
        </AbsoluteFill>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 10 })}
      />
      <TransitionSeries.Sequence durationInFrames={100}>
        <AbsoluteFill style={{
          justifyContent: "center",
          fontSize: 100,
          backgroundColor: "#ff0066",
        }}>
          <Sequence from={30} durationInFrames={20}>
            <div className="container mx-auto px-4 flex items-center justify-center text-white">
              I
            </div>
          </Sequence>
          <Sequence from={50} durationInFrames={20}>
            <div className="container mx-auto px-4 flex items-center justify-center text-white">
              am
            </div>
          </Sequence>
        </AbsoluteFill>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 10 })}
      />
      <TransitionSeries.Sequence durationInFrames={100}>
        <Caption1 text="the best there is" backgroundColor="#0066ff" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-bottom' })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 10 })}
      />
      <TransitionSeries.Sequence durationInFrames={100}>
        <Caption2 text="at what I do" backgroundColor="#ff6600" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 10 })}
      />
      <TransitionSeries.Sequence durationInFrames={100}>
        <Caption1 text="but" backgroundColor="#ffff66" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-top' })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 10 })}
      />
      <TransitionSeries.Sequence durationInFrames={100}>
        <Caption2 text="what I do best" backgroundColor="#66ffff" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 10 })}
      />
      <TransitionSeries.Sequence durationInFrames={100}>
        <Caption1 text="isn’t very nice" backgroundColor="#6666ff" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 10 })}
      />
      <TransitionSeries.Sequence durationInFrames={30}>
        <AbsoluteFill style={{
          justifyContent: "center",
          fontSize: 100,
          backgroundColor: "#000000",
        }} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </>
}
