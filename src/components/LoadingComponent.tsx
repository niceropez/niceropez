import { useMemo } from 'react'
import type { CSSProperties } from 'react'

interface LoadingComponentProps {
    seed?: string
}

type LoadingCellStyle = CSSProperties & {
    '--cell-delay': string
    '--cell-duration': string
}

export function LoadingComponent({ seed = 'default' }: LoadingComponentProps) {
    const noiseCells = useMemo(
        () =>
            Array.from({ length: 96 }, (_, i) => ({
                id: `${seed}-${i}`,
                delay: `${(Math.random() * 0.8).toFixed(3)}s`,
                duration: `${(0.8 + Math.random() * 0.4).toFixed(2)}s`,
            })),
        [seed],
    )

    return (
        <section className="detail-hero detail-fade" aria-hidden="true">
            <div className="detail-hero-noise">
                {noiseCells.map((cell) => (
                    <span
                        key={cell.id}
                        className="detail-noise-cell detail-noise-cell-animate"
                        style={{
                            '--cell-delay': cell.delay,
                            '--cell-duration': cell.duration,
                        } as LoadingCellStyle}
                    />
                ))}
            </div>
        </section>
    )
}

export default LoadingComponent