import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  loading: false,
  error: null,
  currentLocation: null,
  trackingActive: true,
  connectedUsersLocations: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateLiveLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    toggleTracking: (state) => {
      state.trackingActive = !state.trackingActive;
    },
    setConnectedUserLocations: (state, action) => {
      const newUserLocation = action.payload;
      const existingIndex = state.connectedUsersLocations.findIndex(
        (u) => u.userId === newUserLocation.userId
      );

      if (existingIndex >= 0) {
        state.connectedUsersLocations[existingIndex] = {
          ...state.connectedUsersLocations[existingIndex],
          ...newUserLocation,
        };
      } else {
        state.connectedUsersLocations.push(newUserLocation);
      }
    },
  },
});

export const { 
  setProfile, 
  clearProfile, 
  setLoading, 
  setError,
  updateLiveLocation,
  toggleTracking,
  setConnectedUserLocations
} = userSlice.actions;
export default userSlice.reducer;
