import { useRef } from "react";

import type HomePageProps from "./HomePage.types";

export default function useHomePage(props: HomePageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return { ...props, canvasRef };
}
