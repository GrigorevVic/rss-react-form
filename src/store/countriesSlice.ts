import { createSlice } from '@reduxjs/toolkit';

import { countries } from '../util/countries';

export const countriesSlice = createSlice({
  initialState: countries,
  name: 'countries',
  reducers: {},
});
