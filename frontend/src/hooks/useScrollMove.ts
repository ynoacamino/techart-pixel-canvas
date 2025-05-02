import {
  useScroll, useSpring, useTransform, useVelocity,
} from 'motion/react';

export default function useScrollMove<T extends string | number>(outputRange: T[]) {
  const { scrollYProgress } = useScroll();
  const rawVelocity = useVelocity(scrollYProgress);
  const absVelocity = useTransform(rawVelocity, (v) => Math.abs(v));
  const smoothVelocity = useSpring(absVelocity, {
    stiffness: 200,
    damping: 120,
  });
  const output = useTransform<number, T>(smoothVelocity, [0, 1], outputRange, { clamp: true });
  return output;
}
