import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsService } from '../../providers/news-service/news-service';

@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html'
})
export class NewsDetailPage implements OnInit {

  public navCtrl: NavController;
  public navParams: NavParams;
  public newsService: NewsService;
  public errorMessage: string;
  public news: any = {};

  constructor(navCtrl: NavController, newsService: NewsService, navParams: NavParams) {
    this.navCtrl = navCtrl;
    this.navParams = navParams;
    this.newsService = newsService;
  }

  ngOnInit() {
    let id = this.navParams.get('id');
    this.newsService.getNewsItem(id).subscribe(
      newsItem => { this.news = newsItem },
      error => this.errorMessage = error);
  }

}
