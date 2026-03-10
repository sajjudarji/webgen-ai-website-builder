import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWebsite: null,
  pages: [],
  currentPage: null,
  selectedComponentId: null,
  history: [], // Stack of page states for undo
  future: [], // Stack for redo
  deviceView: "desktop", // desktop, tablet, mobile
  isLoading: false,
};

export const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    setWebsite: (state, action) => {
      state.currentWebsite = action.payload;
      state.pages = action.payload.pages || [];
      if (state.pages.length > 0) {
        state.currentPage = JSON.parse(
          JSON.stringify(state.pages.find((p) => p.isHome) || state.pages[0]),
        );
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      state.history = [];
      state.future = [];
    },
    setDeviceView: (state, action) => {
      state.deviceView = action.payload;
    },
    addComponent: (state, action) => {
      if (state.currentPage) {
        state.history.push(
          JSON.parse(JSON.stringify(state.currentPage.layout)),
        );
        state.future = [];
        state.currentPage.layout.push(action.payload.component);
      }
    },
    updateComponent: (state, action) => {
      const { id, updates } = action.payload;
      if (state.currentPage) {
        state.history.push(
          JSON.parse(JSON.stringify(state.currentPage.layout)),
        );
        state.future = [];
        const index = state.currentPage.layout.findIndex((c) => c.id === id);
        if (index !== -1) {
          state.currentPage.layout[index] = {
            ...state.currentPage.layout[index],
            ...updates,
          };
        }
      }
    },
    undo: (state) => {
      if (state.history.length > 0 && state.currentPage) {
        state.future.push(JSON.parse(JSON.stringify(state.currentPage.layout)));
        state.currentPage.layout = state.history.pop();
      }
    },
    redo: (state) => {
      if (state.future.length > 0 && state.currentPage) {
        state.history.push(
          JSON.parse(JSON.stringify(state.currentPage.layout)),
        );
        state.currentPage.layout = state.future.pop();
      }
    },
    selectComponent: (state, action) => {
      state.selectedComponentId = action.payload;
    },
    removeComponent: (state, action) => {
      const id = action.payload;
      if (state.currentPage) {
        state.history.push(
          JSON.parse(JSON.stringify(state.currentPage.layout)),
        );
        state.future = [];
        state.currentPage.layout = state.currentPage.layout.filter(
          (c) => c.id !== id,
        );
        if (state.selectedComponentId === id) {
          state.selectedComponentId = null;
        }
      }
    },
    reorderComponents: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      if (state.currentPage) {
        state.history.push(
          JSON.parse(JSON.stringify(state.currentPage.layout)),
        );
        state.future = [];
        const result = Array.from(state.currentPage.layout);
        const [removed] = result.splice(oldIndex, 1);
        result.splice(newIndex, 0, removed);
        state.currentPage.layout = result;
      }
    },
    addPageToList: (state, action) => {
      state.pages.push(action.payload);
      state.currentPage = action.payload;
      state.history = [];
      state.future = [];
    },
  },
});

export const {
  setWebsite,
  setCurrentPage,
  setDeviceView,
  addComponent,
  updateComponent,
  undo,
  redo,
  selectComponent,
  removeComponent,
  reorderComponents,
  addPageToList,
} = builderSlice.actions;

export default builderSlice.reducer;
