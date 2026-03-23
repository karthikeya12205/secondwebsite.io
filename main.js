document.addEventListener('DOMContentLoaded', () => {
    // Starry Background Canvas implementation
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height, stars;

    function init() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        stars = [];
        // Determine number of stars based on screen size
        const numStars = Math.floor((width * height) / 3000);

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.2,
                opacity: Math.random(),
                speed: Math.random() * 0.02
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Let CSS handle the background gradient to be more performance friendly,
        // we just draw stars here.

        stars.forEach(star => {
            // Update opacity for slow twinkling effect
            star.opacity += star.speed;
            if (star.opacity > 1 || star.opacity < 0.1) {
                star.speed = -star.speed;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', init);
    init();
    animate();
});
