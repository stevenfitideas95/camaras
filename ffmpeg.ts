import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

ffmpeg()
    .addInput("rtsp://admin:Petroip041@@185.232.181.18:554/cam/realmonitor?channel=1&subtype=1")
    .outputOptions([
        '-c:v libx264', // Codec de video
        '-b 900k', // Tasa de bits de video
        '-preset veryslow', // Perfil rápido para codificación
        '-tune zerolatency', // Optimización para baja latencia
        '-g 25', // Intervalo de keyframes más corto
        '-sc_threshold 0', // Deshabilita la codificación adaptativa
        '-hls_time 1', // Reduce la duración de cada fragmento
        '-hls_list_size 4', // Mantén un tamaño pequeño en el índice
        '-hls_flags delete_segments+append_list', // Manejo dinámico de segmentos
        '-fflags nobuffer', // Reduce el buffer de entrada
        '-flags low_delay', // Optimiza para baja latencia
        '-strict experimental', // Configuración experimental para HLS
        '-f hls', // Formato de salida
        '-hls_segment_filename ./videos/segment_%03d.ts', // Nombre de los segmentos
        '-vf scale=640:360', // Escala el video a 640x360
        '-profile baseline', // Perfil de video base
        '-threads 0', // Usa todos los núcleos de la CPU
    ]).output('./videos/test.m3u8').on('end', () => {
        console.log('end')
    }).on('error', (err) => {
        console.log(err)
    }).run()

export default ffmpeg;
