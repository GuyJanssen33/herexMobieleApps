import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, PermissionStatus, Photo} from '@capacitor/camera';
import {Preferences} from '@capacitor/preferences';
import {Capacitor} from "@capacitor/core";
import {Directory, Filesystem} from "@capacitor/filesystem";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  readonly #photos: Photo[] = [];
  readonly #key = 'photos';
  #photoURIs: string[]= [];
  #permissionGranted: PermissionStatus = {camera: 'granted', photos: 'granted'};

  constructor() {
    this.#loadData();
  }

  getPhotos(): Photo[] {
    return this.#photos;
  }

  async takePhoto(): Promise<void> {
    if (!this.#haveCameraPermission() || !this.#havePhotosPermission()) {
      await this.#requestPermissions();
    }
    if (!this.#haveCameraPermission() && !this.#havePhotosPermission()) {
      return;
    }

    if (Capacitor.isNativePlatform()) {
      await this.#takePhotoNative();
    } else {
      await this.#takePhotoPWA();
    }
    await this.#persistPhotoURIs();
  }

  async #takePhotoNative(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      saveToGallery: this.#havePhotosPermission(),
      source: this.#determinePhotoSource()
    });

    if (image?.path) {
      this.#photoURIs.push(image.path);
    }

    this.#photos.push(image);
  }

  async #takePhotoPWA(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    const uri = await this.#saveImageToFileSystem(image);
    this.#photoURIs.push(uri);
    image.path = uri;

    image.dataUrl = `data:image/${image.format};base64,${image.base64String}`;
    this.#photos.push(image);
  }

  #determinePhotoSource(): CameraSource {
    if (this.#havePhotosPermission() && this.#haveCameraPermission()) {
      return CameraSource.Prompt;
    } else {
      return this.#havePhotosPermission() ?
        CameraSource.Photos : CameraSource.Camera;
    }
  }

  async #loadPhotos(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await this.#loadPhotosNative();
    } else {
      await this.#loadPhotosPWA();
    }
  }

  async #loadPhotosPWA(): Promise<void> {
    for (const uri of this.#photoURIs) {

      const data = await Filesystem.readFile({
        path: uri
      });

      const format = this.#getPhotoFormat(uri);
      this.#photos.push({
        dataUrl: `data:image/${format};base64,${data.data}`,
        format,
        path: uri,
        saved: false
      });
    }
  }

  async #loadPhotosNative(): Promise<void> {
    for (const uri of this.#photoURIs) {
      this.#photos.push({
        path: uri,
        format: this.#getPhotoFormat(uri),
        webPath: Capacitor.convertFileSrc(uri),
        saved: this.#havePhotosPermission()
      });
    }
  }

  #getPhotoFormat(uri: string): string {
    const splitUri = uri.split('.');
    return splitUri[splitUri.length - 1];
  }

  async #saveImageToFileSystem(photo: Photo): Promise<string> {
    if (!photo.base64String) {
      throw new Error(`Can't write the photo to the filesystem because there is no base64 data.`)
    }

    const fileName = `${new Date().getTime()}.${photo.format}`;
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: photo.base64String,
      directory: Directory.Data
    });
    return savedFile.uri;
  }

  #haveCameraPermission(): boolean {
    return this.#permissionGranted.camera === 'granted';
  }

  #havePhotosPermission(): boolean {
    return this.#permissionGranted.photos === 'granted';
  }

  async #requestPermissions(): Promise<void> {
    try {
      this.#permissionGranted = await Camera.requestPermissions({permissions: ['photos', 'camera']});
    } catch (error) {
      console.error(`Permissions aren't available on this device: ${Capacitor.getPlatform()} platform.`);
    }
  }
  async #retrievePhotoURIs(): Promise<void> {
    const uris = await Preferences.get({key: this.#key});
    if (uris && uris.value !== null) {
      this.#photoURIs = JSON.parse(uris.value);
    } else {
      this.#photoURIs = [];
    }
  }

  async #persistPhotoURIs(): Promise<void> {
    await Preferences.set({
      key: this.#key,
      value: JSON.stringify(this.#photoURIs)
    });
  }



  async #retrievePermissions(): Promise<void> {
    try {
      this.#permissionGranted = await Camera.checkPermissions();
    } catch (error) {
      console.error(`Permissions aren't available on this device: ${Capacitor.getPlatform()} platform.`);
    }
  }

  async #loadData(): Promise<void> {
    await this.#retrievePhotoURIs();
    await this.#retrievePermissions();
    await this.#loadPhotos();
  }
}
