import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsService } from '../../providers/news-service/news-service';
import { PopoverController } from 'ionic-angular';
import { PopoverSharePage } from '../popover-share/popover-share';

@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html'
})
export class NewsDetailPage implements OnInit {

  public navCtrl: NavController;
  public navParams: NavParams;
  public newsService: NewsService;
  public popoverCtrl: PopoverController;
  public errorMessage: string;
  public news: any = {};

  constructor(navCtrl: NavController, newsService: NewsService, navParams: NavParams, popoverCtrl: PopoverController) {
    this.navCtrl = navCtrl;
    this.navParams = navParams;
    this.newsService = newsService;
    this.popoverCtrl = popoverCtrl;
  }

  ngOnInit() {
    let id = this.navParams.get('id');
    this.newsService.getNewsItem(id).subscribe(
      newsItem => { this.news = newsItem },
      error => this.errorMessage = error);
  }

  popover(event) {
    let popover = this.popoverCtrl.create(PopoverSharePage, {
      newsTitle: this.news.Title,
      newsContent: this.news.Content,
    });
    popover.present({ ev: event });
  }

}
