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
  isPreview: false,
  leftPanelCollapsed: false,
  rightPanelCollapsed: false,
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
      state.selectedComponentId = null;
    },
    setDeviceView: (state, action) => {
      state.deviceView = action.payload;
    },
    addComponent: (state, action) => {
      const { component, parentId } = action.payload;
      if (state.currentPage) {
        state.history.push(JSON.parse(JSON.stringify(state.currentPage.layout)));
        state.future = [];
        
        const findAndAdd = (items) => {
          for (let item of items) {
            if (item.id === parentId) {
              if (!item.children) item.children = [];
              item.children.push(component);
              return true;
            }
            if (item.children && findAndAdd(item.children)) return true;
          }
          return false;
        };

        if (parentId) {
          findAndAdd(state.currentPage.layout);
        } else {
          state.currentPage.layout.push(component);
        }
      }
    },
    updateComponent: (state, action) => {
      const { id, updates } = action.payload;
      if (state.currentPage) {
        state.history.push(JSON.parse(JSON.stringify(state.currentPage.layout)));
        state.future = [];
        
        const findAndUpdate = (items) => {
          for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
              items[i] = { ...items[i], ...updates };
              return true;
            }
            if (items[i].children && findAndUpdate(items[i].children)) return true;
          }
          return false;
        };
        findAndUpdate(state.currentPage.layout);
      }
    },
    removeComponent: (state, action) => {
      const id = action.payload;
      if (state.currentPage) {
        state.history.push(JSON.parse(JSON.stringify(state.currentPage.layout)));
        state.future = [];
        
        const findAndRemove = (items) => {
          const index = items.findIndex(item => item.id === id);
          if (index !== -1) {
            items.splice(index, 1);
            return true;
          }
          for (let item of items) {
            if (item.children && findAndRemove(item.children)) return true;
          }
          return false;
        };
        
        findAndRemove(state.currentPage.layout);
        if (state.selectedComponentId === id) state.selectedComponentId = null;
      }
    },
    deleteComponentProp: (state, action) => {
      const { id, propKey } = action.payload;
      if (state.currentPage) {
        state.history.push(JSON.parse(JSON.stringify(state.currentPage.layout)));
        state.future = [];
        
        const findAndModify = (items) => {
          for (let item of items) {
            if (item.id === id) {
              const newProps = { ...item.props };
              delete newProps[propKey];
              item.props = newProps;
              return true;
            }
            if (item.children && findAndModify(item.children)) return true;
          }
          return false;
        };
        findAndModify(state.currentPage.layout);
      }
    },
    reorderComponents: (state, action) => {
      // Re-ordering logic for hierarchical lists is complex, skipping for now
      // or keeping it for the root level.
    },
    undo: (state) => {
      if (state.history.length > 0 && state.currentPage) {
        state.future.push(JSON.parse(JSON.stringify(state.currentPage.layout)));
        state.currentPage.layout = state.history.pop();
      }
    },
    redo: (state) => {
      if (state.future.length > 0 && state.currentPage) {
        state.history.push(JSON.parse(JSON.stringify(state.currentPage.layout)));
        state.currentPage.layout = state.future.pop();
      }
    },
    selectComponent: (state, action) => {
      state.selectedComponentId = action.payload;
    },
    addPageToList: (state, action) => {
      state.pages.push(action.payload);
      state.currentPage = action.payload;
      state.history = [];
      state.future = [];
      state.selectedComponentId = null;
    },
    setPageLayout: (state, action) => {
      if (state.currentPage) {
        state.history.push(
          JSON.parse(JSON.stringify(state.currentPage.layout)),
        );
        state.currentPage.layout = action.payload;
        state.future = [];
      }
    },
    setIsPreview: (state, action) => {
      state.isPreview = action.payload;
    },
    toggleLeftPanel: (state) => {
      state.leftPanelCollapsed = !state.leftPanelCollapsed;
    },
    toggleRightPanel: (state) => {
      state.rightPanelCollapsed = !state.rightPanelCollapsed;
    },
    removePageFromList: (state, action) => {
      state.pages = state.pages.filter((p) => p._id !== action.payload);
      if (state.currentPage?._id === action.payload) {
        state.currentPage = state.pages.find((p) => p.isHome) || state.pages[0] || null;
      }
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
  deleteComponentProp,
  reorderComponents,
  addPageToList,
  setPageLayout,
  setIsPreview,
  toggleLeftPanel,
  toggleRightPanel,
  removePageFromList,
} = builderSlice.actions;

export default builderSlice.reducer;
