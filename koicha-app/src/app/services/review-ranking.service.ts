import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCardData } from '../components/utility/product-card/productCardData';

@Injectable({
  providedIn: 'root',
})
export class ReviewRankingService {
  private productsList: ProductCardData[] = [];
  private reviewingProduct?: ProductCardData;
  private lowComparisonIndex?: number;
  private highComparisonIndex?: number;
  // stack of all of the products ranked
  // pop the product when the user selects undo
  private indexesOfProductsRanked: number[] = [];
  private currentComparisonIndex = 0; // refactor this to hold the actual ProductCardData to pass down to the UI components

  private currentAnchor$ = new BehaviorSubject<ProductCardData | undefined>(
    undefined
  );
  private currentComparison$ = new BehaviorSubject<ProductCardData | undefined>(
    undefined
  );

  currentAnchorObservable = this.currentAnchor$.asObservable();
  currentComparisonObservable = this.currentComparison$.asObservable();

  initializeRanking(
    reviewingProduct: ProductCardData,
    productsToCompare: ProductCardData[]
  ) {
    this.reviewingProduct = reviewingProduct;
    this.productsList = productsToCompare;
    this.currentComparisonIndex = 0; // TODO: algo to find the first product to compare to
    this.lowComparisonIndex = 0;
    this.highComparisonIndex = this.productsList.length;
    this.currentComparisonIndex = this.findInitialComparisonProduct();
    this.emitState();
  }

  // uses a search algo to find the initial product to compare to
  // (product with same rated score or next highest score based on recommendation )
  findInitialComparisonProduct() {
    return 0;
  }

  // TODO: implement this based on algo
  selectWinner(winner: ProductCardData) {
    // update the indexes
    this.executeRanking(winner);
    // if there are no more products left to compare,
    // save ranking (new product index) emit ranking completed
    // and the new ProductCardData with the review from the save
    // ranking response
  }

  executeRanking(winner: ProductCardData) {
    if (
      this.reviewingProduct &&
      this.highComparisonIndex &&
      this.lowComparisonIndex
    ) {
      const comparisonProduct = this.productsList[this.currentComparisonIndex];
      // if the product we are reviewing wins, compare all products higher than the comparison product
      // so we shift up the low pointer for product comparison
      // if the comparison product wins, compare all products lower than the comparison product
      // and we down the high pointer for the product comparison
      if (winner.id == this.reviewingProduct.id) {
        this.lowComparisonIndex = this.currentComparisonIndex + 1; // TODO: consider the +1 here
      } else if (winner.id == comparisonProduct.id) {
        this.highComparisonIndex = this.currentComparisonIndex;
      }
      // the new comparison is the midpoint -> low to the high / 2
      this.currentComparisonIndex = Math.ceil(
        (this.highComparisonIndex - this.lowComparisonIndex) / 2
      );
      // finally, push index of new comparison product to the stack indexesOfProductsRanked
      // to keep track of which products are compared
      this.indexesOfProductsRanked.push(this.currentComparisonIndex);
    }
  }

  // TODO: implement this based on algo
  undoProductComparison() {
    const prevProductComparisonIndex = this.indexesOfProductsRanked.pop();
    this.currentComparisonIndex = prevProductComparisonIndex; // TODO: resolve null check here
    // make sure to reset the indexes back to the prev
  }

  // set the score equal to the score of the other product
  scoreTooTough() {
    // set the ranking the same as the other product (insert right next to)
    // emit ranking completed
  }

  // skip over this product to compare
  skipNextProduct() {
    // go to the immediate next index to compare to
  }

  private emitProductComparisonState() {}

  private emitRankingCompleted() {}
}
