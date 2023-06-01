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
  index: number;
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
  viewer: string;
  education?: any;
  src?: string;
  paragraph?: string;
  todos?: any;
}

export interface ILottie {
  name: string;
  setSpeed: (num: Number) => void;
  setDirection: (num: Number) => void;
  play: () => void;
}

// for folder-items-component
export interface IFolderItem {
  index: number;
  name: string;
  viewer: string;
  src?: string;
}
// for app component
export interface IOpenFile {
  height: number;
  index: number;
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
