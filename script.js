// ============= PHOTO MANAGEMENT =============
let uploadedPhotos = [];

function openPhotoUpload() {
    document.getElementById('photo-input').click();
}

function handlePhotoUpload(event) {
    const files = event.target.files;
    const photosArray = Array.from(files).slice(0, 25);
    
    uploadedPhotos = photosArray.map(file => {
        return URL.createObjectURL(file);
    });

    // Distribute photos across years
    distributePhotos();
    
    // Update status
    document.getElementById('upload-status').textContent = `${uploadedPhotos.length} photos uploaded! 📸`;
    
    // Show confirmation
    alert(`✨ ${uploadedPhotos.length} beautiful memories uploaded! ✨`);
    
    // Reset input
    event.target.value = '';
}

function distributePhotos() {
    const photoPerYear = Math.floor(uploadedPhotos.length / 5);
    const remainder = uploadedPhotos.length % 5;
    
    const years = ['year1', 'year2', 'year3', 'year4', 'year5'];
    let photoIndex = 0;

    years.forEach((year, index) => {
        const galleryEl = document.getElementById(`${year}-gallery`);
        if (galleryEl) {
            galleryEl.innerHTML = '';
            
            const photosForThisYear = photoPerYear + (index < remainder ? 1 : 0);
            
            for (let i = 0; i < photosForThisYear && photoIndex < uploadedPhotos.length; i++) {
                const img = document.createElement('img');
                img.src = uploadedPhotos[photoIndex];
                img.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
                galleryEl.appendChild(img);
                photoIndex++;
            }
        }
    });
}

// ============= SCREEN NAVIGATION =============
function hideAllScreens() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
}

function showScreen(screenId) {
    hideAllScreens();
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
    }
}

function startJourney() {
    triggerConfetti();
    setTimeout(() => {
        showScreen('menu-screen');
    }, 500);
}

function goToYear(year) {
    triggerConfetti();
    setTimeout(() => {
        if (year === 'locked') {
            showScreen('locked-screen');
        } else {
            showScreen(`${year}-screen`);
        }
    }, 300);
}

function goToFinal() {
    triggerFireworks();
    setTimeout(() => {
        showScreen('final-screen');
    }, 500);
}

function backToMenu() {
    showScreen('menu-screen');
}

function restartExperience() {
    showScreen('opening-screen');
}

function goToNext(currentYear, nextYear) {
    triggerConfetti();
    setTimeout(() => {
        if (nextYear === 'final') {
            goToFinal();
        } else {
            showScreen(`${nextYear}-screen`);
        }
    }, 300);
}

// ============= EXCITEMENT BUTTON INTERACTION =============
function dodgeButton(button, year) {
    const warningEl = document.getElementById(`${year}-warning`);
    
    // Random dodge animations
    const dodgeOptions = [
        () => {
            button.style.position = 'relative';
            button.style.left = Math.random() * 200 - 100 + 'px';
            button.style.top = Math.random() * 200 - 100 + 'px';
        },
        () => {
            button.style.transform = `rotate(${Math.random() * 360}deg) scale(0.8)`;
        },
        () => {
            button.style.animation = 'shake 0.5s ease-in-out';
        },
        () => {
            button.style.opacity = '0.3';
            setTimeout(() => {
                button.style.opacity = '1';
            }, 200);
        }
    ];

    // Pick random dodge
    dodgeOptions[Math.floor(Math.random() * dodgeOptions.length)]();

    // Show warning message
    if (warningEl) {
        const messages = [
            'Nikkiiii 😭 Click VERY EXCITED!!!',
            'Come on babe! 💕 Pick VERY EXCITED!!!',
            'You know the rules! 🎉',
            'LEE MEANS BUSINESS! 😤💖'
        ];
        warningEl.textContent = messages[Math.floor(Math.random() * messages.length)];
    }
}

// ============= CONFETTI EFFECT =============
function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const confettiPieces = [];
    const colors = ['#ff69b4', '#da70d6', '#ffb6d9', '#e6d5f0', '#ffd6e8'];

    for (let i = 0; i < 100; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: -10,
            vx: Math.random() * 5 - 2.5,
            vy: Math.random() * 5 + 5,
            size: Math.random() * 5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationVelocity: Math.random() * 10 - 5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces.forEach((piece, index) => {
            piece.x += piece.vx;
            piece.y += piece.vy;
            piece.vy += 0.1;
            piece.rotation += piece.rotationVelocity;

            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate((piece.rotation * Math.PI) / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            ctx.restore();

            if (piece.y > canvas.height) {
                confettiPieces.splice(index, 1);
            }
        });

        if (confettiPieces.length > 0) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}

// ============= FIREWORKS EFFECT =============
function triggerFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const fireworks = [];
    const particles = [];

    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * (canvas.height * 0.5);
            this.vx = (Math.random() - 0.5) * 8;
            this.vy = Math.random() * -5 - 5;
            this.life = 1;
            this.color = ['#ff69b4', '#da70d6', '#ffb6d9'][Math.floor(Math.random() * 3)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.1;
            this.life -= 0.02;
        }

        explode() {
            for (let i = 0; i < 30; i++) {
                particles.push({
                    x: this.x,
                    y: this.y,
                    vx: (Math.random() - 0.5) * 12,
                    vy: (Math.random() - 0.5) * 12,
                    life: 1,
                    color: this.color,
                    size: Math.random() * 3 + 1
                });
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.1) {
            fireworks.push(new Firework());
        }

        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw();

            if (fireworks[i].life <= 0) {
                fireworks[i].explode();
                fireworks.splice(i, 1);
            }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1;
            p.life -= 0.015;

            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;

            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }

        if (fireworks.length > 0 || particles.length > 0) {
            requestAnimationFrame(animateFireworks);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    for (let i = 0; i < 5; i++) {
        fireworks.push(new Firework());
    }

    animateFireworks();
}

// ============= MUSIC PLAYER =============
function playYearMusic(year) {
    const youtubeIds = {
        year1: 'CTw8P2GcMKE',
        year2: 'YeiAjOIiQHo',
        year3: 'xr2NN07HLeU',
        year4: 'wvN-ODPv5g4',
        year5: '-FnYsctClJs'
    };

    const videoId = youtubeIds[year];
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(url, '_blank');
}

// ============= WINDOW RESIZE HANDLER =============
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// ============= INITIALIZATION =============
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded! Starting animation...');
    showScreen('opening-screen');

    setTimeout(() => {
        triggerConfetti();
    }, 500);

    addCursorSparkles();
});

// ============= CURSOR SPARKLE EFFECT =============
function addCursorSparkles() {
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.8) {
            createSparkle(e.clientX, e.clientY);
        }
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            font-size: ${Math.random() * 20 + 10}px;
            z-index: 999;
            animation: sparkle-fade 1s ease-out forwards;
        `;
        sparkle.textContent = ['✨', '💖', '⭐', '💕'][Math.floor(Math.random() * 4)];
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
    }

    if (!document.getElementById('sparkle-style')) {
        const style = document.createElement('style');
        style.id = 'sparkle-style';
        style.textContent = `
            @keyframes sparkle-fade {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
                }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============= LOCAL STORAGE HELPER =============
function saveProgress() {
    localStorage.setItem('nikkiBirthdayPhotos', JSON.stringify(uploadedPhotos));
}

function loadProgress() {
    const saved = localStorage.getItem('nikkiBirthdayPhotos');
    if (saved) {
        uploadedPhotos = JSON.parse(saved);
        distributePhotos();
    }
}