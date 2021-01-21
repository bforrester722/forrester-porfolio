
// for taskbar-component
export interface IStartMenu{
  id:     number;
  option: string;
  name:   string;
  icon?:  string;
}

// for data.service
export interface IAnimation{
  name:   string;
  viewer: string;
}

// for firebase.service
export interface IIcons{
  name: string;
  src:  string;
}

// for desktop-icon-component
export interface IDesktopIcon{
  icon:         string;
  index:        number;
  name:         string;
  viewer:       string
  education?:   any;
  src?:         string;
  paragraph?:   string;
  todos?:       any;
}

