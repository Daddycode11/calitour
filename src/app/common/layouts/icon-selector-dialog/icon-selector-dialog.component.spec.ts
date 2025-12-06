import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSelectorDialogComponent } from './icon-selector-dialog.component';

describe('IconSelectorDialogComponent', () => {
  let component: IconSelectorDialogComponent;
  let fixture: ComponentFixture<IconSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconSelectorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
