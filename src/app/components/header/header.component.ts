import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoingeckoService } from '../../service/coingecko.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchQuery: string = '';
  constructor(
    private router: Router,
    private coingeckoService: CoingeckoService
  ) {}

  trendCategories: any[] = [];
  trendCoins: any[] = [];
  currencyCode = 'USD'; // Define your currency code here
  currencySymbol = '€';

  ngOnInit(): void {
    this.loadTrending();
  }

  loadTrending(): void {
    this.coingeckoService.getTrending().subscribe(
      (data) => {
        console.log(data)
        setTimeout(() => {
          this.trendCategories = data.categories;
          this.trendCoins = data.coins;
        }, 1500);
      },
      (error) => {
        // Handle errors if any
        // If useApi is false, load data from local JSON
        this.coingeckoService.loadLocalTrending().subscribe((data) => {
          this.trendCategories = data.categories;
          this.trendCoins = data.coins;
        });
      }
    );
  }

  goTo(path: string, params: any[] = []) {
    let navigationParams: any[];

    if (params.length > 0) {
      navigationParams = [path, ...params];
    } else {
      navigationParams = [path];
    }

    this.router.navigate(navigationParams);
  }
}