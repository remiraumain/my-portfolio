import { type NextPage } from "next";
import Head from "next/head";
import { Canvas } from "@react-three/fiber";
import Experience from "~/components/3d/Experience";
import { Suspense, useState } from "react";
import * as THREE from "three";
import LoadingScreen from "~/components/3d/utils/loadingScreen";

const Game: NextPage = () => {
  const [start, setStart] = useState(false);
  return (
    <>
      <Head>
        <title>Single project</title>
        <meta name="description" content="Check out my project" />
      </Head>
      <main>
        <div className={"fixed left-0 top-0 h-screen w-screen bg-sky-600"}>
          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [2.5, 4, 6],
            }}
            linear
            gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
          >
            <Suspense>
              {!start && (
                <>
                  <ambientLight color={"white"} intensity={0.3} />
                  <Experience />
                </>
              )}
            </Suspense>
          </Canvas>
          <LoadingScreen started={start} onStarted={() => setStart(true)} />
        </div>
      </main>
    </>
  );
};

export default Game;
