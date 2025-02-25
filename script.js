document.addEventListener('mousemove', function(event) {
    createDrop(event.clientX, event.clientY);
});

function createDrop(x, y) {
    const drop = document.createElement('div');
    drop.classList.add('drop');
    drop.style.left = `${x - 5}px`; // Center the drop on the mouse
    drop.style.top = `${y - 5}px`;

    // Calculate the stacking level for this drop
    const existingLayers = document.querySelectorAll('.drop');
    let maxBottom = 0;

    existingLayers.forEach(existingDrop => {
        if (existingDrop.style.left === drop.style.left) {
            const dropBottom = parseFloat(existingDrop.style.transform?.replace('translateY(', '').replace('px)', '')) || 0;
            if (dropBottom > maxBottom) {
                maxBottom = dropBottom;
            }
        }
    });

    // Set the fall distance for this drop
    const fallDistance = maxBottom + 230; // Stack 10px below the highest existing drop
    drop.style.setProperty('--fall-distance', `${fallDistance}px`);
    // Remove the drop from the DOM after the fade animation ends
    drop.addEventListener('animationend', (e) => {
        if (e.animationName === 'fade') {
            drop.remove();
        }
    });

    document.getElementById('container').appendChild(drop);
}