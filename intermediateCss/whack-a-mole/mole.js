let score = 0;
let molesLeft = 30;
let popupLength = 1000;
let hideTimeout;
let clickable = false;
let transitionDuration = 0.25;
const numMoles = 8;

function createMoles() {
    const playfield = document.querySelector('.pf');
    for (let i = 0; i < numMoles; i++) {
        const wgs = document.createElement('div');
        wgs.className = 'wgs';

        const moleHead = document.createElement('img');
        moleHead.className = 'wgs__mole-head wgs__mole-head--hidden';
        moleHead.src = 'mole-head.png';
        moleHead.alt = 'mole head';

        const dirtPile = document.createElement('img');
        dirtPile.className = 'wgs__dirt-pile';
        dirtPile.src = 'mole-hill.png';
        dirtPile.alt = 'mole hill';

        wgs.appendChild(moleHead);
        wgs.appendChild(dirtPile);
        playfield.appendChild(wgs);
    }
}

function popUpRandomMole() {
    if (molesLeft <= 0) {
        document.querySelector('.sb__game-over').classList.remove('sb__game-over--hidden');
        return;
    }

    const moleHeads = document.querySelectorAll('.wgs__mole-head');

    if (moleHeads.length === 0) {
        return;
    }
    const moleIndex = Math.floor(Math.random() * moleHeads.length);
    const moleHead = moleHeads[moleIndex];

    clickable = true;

    moleHead.classList.remove('wgs__mole-head--hidden', 'wgs__mole-head--whacked');

    molesLeft -= 1;
    document.querySelector('.sb__moles').innerHTML = molesLeft;

    hideTimeout = setTimeout(() => hideMole(moleHead), popupLength);
}

function hideMole(mole) {
    clickable = false;
    mole.classList.add('wgs__mole-head--hidden');

    setTimeout(popUpRandomMole, 500);
}

window.addEventListener('DOMContentLoaded', () => {
    createMoles();

    setTimeout(popUpRandomMole, 0);

    const moleHeads = document.querySelectorAll('.wgs__mole-head');
    for (let moleHead of moleHeads) {
        moleHead.addEventListener('click', event => {
            if (!clickable) return;

            score += 1;
            document.querySelector('.sb__score').innerHTML = score;

            transitionDuration *= 0.9;
            for (let mole of moleHeads) {
                mole.style.transition = `margin-top ${transitionDuration}s`;
            }

            clearTimeout(hideTimeout);
            event.target.classList.add('wgs__mole-head--whacked');

            setTimeout(() => {
                event.target.classList.add('wgs__mole-head--hidden');
                hideMole(event.target);
            }, 250);
        });
    }
});
