import { useEffect, useRef, useState } from "react";

import { type Scene } from "#src/entities";
import { TestScene } from "#src/scenes";

import type HomePageProps from "./HomePage.types";

export default function useHomePage(props: HomePageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene>(null);

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sceneRef.current = new TestScene();
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    setLoading(true);
    scene
      .load()
      .then(() => setLoaded(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (!loaded || loading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    scene.init(canvas);
    scene.run(24);

    return () => scene.dispose();
  }, [loaded, loading]);

  return { ...props, canvasRef, loaded, loading };
}
