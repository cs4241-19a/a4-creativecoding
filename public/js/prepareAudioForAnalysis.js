export function prepAudio(mediaElement){
    console.log("it's being called!");
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let analyser = audioContext.createAnalyser();
    let gainNode = audioContext.createGain();
    let song = mediaElement;
    let songSource = audioContext.createMediaElementSource(song);

    songSource.connect(audioContext.destination);
    songSource.connect(gainNode);
    songSource.connect(analyser);

    return {
        audioContext: audioContext,
        analyser: analyser,
        gainNode: gainNode,
        song: song,
        songSource: songSource
    }
}
