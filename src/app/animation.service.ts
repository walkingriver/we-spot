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
      .fromTo('transform', 'translateX(-500%)', 'translateX(0px)');

    const enterEast = this.animationCtrl.create()
      .addElement(document.querySelector(selectorEast))
      .fromTo('transform', 'translateX(500%)', 'translateX(0px)');

    return this.animationCtrl.create('enter')
      .duration(500)
      .easing('ease-in-out')
      .addAnimation([enterWest, enterEast]);
  }

  // configureAnimations() {
  //   const exitWest = this.animationCtrl.create()
  //     .addElement(document.querySelector('#previous-card'))
  //     .fromTo('transform', 'translateX(0px)', 'translateX(-500%)');

  //   const exitEast = this.animationCtrl.create()
  //     .addElement(document.querySelector('#current-card'))
  //     .fromTo('transform', 'translateX(0px)', 'translateX(500%)');

  //   const enterWest = this.animationCtrl.create()
  //     .addElement(document.querySelector('#previous-card'))
  //     .fromTo('transform', 'translateX(-500%)', 'translateX(-0px)');

  //   const enterEast = this.animationCtrl.create()
  //     .addElement(document.querySelector('#current-card'))
  //     .fromTo('transform', 'translateX(500%)', 'translateX(0px)');

  //   this.eastWestExitAnimation =
  //     this.animationCtrl.create('exit')
  //       .duration(500)
  //       .direction('alternate')
  //       .easing('ease-in-out')
  //       .addAnimation([exitWest, exitEast]);

  //   this.eastWestEnterAnimation = this.animationCtrl.create('enter')
  //     .duration(500)
  //     .easing('ease-in-out')
  //     .addAnimation([enterWest, enterEast]);
  // }
}
