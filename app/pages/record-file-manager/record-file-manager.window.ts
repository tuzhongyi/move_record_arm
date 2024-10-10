import { VideoWindowModel } from '../window-video/window-video.model'

export class RecordFileManagerWindow {
  video = new VideoWindow()
}
class VideoWindow extends VideoWindowModel {
  style = {
    width: '50%',
    height: '50%',
  }
  url: string = '../window-video/window-video.html'
}
