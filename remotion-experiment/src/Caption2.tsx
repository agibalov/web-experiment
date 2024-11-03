import { useCurrentFrame, useVideoConfig, AbsoluteFill, spring } from "remotion";

export function Caption2(props: { text: string; backgroundColor: string; }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      justifyContent: "center",
      textAlign: "center",
      fontSize: 100,
      color: "white",
      backgroundColor: props.backgroundColor
    }}>
      <p>
        {props.text.split(' ').map((word, index) => {
          const scale = spring({
            fps: fps,
            frame: frame,
            delay: index * 10
          });

          return (
            <span key={word} style={{
              marginLeft: 20,
              marginRight: 20,
              display: 'inline-block',
              transform: `scale(${scale})`
            }}>
              {word}
            </span>
          );
        })}
      </p>
    </AbsoluteFill>
  );
}
