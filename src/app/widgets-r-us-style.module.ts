import {
  MatButtonModule, MatCheckboxModule, MatSidenavModule, MatAutocompleteModule,
  MatFormFieldModule, MatInputModule, MatIcon, MatIconModule, MatTabsModule, MatSelectModule, MatChipsModule
} from '@angular/material'
import {NgModule} from "@angular/core";
import {OVERLAY_PROVIDERS, OverlayContainer} from "@angular/cdk/overlay";

@NgModule({
  imports: [
    MatFormFieldModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule
  ],
  exports: [
    MatFormFieldModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule
  ],
  providers: [
    OVERLAY_PROVIDERS
  ]
})
export class WidgetsRUsStyleModule {
  constructor(private overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('widgets-r-us-dark-theme')
  }
}
