document.addEventListener('DOMContentLoaded', function () {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const celebration = document.getElementById('celebration');
    const yesOption = document.getElementById('yesOption');
    const noOption = document.getElementById('noOption');

    let envelopeOpened = false;
    let confettiInterval;

    // Envelope click
    envelope.addEventListener('click', function () {
        if (!envelopeOpened) {
            envelope.classList.add('opened');

            setTimeout(() => {
                letter.classList.add('show');
            }, 400);

            envelopeOpened = true;
        }
    });

    // YES
    yesOption.addEventListener('change', function () {
        if (this.checked) {
            setTimeout(showCelebration, 500);
        }
    });

    // NO shake
    noOption.addEventListener('change', function () {
        if (this.checked) {
            letter.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => (letter.style.animation = ''), 500);
        }
    });

    function showCelebration() {
        celebration.classList.add('show');

        const confettiContainer = celebration.querySelector('.confetti');
        confettiContainer.innerHTML = '';

        // 🎉 CONTINUOUS CONFETTI (LONGER)
        confettiInterval = setInterval(() => {
            for (let i = 0; i < 10; i++) {
                createConfetti(confettiContainer);
            }
        }, 200);

        // ⏳ KEEP IT LONGER (12 seconds)
        setTimeout(() => {
            clearInterval(confettiInterval);
            celebration.classList.remove('show');
        }, 12000);
    }

    function createConfetti(container) {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff8a80', '#b39ddb'];

        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';

        // 🔥 BIG CONFETTI
        const size = Math.random() * 20 + 18; // 18px–38px
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';

        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.left = Math.random() * 100 + 'vw';

        // 🐢 SLOWER FALL (LONGER)
        confetti.style.animationDuration = Math.random() * 4 + 6 + 's'; // 6–10s
        confetti.style.opacity = Math.random();

        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '4px';

        container.appendChild(confetti);

        // Clean up
        setTimeout(() => confetti.remove(), 11000);
    }
});

// CSS injected via JS
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    0%,100% { transform: translateY(-50px) translateX(0); }
    25% { transform: translateY(-50px) translateX(-6px); }
    75% { transform: translateY(-50px) translateX(6px); }
}

.confetti-piece {
    position: absolute;
    top: -50px;
    animation-name: confetti-fall;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
}

@keyframes confetti-fall {
    0% {
        transform: translateY(-50px) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(1080deg);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);
