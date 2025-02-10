export class VideoWindowVideoController {
  private video = document.getElementById('video') as HTMLVideoElement

  constructor() {}

  play(url: string) {
    this.video.src = url
  }
}
