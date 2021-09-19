import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DataService } from '../../services/data/data.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addForm: FormGroup;
  timeZones: string[] = ['America/Los_Angeles', 'America/Denver', 'America/Phoenix', 'America/Chicago', 'America/New_York', 'America/La_Paz', 'America/Sao_Paulo', 'America/Buenos_Aires'];

  get name() { return this.addForm.get('name')!; }
  get timeZone() { return this.addForm.get('timeZone')!; }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService) {

    this.addForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required
      ]),
      timeZone: new FormControl('', [
        Validators.required
      ]),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.dataService.addMember(this.addForm.value.name, this.addForm.value.timeZone);
    this.router.navigate(['/', 'team']);
  }

  onCancel(): void {
    this.router.navigate(['/', 'team']);
  }
}
