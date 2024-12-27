import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ILottie } from 'app/shared/interfaces';
export interface IOptions {
  paused: boolean;
  loop?: boolean;
  style?: string;
}

export interface INewOptions extends IOptions {
  path: string;
}

@Component({
  selector: 'app-lottie',
  templateUrl: './app-lottie.component.html',
  styleUrls: ['./app-lottie.component.sass'],
})
export class AppLottieComponent {
  @Input() animation: string = '';
  @Input() options: IOptions;
  newOptions: INewOptions;
  @ViewChild('lottieAnimation') lottieAnimation: { nativeElement: ILottie };

  // loads animation on init
  ngOnInit() {
    this.playAnimation();
  }

  async playAnimation(): Promise<void> {
    const json = await import(
      `../../../assets/animations/${this.animation}.json`
    );

    this.newOptions = {
      ...this.options, // In case you have other properties that you want to copy
      path: json.default,
    };
  }

  // catch changes to update animation
  ngOnChanges(changes: SimpleChanges) {
    this.updateAnimation(changes['options']?.currentValue);
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
