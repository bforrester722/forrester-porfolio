import { Component, OnInit, Input } from '@angular/core';
import { AnimationItem }    from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-lottie',
  templateUrl: './app-lottie.component.html',
  styleUrls: ['./app-lottie.component.sass']
})

export class AppLottieComponent {

  @Input() paused: any;

  private _animation: any = [];

  @Input() get animation(): any {
    return this._animation;
  }

  // sets animation selected from start menu
  set animation(value: any ) {
    if (value) {
      this._animation = value;
      this.options = {
        ...this.options, // In case you have other properties that you want to copy
        path: `../../assets/animations/${this.animation}.json`,

      };
      return;
    }
  }

  options: AnimationOptions = {
  };

 animationCreated(animationItem: AnimationItem): void {
    if (this.paused) {
      animationItem.autoplay = false;
      animationItem.loop = false;
      animationItem.goToAndStop(10, true) 
    }
  }
}
