import Player from 'video.js/dist/types/player';

/**
 * Data object representing a thumbnail at a specific time
 */
interface ThumbnailData {
    /** Image URL for the thumbnail */
    src: string;
    /** Optional sprite region in format "x,y,width,height" */
    xywh?: string;
    /** Current time in seconds */
    time: number;
}
/**
 * Configuration options for the VideojsVttSnapshot plugin
 */
interface VideojsVttSnapshotOptions {
    /**
     * URL of the VTT file containing thumbnail information
     */
    vttUrl: string;
    /**
     * CSS class name to be added to the snapshot element
     * @default 'vjs-vtt-snapshot'
     */
    snapshotClass?: string;
    /**
     * Custom styles to be applied to the snapshot element
     */
    snapshotStyle?: Partial<CSSStyleDeclaration>;
    /**
     * Callback before showing the thumbnail
     */
    beforeHovering?: (data: SnapshotData) => SnapshotData | void;
    /**
     * Callback when hovering over a position
     */
    onHover?: (data: SnapshotData) => void;
    /**
     * Callback when mouse leaves the progress bar
     */
    onLeave?: () => void;
}
/**
 * Internal interface for parsed VTT cues
 */
interface VTTCue {
    /** Start time in seconds */
    startTime: number;
    /** End time in seconds */
    endTime: number;
    /** Cue text containing the image URL and optional sprite region */
    text: string;
}
interface SnapshotData {
    time: number;
    src: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

/**
 * Video.js plugin for displaying thumbnails from VTT files when hovering over the progress bar
 */
declare class VideojsVttSnapshot {
    private player;
    private options;
    private cues;
    private snapshotElement;
    private initPromise;
    private rafPending;
    private lastMouseEvent;
    constructor(player: Player, options: VideojsVttSnapshotOptions);
    ready(): Promise<void>;
    private get progressControl();
    private initialize;
    private parseVTT;
    private parseTimestamp;
    private initializeEventListeners;
    private isValidProgressControl;
    private handleMouseMove;
    private updateSnapshot;
    private findClosestCue;
    private handleMouseLeave;
    private parseVttCue;
    private showSnapshot;
    private hideSnapshot;
    private formatTime;
    dispose(): void;
}

declare class VttSnapshotPlugin {
    private instance;
    constructor(player: Player, options: VideojsVttSnapshotOptions);
    ready(): Promise<void>;
    dispose(): void;
}
declare global {
    interface Window {
        videojs: any;
    }
}
/**
 * Registers the vttSnapshot plugin with a video.js instance.
 * Call this function with your video.js instance to enable the plugin.
 */
declare function registerVttSnapshotPlugin(videojs: any): void;

export { type SnapshotData, type ThumbnailData, type VTTCue, VideojsVttSnapshot, type VideojsVttSnapshotOptions, VttSnapshotPlugin as default, registerVttSnapshotPlugin };
