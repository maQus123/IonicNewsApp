import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'popover-share.html'
})
export class PopoverSharePage {

    public navCtrl: NavController;
    public navParams: NavParams;
    public socialSharing: SocialSharing;
    public newsTitle: string;
    public newsContent: string;

    constructor(navCtrl: NavController, navParams: NavParams, socialSharing: SocialSharing) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socialSharing = socialSharing;
        this.newsTitle = this.navParams.get('newsTitle');
        this.newsContent = this.navParams.get('newsContent');
    }

    shareViaEMail() {
        console.log(this.newsTitle);
        this.socialSharing.canShareViaEmail().then(() => {
            this.socialSharing.shareViaEmail(this.newsContent, 'News: ' + this.newsTitle, ["markus@lmaen.de"]).then(() => {
                console.log("Shared via E-Mail!");
            }).catch(() => {
                console.log("Error!");
            });
        }).catch(() => {
            console.log("Sharing via email is not possible!");
        });
    }

    shareViaWhatsapp() {
        this.socialSharing.shareViaWhatsApp('News: ' + this.newsTitle).then(() => {
            console.log("Shared via Whatsapp!");
        }).catch(() => {
            console.log("Error!");
        });
    }

}