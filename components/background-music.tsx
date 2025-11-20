"use client"

import { useEffect, useRef } from "react"

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const handleUserInteraction = () => {
      const audioEl = audioRef.current
      if (!audioEl) return
      audioEl
        .play()
        .then(() => {
          document.removeEventListener("click", handleUserInteraction)
          document.removeEventListener("touchstart", handleUserInteraction)
        })
        .catch((error) => {
          console.log("Playback blocked:", error)
        })
    }

    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("touchstart", handleUserInteraction)

    return () => {
      audioRef.current?.pause()
      audioRef.current = null
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
    }
  }, [])

  return (
    <audio
      ref={audioRef}
      src={encodeURI(
        "/background_music/Kina Grannis ft. Imaginary Future - I Will Spend My Whole Life Loving You (lyrics).mp3",
      )}
      loop
      preload="auto"
      playsInline
      style={{ display: "none" }}
    />
  )
}

export default BackgroundMusic


