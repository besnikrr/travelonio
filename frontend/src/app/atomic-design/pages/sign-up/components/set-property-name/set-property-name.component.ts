import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PropertyTypes } from '../../model/property-types';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { select, Store } from '@ngrx/store';
import {
  dirtyInputs,
  propertySelector,
} from '../../../../../ngrx/selectors/properties.selectors';
import { Subscription } from 'rxjs';
import { Property } from '../../../../../ngrx/reducers/properties.reducers';
import {
  deleteAPropertyImageRequest,
  setAPropertyImageAsPrimaryRequest,
  updatePropertyRequest,
  uploadPropertyImageRequest,
} from '../../../../../ngrx/actions/properties.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-set-property-name',
  templateUrl: './set-property-name.component.html',
  styleUrls: ['./set-property-name.component.scss'],
})
export class SetPropertyNameComponent implements OnInit {
  currentLanguage = 'EN';
  public PropertyTypes = PropertyTypes;
  public subscription = new Subscription();
  public selectedProperty: Property;

  public hotelPlaceHolder = $localize`:Hotel Name@@hotelNameText:Hotel Name`;
  public apartmentPlaceHolder = $localize`:Apartment Name@@apartmentNameText:Apartment Name`;

  public dirtyInputs = this.store.pipe(select(dirtyInputs));

  constructor(
    public dialog: MatDialog,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.subscription.add(
      this.store.pipe(select(propertySelector)).subscribe((property) => {
        if (property) {
          this.selectedProperty = property;
        }
      })
    );
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = location.href.includes('/al') ? 'AL' : 'EN';
    }
  }

  ngOnInit(): void {}

  propertyNameChanged($event: string): void {
    this.store.dispatch(
      updatePropertyRequest({
        propertyId: this.selectedProperty.propertyId,
        data: {
          name: $event,
        },
      })
    );
  }

  imageUploaded($event: { propertyId: string; file: File }): void {
    this.store.dispatch(
      uploadPropertyImageRequest({
        propertyId: $event.propertyId,
        file: $event.file,
      })
    );
  }

  deletePropertyImage($event: {
    propertyId: string;
    roomId: string | undefined;
    imageId: string;
  }): void {
    this.store.dispatch(
      deleteAPropertyImageRequest({
        propertyId: $event.propertyId,
        roomId: undefined,
        imageId: $event.imageId,
      })
    );
  }

  setImageAsPrimary($event: {
    propertyId: string;
    roomId: string | undefined;
    imageId: string;
  }): void {
    this.store.dispatch(
      setAPropertyImageAsPrimaryRequest({
        propertyId: $event.propertyId,
        roomId: undefined,
        imageId: $event.imageId,
      })
    );
  }

  openSuggestionsDialog(event: Event): void {
    if (this.currentLanguage === 'EN') {
      this.openSuggestionsDialogEnglish(event);
    } else if (this.currentLanguage === 'AL') {
      this.openSuggestionsDialogShqip(event);
    }
  }

  openSuggestionsDialogEnglish(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '639.72px',
      panelClass: 'custom-dialog',
      data: {
        title: 'Need help filling the name of your property?',
        template: `
				<p>It is important that you choose the right name for your property so guests can quickly identify you and have an idea what property yours is:</p>
				<p>If you are a <b>HOTEL, RESORT, BED & BREAKFAST or INN:</b></p>
				<ul>
					<li>Make sure you use your property’s official name so guest can easily find you when they arrive at your place</li>
					<li>Use terms that best describe your property like: Resort, Hotel or Bed & Breakfast (B&B)</li>
					<li>Example:</li>
					<ul>
						<li>Hotel ABC</li>
						<li>ABC Resort and Spa</li>
						<li>ABC B&B</li>
					</ul>
				</ul>
				<p>If you are an <b>APARTMENT, VILLA or HOME:</b></p>
				<ul>
					<li>Use terms that describe your property’s location, type or its surroundings</li>
					<li>Example:</li>
					<ul>
						<li>Double room apartment with sea view in Durres</li>
						<li>Single room in a shared apartment near the city center</li>
						<li>One bedroom apartment with city view in Saranda</li>
						<li>Modern 4 bedroom Villa with private garden in Ksamil</li>
						<li>Spacious apartment near the beach</li>
					</ul>
				</ul>`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openSuggestionsDialogShqip(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '639.72px',
      panelClass: 'custom-dialog',
      data: {
        title: 'Keni nevojë për ndihmë për të plotësuar emrin e pronës suaj?',
        template: `
				<p>Është e rëndësishme që të zgjidhni emrin e duhur për pronën tuaj në mënyrë që të mysafirët të mund t'ju identifikojnë shpejt dhe të kenë një ide se çfarë prone është:</p>
				<p>Nëse jeni <b>HOTEL, RESORT, BED & BREAKFAST ose BUJTINË:</b></p>
				<ul>
					<li>Sigurohuni që të përdorni emrin zyrtar të pronës suaj</li>
					<li>Është mirë të perdoreni terma ndërkombetarë që ëmri të jetë leht i kuptueshëm për pushuesit e huaj. Emrat nuk do të përkthehen nga verzioni që ju keni shkruar</li>
					<li>Përdorni terma që përshkruajnë më mirë pronën tuaj si: Resort, Hotel ose Bed & Breakfast (B&B), Inn, etc.</li>
					<li>Shëmbuj:</li>
					<ul>
						<li>Hotel ABC</li>
						<li>ABC Resort and Spa</li>
						<li>ABC B&B</li>
						<li>BUJTINA ABC ose ABC INN</li>
					</ul>
				</ul>
				<p>Nëse jeni një <b>APARTAMENT, VILLË ose SHTËPI:</b></p>
				<ul>
					<li>Përdorni terma që përshkruajnë vendndodhjen, llojin ose rrethinën e pronës suaj</li>
					<li>Shëmbuj:</li>
					<ul>
						<li>Apartament dy dhomësh me pamje nga deti në Durrës</li>
						<li>Dhomë teke në një apartament të përbashkët pranë qendrës së qytetit</li>
						<li>Apartament 1+1 me pamje nga qyteti në Sarandë</li>
						<li>Vile moderne me 4 dhoma gjumi me kopsht privat ne Ksamil</li>
						<li>Apartament me hapsirë të gjërë prane plazhit</li>
					</ul>
				</ul>`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
