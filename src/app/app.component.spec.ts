import { AppComponent } from './app.component';
import { async, TestBed } from '@angular/core/testing';
/* tslint:disable: max-line-length */

describe('App Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
      declarations: [AppComponent]
    });
  });

  it('should contain app text', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toContainText('Angular Starter App');
  }));

});
