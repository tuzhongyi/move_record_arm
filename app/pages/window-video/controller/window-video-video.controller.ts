export class VideoWindowVideoController {
  element = document.getElementById('video') as HTMLVideoElement

  play(url: string) {
    this.element.src = url
    // let source = new MediaSource()
    // this.element.src = URL.createObjectURL(source)
    // source.addEventListener('sourceopen', () => {
    //   let sourceBuffer = source.addSourceBuffer(
    //     'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
    //   )
    //   fetch(url)
    //     .then((response) => response.arrayBuffer())
    //     .then((buffer) => {
    //       sourceBuffer.appendBuffer(buffer)
    //     })
    // })
  }
}
