import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dish } from 'src/app/models/dish.model';
import { Router } from '@angular/router';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent implements OnInit {

  newItemForm = new FormGroup({
    name: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    dishes : new FormControl("", Validators.required)
  });

  constructor(private router: Router, public dishService: DishService) { }

  ngOnInit(): void {
  }


  OnNewItem(): void{

    if(this.newItemForm.valid){
      let d = new Dish();
      d.name = this.newItemForm.controls["name"].value;
      d.price = this.newItemForm.controls["price"].value;
      d.dishes = this.newItemForm.controls["dishes"].value;
      this.dishService.AddNewDishToDb(d).subscribe(
        data => {},
        error => {} 
      );
      this.router.navigateByUrl('/indexadmin');
    }
    else{
      alert("Fill in form properly (fill in all fields)")
    }
  }
}
