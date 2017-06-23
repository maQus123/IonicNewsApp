import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsService } from '../../providers/news-service/news-service';
import { NewsDetailPage } from '../news-detail/news-detail';
import { PopoverController } from 'ionic-angular';
import { PopoverSettingsPage } from '../popover-settings/popover-settings';

@Component({
  selector: 'page-news-list',
  templateUrl: 'news-list.html'
})
export class NewsListPage implements OnInit {

  public navCtrl: NavController;
  public newsService: NewsService;
  public popoverCtrl: PopoverController;
  public errorMessage: string;
  public newsList: any = [];
  public newsListCopy: any = [];
  public searchQuery: string = '';
  public category: string = 'All';

  constructor(navCtrl: NavController, newsService: NewsService, popoverCtrl: PopoverController) {
    this.navCtrl = navCtrl;
    this.newsService = newsService;
    this.popoverCtrl = popoverCtrl;
  }

  detail(newsId: number) {
    this.navCtrl.push(NewsDetailPage, { id: newsId });
  }

  loadNews(refresher?: any) {
    if (refresher) {
      setTimeout(() => {
        refresher.complete();
      }, 3000);
    }
    this.newsService.getNewsList().subscribe(
      (news) => {
        if (this.category == 'Local') {
          news = news.filter((item) => { return (item.Category === this.category) });
        }
        this.newsList = news;
        if(refresher) {
          refresher.complete();
        }
        this.newsListCopy = this.newsList;
        this.search();
      },
      error => this.errorMessage = error);
  }

  ngOnInit() {
    this.loadNews();
  }

  popover(event) {
    let popover = this.popoverCtrl.create(PopoverSettingsPage);
    popover.present({ ev: event });
  }

  search() {
    if (this.searchQuery && this.searchQuery.trim() != '') {
      this.newsList = this.newsListCopy.filter((item) => {
        return (
          item.Teaser.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 ||
          item.Title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1
        );
      })
    }
  }

}
