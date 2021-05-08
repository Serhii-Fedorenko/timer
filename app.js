const refs = {
  startBtn: document.querySelector("button[data-action-start]"),
  stopBtn: document.querySelector("button[data-action-stop]"),
  resetBtn: document.querySelector('button[data-action-reset]'),
  clockface: document.querySelector(".js-clockface"),
};

class Timer {
  constructor({onTick}) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.init();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      return;
    }
    const startTime = Date.now();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);

    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }

  reset() {
    clearInterval(this.intervalId);
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  getTimeComponents(time) {
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
  
    return { hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const timer = new Timer({
    onTick: updateClockFace
});

timer.start();

refs.startBtn.addEventListener("click", timer.start.bind(timer));

refs.stopBtn.addEventListener("click", timer.stop.bind(timer));

refs.resetBtn.addEventListener('click', timer.reset.bind(timer))

function updateClockFace({ hours, mins, secs }) {
  refs.clockface.textContent = `${hours}:${mins}:${secs}`;
}
