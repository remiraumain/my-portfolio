import { Vector3, useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { RigidBodyApi } from "@react-three/rapier/dist/declarations/src/types";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "red" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

// Floor
const BlockStart = ({ position = [0, 0, 0] as Vector3 }) => {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
        material={floor1Material}
      />
    </group>
  );
};

const BlockEnd = ({ position = [0, 0, 0] as Vector3 }) => {
  const sandcrawler = useGLTF("./models/Sandcrawler-transformed.glb");

  sandcrawler.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
        material={floor1Material}
      />
      <RigidBody
        type="fixed"
        // colliders="hull"
        position={[0, 0.815, 0]}
        restitution={0.2}
        friction={0}
        rotation={[0, (Math.PI / 2) * 2, 0]}
      >
        <primitive object={sandcrawler.scene} scale={[0.3, 0.3, 0.3]} />
      </RigidBody>
    </group>
  );
};

// Obstacles
export const BlockSpinner = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef<RigidBodyApi>(null);
  const [speed, setSpeed] = useState(
    () => (Math.random() + 0.2) * (Math.random() > 0.5 ? 1 : -1)
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.current?.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position as Vector3}>
      <mesh
        geometry={boxGeometry}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
        material={floor2Material}
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export const BlockLimbo = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef<RigidBodyApi>(null);
  const [timeOffset, setTimeOffset] = useState(
    () => Math.random() * Math.PI * 2
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    const y = Math.sin(time + timeOffset) + 1.15;
    obstacle.current?.setNextKinematicTranslation({
      x: position[0],
      y: position[1]! + y,
      z: position[2]!,
    });
  });

  return (
    <group position={position as Vector3}>
      <mesh
        geometry={boxGeometry}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
        material={floor2Material}
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export const BlockAxe = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef<RigidBodyApi>(null);
  const [timeOffset, setTimeOffset] = useState(
    () => Math.random() * Math.PI * 2
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    const x = Math.sin(time + timeOffset) * 1.25;
    obstacle.current?.setNextKinematicTranslation({
      x: position[0]! + x,
      y: position[1]! + 0.75,
      z: position[2]!,
    });
  });

  return (
    <group position={position as Vector3}>
      <mesh
        geometry={boxGeometry}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
        material={floor2Material}
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

const Bounds = ({ length = 1 }) => {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          position={[2.15, 0.75, length * 2 - 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[0.3, 1.5, 4 * length]}
          castShadow
        />
        <mesh
          position={[-2.15, 0.75, length * 2 - 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[0.3, 1.5, 4 * length]}
          receiveShadow
        />
        <mesh
          position={[0, 0.75, length * 4 - 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[4, 1.5, 0.3]}
          receiveShadow
        />
        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, length * 2 - 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  );
};

type BlockType = React.ComponentType<{ position: number[] }>;

interface LevelProps {
  count: number;
  types: BlockType[];
}

const Level = ({
  count = 5,
  types = [BlockSpinner, BlockLimbo, BlockAxe],
}: LevelProps) => {
  const blocks: BlockType[] = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)]!;
      blocks.push(type);
    }
    return blocks;
  }, [count, types]);
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, i) => (
        <Block key={i} position={[0, 0, i * 4 + 4]} />
      ))}
      <BlockEnd position={[0, 0, count * 4 + 4]} />

      <Bounds length={count + 2} />
    </>
  );
};

export default Level;
