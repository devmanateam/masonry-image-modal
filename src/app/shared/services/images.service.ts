import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ft_image } from '../models.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  // collectionName: string = 'tempimages'
  collectionName: string = 'images'
  constructor(private firestore: AngularFirestore) {

  }

  getImageChanges(): Observable<any> {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }
  // getImages
  getImages() {
    return this.firestore.collection(this.collectionName).ref.limit(10).orderBy('timestamp', 'desc').get();
    // .snapshotChanges();
  }

  createImage(image: Ft_image) {
    return this.firestore.collection(this.collectionName).add(image);
  }

  updateImage(image: Ft_image) {
    delete image.id;
    this.firestore.doc(this.collectionName + '/' + image.id).update(image);
  }

  deleteImage(imageId: string) {
    this.firestore.doc(this.collectionName + '/' + imageId).delete();
  }

  getLikeOfImage(album) {
    console.log("album:", album);
    let ipAddress = localStorage.getItem('fp_currentid');
    return this.firestore.doc(this.collectionName + "/" + album.id).collection('likes').doc(ipAddress).get();
  }

  doLikeImage(image: Ft_image) {
    // let ipAddress = localStorage.getItem('fp_currentid');
    // if (!ipAddress) return;
    // let findex = image.ips.findIndex(x => { return x === ipAddress });
    // if (findex > -1) {
    //   image.ips.splice(findex, 1);
    //   image.likes--;
    // } else {
    //   image.ips.push(ipAddress)
    //   image.likes++;
    // }
    this.firestore.doc(this.collectionName + '/' + image.id).set({
      ips: image.ips,
      likes: image.likes,
      url: image.url,
      isShow: image.isShow,
      essence: image.essence,
      footprint: image.footprint
    });
  }

  doUpdateShowImage(image: Ft_image) {
    this.firestore.doc(this.collectionName + '/' + image.id).set({
      ips: image.ips,
      likes: image.likes,
      url: image.url,
      isShow: image.isShow
    });
  }
}
