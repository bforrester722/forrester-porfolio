import { Component, Input } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-lottie',
  templateUrl: './app-lottie.component.html',
  styleUrls: ['./app-lottie.component.sass'],
})
export class AppLottieComponent {
  @Input() paused: boolean = false;
  @Input() speed: number = 1;
  private _animation: string = '';

  @Input() get animation(): string {
    return this._animation;
  }

  // sets animation selected from start menu
  set animation(value: string) {
    if (value) {
      this._animation = value;

      this.options = {
        ...this.options, // In case you have other properties that you want to copy
        path: `../../assets/animations/${this.animation}.json`,
      };
      return;
    }
  }

  options: AnimationOptions = {};

  animationCreated(animationItem: AnimationItem): void {
    if (this.paused) {
      animationItem.autoplay = false;
      animationItem.loop = false;
      animationItem.goToAndStop(10, true);
    }
    animationItem.setSpeed(this.speed);
  }
}
