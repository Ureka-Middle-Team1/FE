"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function CharacterModel({
  onClick,
  isSpeaking,
  isThinking,
}: {
  onClick: () => void;
  isSpeaking: boolean;
  isThinking: boolean;
}) {
  const { scene } = useGLTF("/character/3d-octopus.glb");
  const ref = useRef<THREE.Group>(null);

  const [startTime] = useState(() => performance.now());
  const [animationDone, setAnimationDone] = useState(false);

  useFrame(() => {
    const now = performance.now();
    const elapsed = now - startTime;
    const duration = 2000;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    const t = now / 1000;

    if (ref.current) {
      // 둥둥 모션
      ref.current.position.y = Math.sin(t * 2.5) * 0.08;

      // 고민 중일 때 좌우 흔들기
      if (isThinking) {
        //  빠르게 좌우 흔들기 + 상하 들썩임 + 살짝 scale 변형
        ref.current.rotation.z = Math.sin(t * 8) * 0.08; // 좌우 흔들림
        ref.current.position.y += Math.sin(t * 4) * 0.03; // 빠른 들썩임
        const scale = 0.9 + Math.sin(t * 5) * 0.02;
        ref.current.scale.set(scale, scale, scale); // 움찔 스케일
      } else {
        // 회복
        ref.current.rotation.z = 0;
        ref.current.scale.set(1, 1, 1);
      }

      if (!animationDone) {
        ref.current.scale.setScalar(0.6 + 0.2 * ease);
        ref.current.rotation.y = Math.PI - ease * Math.PI;
        if (progress === 1) setAnimationDone(true);
      }

      // 말하는 중에는 들썩임
      if (animationDone && isSpeaking) {
        const pulse = Math.sin(t * 6) * 0.05;
        ref.current.scale.set(0.8 + pulse, 0.8 - pulse * 2, 0.8 + pulse);
      }

      // 말 안 할 땐 정상 상태 유지
      if (animationDone && !isSpeaking) {
        ref.current.scale.set(0.8, 0.8, 0.8);
      }
    }
  });

  return (
    <group ref={ref} scale={0.6} rotation={[0, Math.PI, 0]} onClick={onClick}>
      <primitive object={scene} />
    </group>
  );
}
