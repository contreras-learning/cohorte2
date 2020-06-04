import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtroComponent } from './otro.component';

describe('OtroComponent', () => {
  let component: OtroComponent;
  let fixture: ComponentFixture<OtroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtroComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
