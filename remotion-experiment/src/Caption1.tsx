import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import { Balls } from "./Balls";

export function Caption1(props: { text: string; backgroundColor: string; }) {
  const frame = useCurrentFrame();
  
  const { fps } = useVideoConfig();
  const scale = spring({
    fps: fps,
    frame: frame
  });

  return (
    <AbsoluteFill style={{
      justifyContent: "center",
      textAlign: "center",
      fontSize: 100,
      color: "white",
      backgroundColor: props.backgroundColor
    }}>
      <Balls />
      <p style={{ transform: `scale(${scale})` }}>
        {props.text}
      </p>
    </AbsoluteFill>
  );
}
