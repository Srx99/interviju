import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css']
})
export class IndexAdminComponent implements OnInit {

  constructor(private router: Router) { }

 korisnik1: any;

  ngOnInit(): void {
    this.korisnik1 = localStorage.getItem("email");
  }

}
