import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface ExitPage {
  canExit: () => boolean | Observable<boolean>;
}

/***
 * This guard acts like a exit confirmation for the admin
 * this shows when admin refresh the page
 * this shows when admin exit the page
 *
 */
export const exitPageGuard: CanDeactivateFn<ExitPage> = (
  component: ExitPage
) => {
  return component.canExit();
};
