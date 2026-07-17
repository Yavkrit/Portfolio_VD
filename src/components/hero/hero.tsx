"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "@/data/profile";
import { scholarMetrics } from "@/data/publications";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/lib/use-mounted";
import { ProfileLinks } from "@/components/sections/profile-links";

const HeroScene = dynamic(
  () => import("./hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

const metrics = [
  { label: "Years in Research", value: "30+" },
  { label: "Citations", value: `${scholarMetrics.totalCitations}` },
  { label: "H-Index", value: `${scholarMetrics.hIndex}` },
  { label: "Patents Filed", value: "2" },
];

export function Hero() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const lineColor = isDark ? "#e8a33d" : "#b8710a";
  const sweepColor = isDark ? "#5eead4" : "#0f8c7d";

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 20 });

  const portraitX = useTransform(springX, [-1, 1], [-14, 14]);
  const portraitY = useTransform(springY, [-1, 1], [-10, 10]);
  const gridX = useTransform(springX, [-1, 1], [10, -10]);
  const gridY = useTransform(springY, [-1, 1], [8, -8]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const relY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    pointerX.set(relX);
    pointerY.set(relY);
  }

  return (
    <section
      onPointerMove={handlePointerMove}
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden"
    >
      <div className="schematic-grid absolute inset-0 opacity-60" />
      {mounted && (
        <div className="absolute inset-0">
          <HeroScene lineColor={lineColor} sweepColor={sweepColor} />
        </div>
      )}

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 lg:order-1"
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-accent">
            {profile.title} &middot; {profile.institute}
          </p>
          <h1 className="mt-6 font-display text-5xl font-light leading-[1.05] text-foreground sm:text-6xl lg:text-[4.2rem]">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
            {profile.tagline} Three decades engineering sensors and instrumentation
            for agrionics — from lab prototype to licensed technology.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              onClick={() =>
                document
                  .getElementById("research")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore the Research
            </Button>
            <Link href="/career-journey">
              <Button variant="outline">Read the Career Journey</Button>
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
              Research Profiles
            </span>
            <ProfileLinks />
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
                  {metric.label}
                </dt>
                <dd className="mt-1 font-display text-3xl text-foreground tabular-nums">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 flex justify-center lg:order-2"
        >
          <motion.div
            style={{ x: gridX, y: gridY }}
            className="absolute h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl"
            aria-hidden
          />
          <motion.div
            style={{ x: portraitX, y: portraitY }}
            className="relative aspect-[4/5] w-full max-w-sm overflow-hidden border border-border-strong bg-background-inset"
          >
            <Image
              src="/images/portrait-2.png"
              alt={profile.name}
              fill
              priority
              sizes="(min-width: 1024px) 24rem, 80vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground-subtle sm:block">
        Scroll to begin
      </div>
    </section>
  );
}
