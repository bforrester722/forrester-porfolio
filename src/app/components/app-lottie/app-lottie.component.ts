import { Component, Input, ViewChild } from '@angular/core';
import { ILottie } from 'app/shared/interfaces';

@Component({
  selector: 'app-lottie',
  templateUrl: './app-lottie.component.html',
  styleUrls: ['./app-lottie.component.sass'],
})
export class AppLottieComponent {
  @Input() animation: string = '';
  @Input() options: any = {};
  @ViewChild('lottieAnimation') lottieAnimation: { nativeElement: ILottie };

  // loads animation on init
  ngOnInit() {
    this.options = {
      ...this.options, // In case you have other properties that you want to copy
      path: `../../assets/animations/${this.animation}.json`,
    };
  }

  // catch changes to update animation
  ngOnChanges(changes: any) {
    this.updateAnimation(changes.options?.currentValue);
  }

  // pauses or plays animation
  updateAnimation(opt: { paused: boolean; name: string }): void {
    if (!this.lottieAnimation?.nativeElement) return;
    const { nativeElement } = this.lottieAnimation;
    opt.paused ? nativeElement.pause() : nativeElement.play();
  }

  handlePaused() {
    const { nativeElement } = this.lottieAnimation;
    nativeElement.setSpeed(2);
    nativeElement.setDirection(-1);
    nativeElement.play();
  }

  handleUnpaused() {
    const { nativeElement } = this.lottieAnimation;
    nativeElement.setSpeed(1);
    nativeElement.setDirection(1);
    nativeElement.play();
  }
}
