import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { wait } from '../../helpers/helper';
import { OsService } from 'app/shared/services/os.service';

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2,
}

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.sass'],
})
export class WindowComponent implements AfterViewInit {
  @ViewChild('box') box: any;
  private boxPosition: any;
  private cachedTop: any;
  private cachedWidth: any;
  private cachedHeight: any;
  private cachedLeft: any;
  public mouse: any;
  public status: Status = Status.OFF;
  private mouseClick: any;
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  mouseMoveListener: any;
  touchMoveListener: any;
  os: string = '';
  // updates project to change backgroundColor if needed
  private _project: any = [];

  @Input() get project(): any {
    return this._project;
  }

  set project(value: any) {
    if (value) {
      this._project = value;

      this.loadBackground();
      return;
    }
  }

  // sets backgroundColor
  async loadBackground() {
    await wait(10);
    const { bg } = this.project;
    if (!this.box || this.os === 'mac') {
      this.box.nativeElement.style.backgroundColor = '';
      return;
    }

    this.box.nativeElement.style.backgroundColor = bg ? bg : 'white';
  }

  constructor(private renderer: Renderer2, private osService: OsService) {}
  ngOnInit() {
    this.osService.subscribe((data) => {
      this.os = data;
      this.loadBackground();
    });
  }
  ngAfterViewInit() {
    this.loadBox();
  }

  // sets window position
  private loadBox() {
    if (!this.box) {
      return;
    }
    const { left, top } = this.box.nativeElement.getBoundingClientRect();
    this.boxPosition = { left, top };
  }

  // sets status based mouse on moving or resizing window
  setStatus(event: MouseEvent, status: number) {
    this.box.nativeElement.style.transition = 'all .25s';
    if (status) {
      this.mouseClick = {
        x: event.clientX,
        y: event.clientY,
        left: this.project.left,
        top: this.project.top,
      };
      // adds listener to track mouse for move or resize
      this.mouseMoveListener = this.renderer.listen(
        'document',
        'mousemove',
        (e) => {
          this.mouse = { x: e.clientX, y: e.clientY };
          if (this.status === 1) {
            this.resize();
            return;
          }
          this.move();
        }
      );
    } else {
      if (this.mouseMoveListener) {
        this.mouseMoveListener();
      }
      if (this.touchMoveListener) {
        this.touchMoveListener();
      }
      this.loadBox();
    }
    this.status = status;
  }

  // sets status based touch on moving or resizing window
  setTouchStatus(event: TouchEvent, status: number) {
    this.box.nativeElement.style.transition = 'all .25s';
    if (status) {
      const touch = event.targetTouches[0];
      this.mouseClick = {
        x: touch.clientX,
        y: touch.clientY,
        left: this.project.left,
        top: this.project.top,
      };
      this.touchMoveListener = this.renderer.listen(
        'document',
        'touchmove',
        (e) => {
          const touch = e.targetTouches[0];
          this.mouse = { x: touch.clientX, y: touch.clientY };
          if (this.status === 1) {
            this.resize();
            return;
          }
          this.move();
        }
      );
    } else {
      if (this.touchMoveListener) {
        this.touchMoveListener();
      }
      this.loadBox();
    }
    this.status = status;
  }

  // re-adds transition on mouse up
  addTransition() {
    this.box.nativeElement.style.transition = 'all .25s';
  }

  // resizes window
  private resize() {
    this.box.nativeElement.style.transition = 'all 0s';

    this.project.width = Number(this.mouse.x > this.boxPosition.left)
      ? this.mouse.x - this.boxPosition.left
      : 0;
    this.project.height = Number(this.mouse.y > this.boxPosition.top)
      ? this.mouse.y - this.boxPosition.top
      : 0;
  }

  // moves window
  private move() {
    this.box.nativeElement.style.transition = 'all 0s';

    this.project.left =
      this.mouseClick.left + (this.mouse.x - this.mouseClick.x);
    this.project.top = this.mouseClick.top + (this.mouse.y - this.mouseClick.y);
  }

  // minimizes window
  minimizeClicked() {
    this.cachedWidth = this.project.width;
    this.cachedHeight = this.project.height;
    this.cachedLeft = this.project.left;
    this.cachedTop = this.project.top;
    const middle = this.project.width / 2;
    this.box.nativeElement.style.transform = `translate3d(calc(50vw - ${middle}px), 90vh, 0px) scale(0)`;
  }

  // restore and maximize window
  maximizeClicked() {
    const { innerHeight, innerWidth } = window;
    const padding = this.osService.getOs() === 'mac' ? 0 : 40;
    // if not maximized cache dimensions for when restored
    if (
      this.project.width !== innerWidth &&
      this.project.height !== innerHeight
    ) {
      this.cachedWidth = this.project.width;
      this.cachedHeight = this.project.height;
      this.cachedLeft = this.project.left;
      this.cachedTop = this.project.top;
    }
    // if already full screen restore to cached size and position
    if (
      this.project.width === innerWidth &&
      this.project.height === innerHeight - padding
    ) {
      if (
        this.cachedWidth !== innerWidth &&
        this.cachedHeight !== innerHeight
      ) {
        this.updateSize(
          this.cachedWidth,
          this.cachedHeight,
          this.cachedLeft,
          this.cachedTop
        );

        return;
      }
      console.log('what');
      // for phone size opens at full width and height so no cached
      this.updateSize(this.project.width / 2, this.project.height / 2, 32, 16);
      return;
    }

    // otherwise make window max width and height
    this.updateSize(innerWidth, innerHeight - padding, 0, 0);
  }

  // sets dimensions and postion of window
  updateSize(width: number, height: number, left: number, top: number) {
    window.requestAnimationFrame(() => {
      this.project.width = width;
      this.project.height = height;
      this.project.left = left;
      this.project.top = top;
      this.box.nativeElement.style.transform = `translate3d(${left}px, ${top}px, 0px) scale(1)`;
    });
  }

  // emits to app component to close tab and menus
  async closeClicked() {
    await wait(100);
    this.closed.emit(this.project); //for taskbar
  }

  // called from app-component to restore window if needed
  maximize() {
    const { innerHeight, innerWidth } = window;
    if (!this.cachedHeight) {
      this.updateSize(innerWidth, innerHeight, 0, 0);
      return;
    }

    this.updateSize(
      this.cachedWidth,
      this.cachedHeight,
      this.cachedLeft,
      this.cachedTop
    );
  }
}
