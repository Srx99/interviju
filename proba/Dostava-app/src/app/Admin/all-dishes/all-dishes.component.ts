import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from 'src/app/models/dish.model';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-all-dishes',
  templateUrl: './all-dishes.component.html',
  styleUrls: ['./all-dishes.component.css']
})
export class AllDishesComponent implements OnInit {

  listOfDishes: Dish[] = [];

  constructor(private router: Router, public dishService: DishService) { }

  ngOnInit(): void {
    this.dishService.ReadDishesFromDb().subscribe(
      (data: Dish[]) => {
        this.listOfDishes = data;
      }
    );
  }

  deleteDish(dish: Dish): void{
    this.dishService.DeleteDish(dish).subscribe(
      data => {},
      error => {}
    );
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

}
