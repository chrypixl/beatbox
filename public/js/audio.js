let audioContext;
let destination;
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        destination = audioContext.createMediaStreamDestination();
        mediaRecorder = new MediaRecorder(destination.stream);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            if (recordedChunks.length > 0) {
                const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                console.log('Recorded audio URL:', audioUrl);

                // Change here to run whatever "save" functions you'd like
                document.querySelector('#playback').dataset.audio = JSON.stringify(audioUrl);
                document.querySelector('#playback').disabled = false;
                // Change here to run whatever "save" functions you'd like

                recordedChunks = [];
            } else {
                console.error('No audio data recorded.');
            }
        };
    }
}

function startRecording(target) {
    audioContext = null;
    initAudioContext();
    if (!isRecording) {
        target.textContent = "Stop Recording"
        mediaRecorder.start();
        isRecording = true;
        console.log('Recording started.');
    }
}

function stopRecording(target) {
    if (isRecording) {
        target.textContent = "Record"
        mediaRecorder.stop();
        isRecording = false;
        console.log('Recording stopped.');
    }
}

function addTrackToStream(audioSrc) {
    const audioElement = new Audio(audioSrc);
    const track = audioContext.createMediaElementSource(audioElement);
    track.connect(destination);

    audioElement.play();
}

function playbackRecordedAudio(audioUrl) {
    const recordedAudio = new Audio(audioUrl);
    recordedAudio.play();
}

document.querySelector('#record').addEventListener('click', function ({ target }) {
    if (target.textContent === "Record") startRecording(target);
    else stopRecording(target);
})

document.querySelector('#playback').addEventListener('click', function () {
    if (this.dataset.audio) {
        const audioUrl = JSON.parse(this.dataset.audio)
        playbackRecordedAudio(audioUrl);
    } else {
        console.log("No audio to play back.");
    }
});