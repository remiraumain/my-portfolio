import { OrbitControls } from "@react-three/drei";
import { Physics, Debug } from "@react-three/rapier";
import Lights from "./Lights";
import Level, { BlockAxe, BlockLimbo, BlockSpinner } from "./Level";

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics>
        <Debug />
        <Lights />
        <Level count={10} types={[BlockAxe, BlockLimbo, BlockSpinner]} />
      </Physics>
    </>
  );
}
