import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, HostListener, Renderer2  } from '@angular/core';
import { wait } from '../../helpers/helper';

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}


@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.sass']
})

export class WindowComponent implements AfterViewInit {
  @Input() width: number = 0;
  @Input() height: number = 0;
  @Input() left: number = 0;
  @Input() top: number = 0;
  @ViewChild('box') box: any;
  private boxPosition: any;
  private containerPos: any;
  private cachedTop: any;
  private cachedMinimizedTop: any;
  private cachedWidth: any;
  private cachedHeight: any;
  private cachedLeft: any;
  public mouse: any
  public status: Status = Status.OFF;
  private mouseClick: any;
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  mouseMoveListener: any;
  touchMoveListener: any;
  // updates project to change backgroundColor if needed
  private _project: any = [];

  @Input() get project(): any {
    return this._project;
  }

  set project(value: any ) {
    if (value) {
      this._project = value;
      this.loadBackground();
    	return;
    }
  }

  // sets backgroundColor
  async loadBackground() {
    await wait(10);  
    const {bg} = this.project;
    if (!this.box) { return; }
     this.box.nativeElement.style.backgroundColor = bg ? bg : 'white';
  }
  
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(){
    this.loadBox();
    this.loadContainer();
  }

  // sets window position
  private loadBox(){
  	if(!this.box) { return; }
    const {left, top} = this.box.nativeElement.getBoundingClientRect();
    this.boxPosition = {left, top};
  }

  // limits where you can move window on screen
  private loadContainer(){
  	if(!this.box) { return; }
    const left = this.boxPosition.left - this.left - 128;
    const top = this.boxPosition.top - this.top - 32;
    const right = left + window.innerWidth + 256;
    const bottom = top + window.innerHeight + this.height - 64;
    this.containerPos = { left, top, right, bottom };
  }

  // sets status based mouse on moving or resizing window
  setStatus(event: MouseEvent, status: number){
     this.box.nativeElement.style.transition = 'all .25s';
     if (status) {
      this.mouseClick = { x: event.clientX, y: event.clientY, left: this.left, top: this.top };
      // adds listener to track mouse for move or resize
      this.mouseMoveListener = this.renderer.listen('document', 'mousemove', e => {
        this.mouse = { x: e.clientX, y: e.clientY };
        if (this.status === 1) {
          this.resize();
          return
        }
        this.move();
      });
    }
    else {
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
  setTouchStatus(event: TouchEvent, status: number){
   	this.box.nativeElement.style.transition = 'all .25s';
    if(status) {
      const touch = event.targetTouches[0]
      this.mouseClick = { x: touch.clientX, y: touch.clientY, left: this.left, top: this.top };
      this.touchMoveListener = this.renderer.listen('document', 'touchmove', e => {
        const touch = e.targetTouches[0];
        this.mouse = { x: touch.clientX, y: touch.clientY };
        if (this.status === 1) {
          this.resize();
          return
        }
        this.move();
      });
    } 
    else {
       if (this.touchMoveListener) {
        this.touchMoveListener();
      }
 
      this.loadBox();
    }
    this.status = status;
  }


  // re-adds transition on mouse up
  addTransition(){
 		this.box.nativeElement.style.transition = 'all .25s';
  }

  // resizes window
  private resize(){
  	this.box.nativeElement.style.transition = 'all 0s';
    // if(this.resizeCondMeet()){
      this.width = Number(this.mouse.x > this.boxPosition.left) ? this.mouse.x - this.boxPosition.left : 0;
      this.height = Number(this.mouse.y > this.boxPosition.top) ? this.mouse.y - this.boxPosition.top : 0;
    // }
  }

  // contains resize of window to screen
  // TODO: choppy find a better way to do this
  private resizeCondMeet(){
    return (this.mouse.x < this.containerPos.right - 128 && this.mouse.y < this.containerPos.bottom);
  }

  // moves window
  private move(){

  	this.box.nativeElement.style.transition = 'all 0s';
    // if(this.moveCondMeet()){
      this.left = this.mouseClick.left + (this.mouse.x - this.mouseClick.x);
      this.top = this.mouseClick.top + (this.mouse.y - this.mouseClick.y);
    // }
  }

  // contains movement of window to screen
  // TODO: choppy find a better way to do this
  private moveCondMeet(){
    const offsetLeft = this.mouseClick.x - this.boxPosition.left; 
    const offsetRight = this.width - offsetLeft; 
    const offsetTop = this.mouseClick.y - this.boxPosition.top;
    const offsetBottom = this.height - offsetTop;
    return (
      this.mouse.x > this.containerPos.left + offsetLeft && 
      this.mouse.x < this.containerPos.right - offsetRight &&
      this.mouse.y > this.containerPos.top + offsetTop &&
      this.mouse.y < this.containerPos.bottom - offsetBottom
      );
  }

  // minimizes window
  minimizeClicked() {
  	const {left, top} = this.box.nativeElement.getBoundingClientRect();
  	this.cachedMinimizedTop = top;
  	this.box.nativeElement.style.transform = `translate3d(${left}px, 100vh, 0px)`;
  }

  // restore and maximize window
	maximizeClicked() {

		const {innerHeight, innerWidth} = window;
    // if not maximized cache dimensions for when restored
		if (this.width !== innerWidth && this.height !== innerHeight) {
      this.cachedWidth   = this.width;
			this.cachedHeight  = this.height;
			this.cachedLeft    = this.left;
			this.cachedTop     = this.top;
		}
    // if already full screen restore to cached size and position
		if (this.width === innerWidth && this.height === innerHeight - 40) {
      if (this.cachedWidth) {
        this.updateSize(this.cachedWidth, this.cachedHeight, this.cachedLeft, this.cachedTop); 
        return;
      }
      // for phone size opens at full width and height so no cached
      this.updateSize(this.width / 2, this.height / 2, 32, 16);
      return;
		}
    // otherwise make window max width and height
    this.updateSize(innerWidth, innerHeight - 40, 0, 0);
	}

  // sets dimensions and postion of window
  updateSize(width: number, height: number, left: number, top: number) {
    const {innerHeight, innerWidth} = window;
    window.requestAnimationFrame(() => {
      this.width  = width;
      this.height = height;
      this.left   = left;
      this.top    = top;
    });
  }

  // emits to app component to close tab and menus
  async closeClicked() {
    await wait(100);
    this.closed.emit(this.project); //for taskbar
  }

	// called from app-component to restore window if needed
  maximize() {
  	const {left, top} = this.box.nativeElement.getBoundingClientRect();
    if (top < window.innerHeight) { return; }
 		this.box.nativeElement.style.transform = `translate3d(${left}px, ${this.cachedMinimizedTop}px, 0px)`;
	}



}