import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOpenFile } from '../interfaces';
import { v4 as uuid } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class OpenFilesService {
  files: Array<IOpenFile> = [];

  private openFilesInfo = new BehaviorSubject<any>([]);

  setFiles(files: []) {
    this.openFilesInfo.next(files);
  }

  getFiles() {
    return this.openFilesInfo.getValue();
  }

  // For having windows open with random dimensions and placement
  getRandom() {
    // if small screen open full width and height
    if (window.innerWidth < 700) {
      const height = window.innerHeight - 40;
      const width = window.innerWidth;
      return { height, width, left: 0, top: 0 };
    }
    const plus = window.innerWidth / 4;
    const height = Math.floor(Math.random() * 200) + plus;
    const width = height + 100;
    const top = Math.floor(Math.random() * 200) + 50;
    const left = Math.floor(Math.random() * plus) + plus / 12;
    return { height, width, top, left };
  }

  // gets higher index for openIndex
  getHigherIndex(files: IOpenFile[]) {
    return files.length
      ? files?.reduce((prev: any, current: any) => {
          return prev.openIndex > current.openIndex ? prev : current;
        }).openIndex + 1
      : 1;
  }

  // adds file to files
  addFile(file: any) {
    const oldFiles = this.openFilesInfo.getValue();
    const alreadyOpenIndex = oldFiles.findIndex(
      (oldFile: IOpenFile) => oldFile.uuid === file.uuid
    );

    if (alreadyOpenIndex > -1) {
      return this.updateLast(file);
    }
    const builtItem = {
      uuid: uuid(),
      ...file,
      ...this.getRandom(),
      openIndex: this.getHigherIndex(oldFiles),
    };

    return this.openFilesInfo.next([...oldFiles, builtItem]);
  }

  removeFile(file: any) {
    const oldFiles = this.openFilesInfo.getValue();
    const alreadyOpenIndex = oldFiles.findIndex(
      (oldFile: IOpenFile) => oldFile.uuid === file.uuid
    );
    oldFiles.splice(alreadyOpenIndex, 1);
    return this.openFilesInfo.next([...oldFiles]);
  }

  // finds and updates file
  updateFile(file: any, animations: any, icons: any) {
    const oldFiles = this.openFilesInfo.getValue();
    const alreadyOpenIndex = oldFiles.findIndex(
      (oldFile: IOpenFile) => oldFile.uuid === file.uuid
    );
    const { bg, index, ...rest } = file;

    const type = file.src ? icons : animations;
    // get index of left or right
    const newIndex =
      index + 1 > type.length ? 0 : index === -1 ? type.length - 1 : index;

    oldFiles[alreadyOpenIndex] = {
      ...rest,
      ...type[newIndex],
    };
    this.openFilesInfo.next(oldFiles);
  }

  updateLast(file: IOpenFile) {
    const oldFiles = this.openFilesInfo.getValue();
    const alreadyOpenIndex = oldFiles.findIndex(
      (oldFile: IOpenFile) => oldFile.uuid === file.uuid
    );
    const openIndex = this.getHigherIndex(oldFiles);

    // if last clicked already has highest return
    if (oldFiles[alreadyOpenIndex]?.openIndex === openIndex - 1) return;
    if (!oldFiles[alreadyOpenIndex]?.uuid) {
      const newFile = { ...file, openIndex: openIndex };
      this.openFilesInfo.next([...oldFiles, newFile]);
      return;
    }
    // if last clicked already in openfiles but not highes make highest
    if (oldFiles[alreadyOpenIndex]?.uuid === file?.uuid) {
      oldFiles[alreadyOpenIndex] = { ...oldFiles[alreadyOpenIndex], openIndex };
      this.openFilesInfo.next(oldFiles);
      return;
    }
  }

  subscribe(callback: (data: IOpenFile[]) => void) {
    return this.openFilesInfo.asObservable().subscribe(callback);
  }
}
