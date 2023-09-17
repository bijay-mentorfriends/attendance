import { createFeatureSelector } from '@ngrx/store';
import { Appstate } from '../interfaces/appstate';

export const selectAppState = createFeatureSelector<Appstate>('appState');