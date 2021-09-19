import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AddComponent } from './add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DataService } from 'src/app/services/data/data.service';
import { TeamComponent } from '../team/team.component';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let router: Router;
  let mockDataService = {
    addMember: jasmine.createSpy('addMember')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [
        AngularMaterialModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'team', component: TeamComponent}
        ])
      ],
      providers: [{
        provide: DataService,
        useValue: mockDataService
      },
      ]
    }).compileComponents();

    router = TestBed.get(Router);
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancel() should navigate to the team route', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onCancel();
    expect(navigateSpy).toHaveBeenCalledWith(['/', 'team']);
  })

  it('onSubmit() should add to the data service', () => {
    component.addForm.setValue({
      'name': 'myname',
      'timeZone': 'myzone'
    });
    component.onSubmit();
    expect(mockDataService.addMember).toHaveBeenCalledWith('myname', 'myzone');
  })

  it('onSubmit() should navigate to the team route', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['/', 'team']);
  })
});
