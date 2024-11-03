import { useState, useEffect } from "react";
import { useVideoConfig, useCurrentFrame, random } from "remotion";

interface Vector {
  x: number;
  y: number
}

export interface Ball {
  position: Vector
  velocity: Vector
  radius: number
}

// https://stackoverflow.com/a/76382601/852604
function runSimulation(initialBalls: Ball[], frame: number, width: number, height: number): Ball[] {
  let balls = initialBalls
  for (let f = 0; f <= frame; ++f) {
    let newBalls = [];
    for (let i = 0; i < balls.length; ++i) {
      let ball = balls[i];
      let newPositionX = ball.position.x + ball.velocity.x;
      let newPositionY = ball.position.y + ball.velocity.y;
      var newVelocityX = newPositionX <= 0 || newPositionX >= width
        ? -ball.velocity.x : ball.velocity.x;
      var newVelocityY = newPositionY <= 0 || newPositionY >= height
        ? -ball.velocity.y : ball.velocity.y;

      newBalls.push({
        position: {
          x: newPositionX,
          y: newPositionY,
        },
        velocity: {
          x: newVelocityX,
          y: newVelocityY,
        },
        radius: ball.radius
      });
    }
    balls = newBalls
  }
  return balls  
}

// https://stackoverflow.com/a/76382601
export function Balls() {
  const { width, height } = useVideoConfig();

  const frame = useCurrentFrame();

  const [initialBalls, setInitialBalls] = useState<Ball[] | null>(null);
  useEffect(() => {
    if (initialBalls === null) {
      let ballCount = Math.floor(5 + random(`count`) * 10);
      let balls = [];
      for (let i = 0; i < ballCount; ++i) {
        let v = 80 * random(`${i}-v`) + 20;
        balls.push({
          position: {
            x: random(`${i}-px`) * width,
            y: random(`${i}-py`) * height,
          },
          velocity: {
            x: v * (2 * random(`${i}-dx`) - 1),
            y: v * (2 * random(`${i}-dy`) - 1)
          },
          radius: random(`${i}-radius`) > 0.5 ? 50 : 30
        });
      }
      setInitialBalls(balls);
    }
  }, [frame]);

  let balls = initialBalls === null ? [] : runSimulation(initialBalls!, frame, width, height)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: "absolute"
      }}
    >
      {balls?.map((ball) => (
        <ellipse
          cx={ball.position.x}
          cy={ball.position.y}
          rx={ball.radius}
          ry={ball.radius}
          fill="red" />
      ))}
    </svg>
  );
}
