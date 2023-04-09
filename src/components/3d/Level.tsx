import { Vector3, useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { RigidBodyApi } from "@react-three/rapier/dist/declarations/src/types";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
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
  // const fbx = useLoader(FBXLoader, "./models/Sandcrawler.fbx");
  const sandcrawler = useGLTF("./models/Sandcrawler-transformed.glb");

  sandcrawler.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });
  // const textureProps = useTexture({
  //   map: "./textures/Sandcrawler_1_Base_Color.png",
  // });
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
      >
        <primitive object={sandcrawler.scene} scale={[0.3, 0.3, 0.3]} />
      </RigidBody>
    </group>
  );
};

// Obstacles
const BlockSpinner = ({ position = [0, 0, 0] as Vector3 }) => {
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
    <group position={position}>
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

const BlockLimbo = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef<RigidBodyApi>(null);
  const [timeOffset, setTimeOffset] = useState(
    () => Math.random() * Math.PI * 2
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    const y = Math.sin(time + timeOffset) + 1.15;
    obstacle.current?.setNextKinematicTranslation({
      x: position[0]!,
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

const BlockAxe = ({ position = [0, 0, 0] }) => {
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

const Level = () => {
  return (
    <>
      <BlockStart position={[0, 0, 16]} />
      <BlockSpinner position={[0, 0, 12]} />
      <BlockLimbo position={[0, 0, 8]} />
      <BlockAxe position={[0, 0, 4]} />
      <BlockEnd position={[0, 0, 0]} />
    </>
  );
};

export default Level;
