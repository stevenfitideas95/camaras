import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

ffmpeg()
    .addInput("rtsp://localhost:8554/live")
    .addOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 10',
        '-hls_list_size 0',
        '-f hls'
    ]).output('./videos/test.m3u8').on('end', () => {
        console.log('end')
    }).on('error', (err) => {
        console.log(err)
    }).run()

export default ffmpeg;
