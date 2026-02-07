import React from "react";
import { cn } from "../../lib/utils";

// Orbiting circles animation wrapper. Children orbit around a center point.
export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 40,
  speed = 1,
  ...props
}) {
  const calculatedDuration = duration / speed;

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}

      {React.Children.map(children, (child, index) => {
        const count = React.Children.count(children || []);
        // Start at top (-90deg) for a more natural orbit start
        const angle = count > 0 ? (360 / count) * index - 90 : 0;
        return (
          <div
            style={{
              "--duration": calculatedDuration,
              "--radius": radius,
              "--angle": angle,
              "--icon-size": `${iconSize}px`,
              animationDirection: reverse ? "reverse" : "normal",
              top: "50%",
              left: "50%",
            }}
            className={cn(
              "animate-orbit absolute flex size-[var(--icon-size)] transform-gpu items-center justify-center rounded-full",
              className
            )}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
