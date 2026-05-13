/**
 * Matrix Digital Rain Animation
 * Adapted for responsive canvas handling
 */

const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

const fontSize = 14;
const characters = "01OSINTHACKER101010".split("");

let columns, drops;

/**
 * Adjusts the canvas internal resolution to match the window size.
 * Re-calculates columns and resets drops on resize.
 */
function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    columns = canvas.width / fontSize;
    drops = [];
    
    // Fill the drops array, each index represents a column
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
}

// Initial setup
initializeCanvas();

// Ensure the animation fills the screen when the window is resized
window.addEventListener("resize", initializeCanvas);

/**
 * Main draw loop responsible for the trailing effect and character rain
 */
function draw() {
    // Semi-transparent black rectangle creates the "fade" effect over time
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff9c";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        // Select a random character from the pool
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Draw character at current drop position
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to the top randomly after it hits the bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Increment position for the next frame
        drops[i]++;
    }
}

// Run the animation loop at approximately 30 frames per second
setInterval(draw, 33);
