import useHomePage from "./HomePage.hooks";
import type HomePageProps from "./HomePage.types";

export default function HomePage(props: HomePageProps) {
  const { canvasRef, loaded, loading, ...rest } = useHomePage(props);

  return (
    <div {...rest} className="relative h-dvh w-screen overflow-hidden">
      {loading && <p>Loading...</p>}

      {/* CANVAS */}
      {!loading && loaded && <canvas ref={canvasRef} className="size-full" />}

      {/* VERSION */}
      <p className="absolute right-2 bottom-2 bg-transparent font-sans text-base text-white">
        v{process.env.APP_VERSION}
      </p>
    </div>
  );
}
