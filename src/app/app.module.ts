import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';
import { NgApexchartsModule } from 'ng-apexcharts';

/* Menu Items */
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NgbButtonsModule, NgbDropdownModule, NgbPopoverModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { ComerceModule } from './comerce/comerce.module';
import { SharedModule } from './theme/shared/shared.module';
import { NavCenterComponent } from './theme/layout/admin/nav-bar/nav-center/nav-center.component';
import { SharedGlobalModule } from './shared-global/shared-global.module';
import { SuperAdminComponent } from './theme/layout/super-admin/super-admin.component';
import { ImportationsPageComponent } from './importations-page/importations-page.component';
import { ParametresImportationsPageComponent } from './parametres-importations-page/parametres-importations-page.component';
import { PopupImpressionFactureComponent } from './shared-global/popup-impression-facture/popup-impression-facture.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
    NavCenterComponent,
    SuperAdminComponent,
    ImportationsPageComponent,
    ParametresImportationsPageComponent,
    PopupImpressionFactureComponent,
  ],
  imports: [
    ComerceModule,
    SharedGlobalModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    NgbAccordionModule, NgbCollapseModule,
    NgbPopoverModule,
    NgApexchartsModule
  ],
  providers: [NavigationItem],
  bootstrap: [AppComponent]
})
export class AppModule { }
