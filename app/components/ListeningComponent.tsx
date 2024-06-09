'use client'
import React, { useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'

interface ListeningComponentProps {
  audioFilePath: string
  autoPlay?: boolean
}

const ListeningComponent: React.FC<ListeningComponentProps> = ({
  audioFilePath,
  autoPlay = true,
}) => {
  console.log(audioFilePath)
  const [audioFile, setAudioFile] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useMemo(() => {
    setAudioFile(audioFilePath)
  }, [audioFilePath])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const rewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 5
    }
  }

  const forward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 5
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
      return () =>
        audioRef?.current?.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audioRef])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <div className="w-[100vw] bg-white shadow-md py-4 px-10 ">
      <div className="flex items-center">
        <span className="text-sm mr-2">{formatTime(currentTime)}</span>
        <Progress value={(currentTime / duration) * 100} />{' '}
        <span className="text-sm ml-2">
          -{formatTime(duration - currentTime)}
        </span>
      </div>
      <div className="mt-2 container mx-auto flex justify-center items-center space-x-4">
        <audio ref={audioRef} src={audioFile} autoPlay={autoPlay} />
        <button
          onClick={() => audioRef.current && (audioRef.current.currentTime = 0)}
        >
          <Image
            src="/icons/backward.svg"
            alt="Rewind"
            width={24}
            height={24}
          />
        </button>
        <button onClick={rewind}>
          <Image
            src="/icons/backward-5-seconds.svg"
            alt="Rewind 5 Seconds"
            width={24}
            height={24}
          />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? (
            <Image src="/icons/pause.svg" alt="Pause" width={24} height={24} />
          ) : (
            <Image src="/icons/play.svg" alt="Play" width={24} height={24} />
          )}
        </button>
        <button onClick={forward}>
          <Image
            src="/icons/forward-5-seconds.svg"
            alt="Forward 5 Seconds"
            width={24}
            height={24}
          />
        </button>
        <button
          onClick={() =>
            audioRef.current &&
            (audioRef.current.currentTime = audioRef.current.duration)
          }
        >
          <Image
            src="/icons/forward.svg"
            alt="Forward"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  )
}

export default ListeningComponent
