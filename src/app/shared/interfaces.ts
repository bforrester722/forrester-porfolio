// for taskbar-component
export interface IStartMenu {
  option?: string;
  name: string;
  [propName: string]: any;
}

// for taskbar-component
export interface ISecondMenu {
  index: number;
  name: string;
  size: string;
  type: string;
  viewer: string;
  icon?: string;
}

// for data.service, app, and taskbar
export interface IAnimation {
  bg?: string;
  index?: number;
  name: string;
  viewer: string;
}

// for firebase.service
export interface IIcons {
  name: string;
  src: string;
}

// for data.service, app, and taskbar
export interface IPortfolio {
  link: string;
  name: string;
  paragraph: string;
  src: string;
  type: string;
  viewer: string;
  [propName: string]: any;
}

// for desktop-icon-component
export interface IDesktopIcon {
  animation?: string;
  icon: string;
  name: string;
  link: string;
  viewer: string;
  education?: any;
  src?: string;
  paragraph?: string;
  todos?: any;
  experience: any;
}

export interface ILottie {
  name: string;
  setSpeed: (num: Number) => void;
  setDirection: (num: Number) => void;
  pause: () => void;
  play: () => void;
}

// for folder-items-component
export interface IFolderItem {
  bg: string;
  index: number;
  name: string;
  size: string;
  src?: string;
  viewer: string;
}

export interface ILottieOptions {
  loop: boolean;
  paused: boolean;
}
// for app component
export interface IOpenFile {
  height: number;
  index: number;
  uuid: string;
  items?: any;
  bg?: string;
  lastClicked: boolean;
  left: number;
  link?: string;
  name: string;
  openIndex: number;
  paragraph?: string;
  src?: string;
  top: number;
  viewer?: string;
  width: number;
}
