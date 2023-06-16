import {
  Component,
  EventEmitter,
  HostListener,
  ElementRef,
  Input,
  Output,
} from '@angular/core';
import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-mac-taskbar-icon',
  templateUrl: './mac-taskbar-icon.component.html',
  styleUrls: ['./mac-taskbar-icon.component.sass'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        query(
          '.animate',
          [
            style({ opacity: 0, transform: 'translateY(100px)' }),
            stagger(100, [
              animate(
                '300ms cubic-bezier(0.35, 0, 0.25, 1)',
                keyframes([
                  style({ opacity: 0, transform: 'translateY(10px)' }),
                  style({ opacity: 1, transform: 'translateY(0)' }),
                ])
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
      transition(':leave', [
        query(
          '.animate',
          [
            style({ opacity: 1, transform: 'translateY(0px)' }),
            stagger(-100, [
              animate(
                '100ms cubic-bezier(0.35, 0, 0.25, 1)',
                style({ opacity: 0, transform: 'translateY(10px)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class MacTaskbarIconComponent {
  @Input() openFiles: any;
  @Input() showOpened: boolean;
  @Output() maximize: EventEmitter<string> = new EventEmitter<string>();
  animateIcons: boolean = true;

  ngOnChanges(changes: any) {
    this.animateIcons = changes?.showOpened?.currentValue;
  }

  openedIconClicked(item: any) {
    this.maximize.emit(item);
  }

  onToggleFab() {
    this.animateIcons = !this.animateIcons;
  }
}
