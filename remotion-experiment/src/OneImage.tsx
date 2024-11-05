import { getInputProps, Img, staticFile } from "remotion";
import { AbsoluteFill } from "remotion";

export function OneImage() {
  const { mode } = getInputProps<{mode: string}>()

  return (<>
    <AbsoluteFill style={{
      justifyContent: "center",
      alignItems: "center",
      fontSize: 100,
      backgroundColor: "#ff6600",
    }}>
      <Img src={staticFile("awesome.png")} style={{ width: 200, height: 200 }} />
      <h1 className="text-white">Hello World!</h1>
      <p className="text-lg">mode: {mode ?? "<not set>"}</p>
    </AbsoluteFill>
  </>)
}
