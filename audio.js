const audio = document.getElementById('audio');
const container = document.getElementById('container');

let isDragging = false;

// Load the audio file and ensure it's ready to play
audio.addEventListener('loadedmetadata', () => {
    console.log('Audio duration:', audio.duration);
});

console.log('Audio duration:', audio.duration);

// Start tracking mouse movement when the mouse is pressed
container.addEventListener('mousedown', (event) => {
    isDragging = true;
    updateAudioPosition(event.clientX);
});

// Update audio position while dragging
container.addEventListener('mousemove', (event) => {
    if (isDragging) {
        updateAudioPosition(event.clientX);
    }
});

// Stop tracking mouse movement when the mouse is released
container.addEventListener('mouseup', () => {
    isDragging = false;
});

// Stop tracking if the mouse leaves the container
container.addEventListener('mouseleave', () => {
    isDragging = false;
});

// Function to update audio position based on mouse X position
function updateAudioPosition(clientX) {
    const containerWidth = container.clientWidth;
    const audioDuration = audio.duration;

    // Calculate the percentage of the mouse position within the container
    const mousePercentage = clientX / containerWidth;

    // Map the percentage to the audio's duration
    const newTime = mousePercentage * audioDuration;

    // Update the audio's current time
    audio.currentTime = newTime;

    // Play the audio if it's not already playing
    if (audio.paused) {
        audio.play();
    }
}