import { useEffect, useState } from "react"
import Link from "next/link"
import type { ISourceOptions } from "@tsparticles/engine"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { Github, Star } from "lucide-react"
import { loadFull } from "tsparticles"

const options: ISourceOptions = {
  key: "star",
  name: "Star",
  particles: {
    number: {
      value: 25,
      density: {
        enable: false,
      },
    },
    color: {
      value: [
        "#7c3aed",
        "#bae6fd",
        "#a78bfa",
        "#93c5fd",
        "#0284c7",
        "#fafafa",
        "#38bdf8",
      ],
    },
    shape: {
      type: "star",
      options: {
        star: {
          sides: 4,
        },
      },
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: { min: 1, max: 3 },
    },
    rotate: {
      value: {
        min: 0,
        max: 360,
      },
      enable: true,
      direction: "clockwise",
      animation: {
        enable: true,
        speed: 50,
        sync: false,
      },
    },
    links: {
      enable: false,
    },
    reduceDuplicates: true,
    move: {
      enable: true,
      center: {
        x: 120,
        y: 45,
      },
    },
  },
  interactivity: {
    events: {},
  },
  smooth: true,
  fpsLimit: 120,
  background: {
    color: "transparent",
    size: "cover",
  },
  fullScreen: {
    enable: true,
  },
  detectRetina: true,
  absorbers: [
    {
      enable: true,
      opacity: 0,
      size: {
        value: 1,
        density: 1,
        limit: {
          radius: 5,
          mass: 5,
        },
      },
      position: {
        x: 110,
        y: 45,
      },
    },
  ],
  emitters: [
    {
      autoPlay: true,
      fill: true,
      life: {
        wait: true,
      },
      rate: {
        quantity: 5,
        delay: 0.5,
      },
      position: {
        x: 110,
        y: 45,
      },
    },
  ],
}

export default function GithubButton() {
  const [particleState, setParticlesReady] = useState<"loaded" | "ready">()

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine)
    }).then(() => {
      setParticlesReady("loaded")
    })
  }, [])

  return (
    <Link
      href="https://github.com/NgocMinh96/laviecn"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative z-10 rounded-2xl bg-gradient-to-r from-blue-300/30 via-blue-500/30 via-40% to-purple-500/30 p-0.75 text-white transition-transform"
    >
      <div className="relative flex min-w-[150px] items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-blue-300 via-blue-500 via-40% to-purple-500 px-4 py-1.5 text-white">
        <Github className="size-5" />
        <Star
          style={{
            animationDelay: "1s",
            animationDuration: "2.5s",
          }}
          className="sparkle-animation absolute top-3.5 left-6 size-2 fill-white"
        />

        <span>Github</span>
        <Star
          style={{
            animationDelay: "1s",
            animationDuration: "3s",
          }}
          className="sparkle-animation size-4 fill-white"
        />
      </div>
      {!!particleState && (
        <Particles
          id="whatever"
          className={`pointer-events-none absolute -top-4 -right-4 -bottom-4 -left-4 z-0 opacity-0 transition-opacity ${particleState === "ready" ? "opacity-100" : ""}`}
          particlesLoaded={async () => {
            setParticlesReady("ready")
          }}
          options={options}
        />
      )}
    </Link>
  )
}
