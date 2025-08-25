import type { MediaData } from "../../../../shared/types"

interface MediaProps {
    media: MediaData;
}

interface FloatingMediaProps extends MediaProps {
    active: boolean;
    parentPos: {x: number, y:number};
}

export type {MediaProps, FloatingMediaProps}