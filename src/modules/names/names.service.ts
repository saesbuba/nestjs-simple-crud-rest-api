import { Injectable } from '@nestjs/common';

@Injectable()
export class NamesService {
  private _names: string[];

  constructor() {
    this._names = [];
  }

  getNames(startsWith: string | null | undefined) {
    if (!startsWith) return this._names;

    return this._names.filter((name) =>
      name.toLowerCase().trim().startsWith(startsWith.toLowerCase().trim()),
    );
  }

  createName(name: string) {
    const nameAlreadyExists = this._names.find(
      (nameFromNames) =>
        nameFromNames.toLowerCase().trim() === name.toLowerCase().trim(),
    );

    if (!nameAlreadyExists) {
      this._names.push(name);
      return true;
    }

    return false;
  }

  updateName(currentName: string, newName: string) {
    const indexOfCurrentName = this._names.findIndex(
      (name) => name.toLowerCase().trim() === currentName.toLowerCase().trim(),
    );
    const indexOfNewName = this._names.findIndex(
      (name) => name.toLowerCase().trim() === newName.toLowerCase().trim(),
    );

    if (indexOfCurrentName !== -1 && indexOfNewName === -1) {
      this._names[indexOfCurrentName] = newName;
      return true;
    }
    return false;
  }

  deleteName(nameToDelete: string) {
    const elementsInArrayNamesBeforeDelete = this._names.length;
    this._names = this._names.filter(
      (name) => name.toLowerCase().trim() !== nameToDelete.toLowerCase().trim(),
    );
    const elementsInArrayNamesAfterDelete = this._names.length;
    return elementsInArrayNamesBeforeDelete !== elementsInArrayNamesAfterDelete;
  }

  clearNames() {
    this._names = [];
    return true;
  }
}
