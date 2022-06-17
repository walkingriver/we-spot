import { Injectable } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';

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

    return this.animationCtrl.create('exit')
      .duration(500)
      .direction('alternate')
      .easing('ease-in-out')
      .addAnimation([exitWest, exitEast]);
  }

  getEastWestEnterAnimation(selectorWest, selectorEast): Animation {
    const enterWest = this.animationCtrl.create()
      .addElement(document.querySelector(selectorWest))
      .fromTo('transform', 'translateX(-200%)', 'translateX(0px)');

    const enterEast = this.animationCtrl.create()
      .addElement(document.querySelector(selectorEast))
      .fromTo('transform', 'translateX(200%)', 'translateX(0px)');

    return this.animationCtrl.create('enter')
      .duration(500)
      .easing('ease-in-out')
      .addAnimation([enterWest, enterEast]);
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
