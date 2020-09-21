const states = {
  hungry: 0,
  sad: 1,
  full: 2,
  leaving: 3,
  hidden: 4,
}

const types = {
  regular: 0,
  king: 1,
}
let score = 0;
const worm = document.querySelector('#score');

class Mole {
  constructor(mole) {
    this.mole = mole;
    this.state = states.hidden;
    this.type = types.regular;
    this.stop = false;
    this.boundHandleClick = this.handleClick.bind(this);

    this.init();

    const randomNumer = Math.floor(Math.random() * 10 + 2);
    setTimeout(() => {
      if (!this.stop) {
        this.handleLogic();
      }
    }, randomNumer * 1000);
  }

  stopClick() {
    this.mole.removeEventListener('click', this.boundHandleClick);
  }

  handleClick() {
    if (this.state === states.hungry) {
      this.state = states.full;
      this.mole.classList.remove('cursor');
      if (this.type === types.king) {
        this.mole.src = './king-mole-fed.png';
        score += 20;
      } else {
        this.mole.src = './mole-fed.png';
        score += 10;
      }
      worm.style.clip = "rect(0px," + (score * 1500 / 100) + "px,200px,0px)";


      if (score >= 100) {
        console.log(score);
        const win = document.querySelector('.win');
        const bg = document.querySelector('.bg');
        win.style.visibility = 'visible';
        bg.style.display = 'none';
      }
      return;
    }
  }

  init() {
    this.mole.addEventListener('click', this.boundHandleClick);
  }

  async handleLogic() {
    const randomNumer = Math.floor(Math.random() * 10 + 2);

    if (this.state === states.hidden) {
      if (randomNumer > 3) {
        this.type = types.regular;
      } else {
        this.type = types.king;
      }
    }

    switch (this.state) {
      case states.hungry: {
        this.state = states.sad;
        this.mole.classList.remove('cursor');
        break;
      }
      case states.full: {
        this.state = states.leaving;
        break;
      }
      case states.sad: {
        this.state = states.leaving;
        break;
      }
      case states.leaving: {
        this.state = states.hidden;
        break;
      }
      case states.hidden: {
        this.state = states.hungry;
        this.mole.classList.add('cursor');
        break;
      }
    }

    switch (this.state) {
      case states.hungry: {
        if (this.type === types.king) {
          this.mole.src = './king-mole-hungry.png';
        } else {
          this.mole.src = './mole-hungry.png';
        }
        this.mole.style.visibility = 'visible';
        break;
      }
      case states.sad: {
        if (this.type === types.king) {
          this.mole.src = './king-mole-sad.png';
        } else {
          this.mole.src = './mole-sad.png';
        }
        break;
      }
      case states.leaving: {
        if (this.type === types.king) {
          this.mole.src = './king-mole-leaving.png';
        } else {
          this.mole.src = './mole-leaving.png'
        }
        break;
      }
      case states.hidden: {
        this.mole.style.visibility = 'hidden';
        break;
      }
    }

    await wait(randomNumer * 1000);

    if (!this.stop) {
      this.handleLogic();
    }
  }
}

function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

const moleObjects = [];

const moles = document.querySelectorAll('.mole')
for (const mole of moles) {
  moleObjects.push(new Mole(mole));
}

