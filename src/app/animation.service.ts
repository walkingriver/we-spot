import { Injectable } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';
const END_ANGLE = 720;

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  constructor(private animationCtrl: AnimationController) { }

  getEastWestExitAnimation(selectorWest, selectorEast): Animation {

    const exitWest = this.animationCtrl.create()
      .addElement(document.querySelector(selectorWest))
      .fromTo('transform', 'translateX(0px)', 'translateX(-500%)');

    const exitEast = this.animationCtrl.create()
      .addElement(document.querySelector(selectorEast))
      .fromTo('transform', 'translateX(0px)', 'translateX(500%)');

    const spinnerWest = this.animationCtrl.create()
      .addElement(document.querySelector(`${selectorWest} .spinner-prev`))
      .fromTo('transform', 'rotate(0deg)', `rotate(-${END_ANGLE}deg`);

    const spinnerEast = this.animationCtrl.create()
      .addElement(document.querySelector(`${selectorEast} .spinner-next`))
      .fromTo('transform', 'rotate(0deg)', `rotate(${END_ANGLE}deg`);

    return this.animationCtrl.create('exit')
      .duration(500)
      .direction('alternate')
      .easing('ease-in-out')
      .addAnimation([exitWest, exitEast, spinnerWest, spinnerEast]);
  }

  getEastWestEnterAnimation(selectorWest, selectorEast): Animation {
    const enterWest = this.animationCtrl.create()
      .addElement(document.querySelector(selectorWest))
      .fromTo('transform', 'translateX(-200%)', 'translateX(0px)');

    const enterEast = this.animationCtrl.create()
      .addElement(document.querySelector(selectorEast))
      .fromTo('transform', 'translateX(200%)', 'translateX(0px)');

    const spinnerCW = this.animationCtrl.create()
      .addElement(document.querySelector(`${selectorWest} .spinner-prev`))
      .fromTo('transform', `rotate(-${END_ANGLE}deg)`, 'rotate(0deg)');

    const spinnerCCW = this.animationCtrl.create()
      .addElement(document.querySelector(`${selectorEast} .spinner-next`))
      .fromTo('transform', `rotate(${END_ANGLE}deg)`, 'rotate(0deg)');

    return this.animationCtrl.create('enter')
      .duration(500)
      .easing('ease-in-out')
      .addAnimation([enterWest, enterEast, spinnerCCW, spinnerCW]);
  }

  getIncorrectAnimation(selector): Animation {
    return this.animationCtrl.create('incorrect')
      .addElement(document.querySelectorAll(selector))
      .fromTo('transform', 'scale(1)', 'scale(0.8)')
      .duration(50)
      .iterations(5)
      .fromTo('transform', 'scale(0.8)', 'scale(1)')
      .easing('ease-in-out');
  }

  getCorrectAnimation(selector): Animation {
    return this.animationCtrl.create('correct')
      .addElement(document.querySelectorAll(selector))
      .fromTo('transform', 'scale(1.0)', 'scale(1.25)')
      .duration(200)
      .iterations(1)
      .fromTo('transform', 'scale(1.25)', 'scale(1.0)')
      .easing('ease-in-out');
  }

}
