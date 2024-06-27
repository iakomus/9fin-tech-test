'use client'

import { Transcript } from '@/lib/definitions'
import { ReactEventHandler, createRef, useEffect, useRef, useState } from 'react'

export const TranscriptionComponent = ({ transcript }: { transcript: Transcript }) => {
    const audioRef = useRef<HTMLAudioElement>(null)
    const paragraphsRef = useRef<(HTMLParagraphElement)[]>([])
    const { blocks } = transcript
    const [first] = blocks
    const [selected, setSelected] = useState(-1)

    const onTimeUpdateHandle: ReactEventHandler<HTMLAudioElement> = () => {
        if (!audioRef.current) { return }

        const { currentTime } = audioRef.current
        const found = blocks.findIndex((block) => currentTime >= block.start && currentTime <= block.end)

        if (found !== -1) {
            selectBlock(found)
            return
        }

        const { [blocks.length - 1]: last } = blocks
        if (first && currentTime < first.start) {
            selectBlock(0)
            return
        }

        if (last && currentTime > last.end) {
            selectBlock(blocks.length - 1)
        }
    }

    const onSeekingHandle: ReactEventHandler<HTMLAudioElement> = () => {
        if (!audioRef.current) { return }

        if (audioRef.current.paused) {
            audioRef.current.play()
        }
    }

    const handleClick = (index: number, start: number) => {
        if (!audioRef.current) { return }

        audioRef.current.currentTime = start

        if (audioRef.current.paused) {
            audioRef.current.play()
        }

        selectBlock(index)
    }

    const selectBlock = (index: number) => {
        if (selected === index) return

        setSelected(index)
        scrollIntoView(index)
    }

    const scrollIntoView = (index: number) => {
        if (!paragraphsRef.current[index]) return

        paragraphsRef.current[index].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    }

    if (paragraphsRef.current.length !== blocks.length) {
        paragraphsRef.current = Array(blocks.length)
            .fill(null)
            .map((_, i) => paragraphsRef.current[i] || createRef<HTMLParagraphElement>())
    }


    useEffect(() => {
        const handleResize = () => scrollIntoView(selected)
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [selected])

    return (
        <div className="h-screen flex flex-col pt-4 overscroll-contain">
            <div className="flex-grow overflow-auto px-6 md:px-14 lg:px-20">
                <h1 className="text-2xl mb-4">{transcript.title}</h1>
                {blocks.map((block, index) => (
                    <p
                        role="button"
                        tabIndex={0}
                        ref={(element) => {
                            if (!element) return

                            paragraphsRef.current[index] = element
                        }}
                        onClick={({ currentTarget }) => {
                            handleClick(index, block.start)
                            currentTarget.blur()
                        }}
                        onKeyDown={({ key, currentTarget }) => {
                            if (key === 'Enter') handleClick(index, block.start)
                            currentTarget.blur()
                        }}
                        className="md:text-lg mb-4 focus:outline-none focus:ring-2"
                        key={block.start}
                    >
                        <span
                            className={`py-1 hover:bg-blue-100 ${selected === index ? '!bg-amber-200' : ''}`}
                        >
                            {block.text}
                        </span>
                    </p>
                ))}
            </div>
            <div className="w-full min-h-18 p-2 px-8 bg-slate-50 shadow-inner">
                <audio
                    ref={audioRef}
                    src={transcript.audioUrl}
                    controls
                    onTimeUpdate={onTimeUpdateHandle}
                    onSeeking={onSeekingHandle}
                    className="w-full min-h-14"
                >
                    <track kind="captions" />
                </audio>
            </div>
        </div>
    )
}
