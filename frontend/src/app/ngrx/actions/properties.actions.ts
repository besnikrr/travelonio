import { createAction, props } from '@ngrx/store';
import { Property } from '../reducers/properties.reducers';
import { UpdatePropertyData } from '../../atomic-design/pages/sign-up/model/sign-up.data';
import {
  PropertyRequestData,
  PropertySummaryInfo,
} from '../../shared/interfaces/property';

const actionPrefix = '[Properties actions] ';

export const getPropertyRequest = createAction(
  actionPrefix + 'Get Property Request',
  props<{ propertyId: string }>()
);

export const getPublicPropertyRequest = createAction(
  actionPrefix + 'get Public Property Request',
  props<{ propertyId: string }>()
);

export const setProperty = createAction(
  actionPrefix + 'Set Property',
  props<{ property: Property }>()
);

export const getPropertiesRequest = createAction(
  actionPrefix + 'Get Properties Request'
);

export const getPropertyListRequest = createAction(
  actionPrefix + 'Get Property List Request',
  props<{ request: PropertyRequestData }>()
);

export const setProperties = createAction(
  actionPrefix + 'Set Properties',
  props<{ properties: Property[] }>()
);

export const setPropertyList = createAction(
  actionPrefix + 'Set Property List',
  props<{ properties: PropertySummaryInfo[] }>()
);

export const addProperty = createAction(
  actionPrefix + 'Add Property',
  props<{ property: Property }>()
);

export const createPropertyRequest = createAction(
  actionPrefix + 'Create Property Request'
);

export const updatePropertyRequest = createAction(
  actionPrefix + 'Update Property Request',
  props<{ propertyId: string; data: UpdatePropertyData }>()
);

export const updateProperty = createAction(
  actionPrefix + 'Update Property',
  props<{ propertyId: string; updatedProperty: Property }>()
);

export const uploadPropertyImageRequest = createAction(
  actionPrefix + 'Upload property image request',
  props<{ propertyId: string; file: File }>()
);

export const addPropertyImageId = createAction(
  actionPrefix + 'set new property image id',
  props<{ propertyId: string; imageId: string }>()
);

export const setAPropertyImageAsPrimaryRequest = createAction(
  actionPrefix + 'Set an image as primary request',
  props<{ propertyId: string; roomId: string | undefined; imageId: string }>()
);

export const setAPropertyImageAsPrimary = createAction(
  actionPrefix + 'Set an image as primary Success',
  props<{ propertyId: string; roomId: string | undefined; imageId: string }>()
);

export const deleteAPropertyImageRequest = createAction(
  actionPrefix + 'Delete an images request',
  props<{ propertyId: string; roomId: string | undefined; imageId: string }>()
);

export const deleteAPropertyImage = createAction(
  actionPrefix + 'Delete an images success',
  props<{ propertyId: string; roomId: string | undefined; imageId: string }>()
);

// delete property request
export const deletePropertyRequest = createAction(
  actionPrefix + 'Delete property request',
  props<{ propertyId: string }>()
);

// delete property
export const deleteProperty = createAction(
  actionPrefix + 'Delete property',
  props<{ propertyId: string }>()
);

export const markPropertyInputsDirty = createAction(
  actionPrefix + 'Mark Property Inputs Dirty',
  props<{ setTo: boolean }>()
);
