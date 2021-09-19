import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from './dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  addForm = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.router.navigate(['/', 'team']);
  }

  onReset(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.dataService.reset();
      }
    });
  }
}
