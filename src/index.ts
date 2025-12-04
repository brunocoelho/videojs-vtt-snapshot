export * from "./interface";
import { VideojsVttSnapshot } from "./videojs-vtt-snapshot";
import type { VideojsVttSnapshotOptions } from "./interface";
import type Player from "video.js/dist/types/player";

// Create the plugin class
class VttSnapshotPlugin {
  private instance: VideojsVttSnapshot;

  constructor(player: Player, options: VideojsVttSnapshotOptions) {
    this.instance = new VideojsVttSnapshot(player, options);
  }

  ready() {
    return this.instance.ready();
  }

  dispose() {
    if (this.instance) {
      this.instance.dispose();
    }
  }
}

// Plugin registration function
function vttSnapshotPlugin(this: Player, options: VideojsVttSnapshotOptions) {
  return new VttSnapshotPlugin(this, options);
}

// Handle browser environment - register on the global videojs instance
declare global {
  interface Window {
    videojs: any;
  }
}

/**
 * Registers the vttSnapshot plugin with a video.js instance.
 * Call this function with your video.js instance to enable the plugin.
 */
export function registerVttSnapshotPlugin(videojs: any): void {
  if (!videojs) {
    console.warn("videojs-vtt-snapshot: No video.js instance provided");
    return;
  }
  const registerPlugin = videojs.registerPlugin || videojs.plugin;
  if (registerPlugin && !videojs.getPlugin?.("vttSnapshot")) {
    registerPlugin("vttSnapshot", vttSnapshotPlugin);
  }
}

// Auto-register if global videojs is available (for script tag usage)
if (typeof window !== "undefined" && window.videojs) {
  registerVttSnapshotPlugin(window.videojs);
}

export default VttSnapshotPlugin;
export { VideojsVttSnapshot };
