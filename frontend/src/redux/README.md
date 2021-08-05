# Redux
<div align=center><img src="https://miro.medium.com/max/1300/1*z4llp0o7378Wwz4zoRsalw.gif" ></div>

This folder contains 2 sub folders - chat and auth, which deal with chat and auth respectively. Either of those has 3 files - ActionTypes, Actions and Reducer. 

- ActionTypes: simply exports action names to avoid spelling errors - a convention
- Actions: actually do the thing - perform axios requests or modify local storage but don't affect the state
- Reducers: update the state based on the actionType returned by the action that was dispatched

This folder contains 3 other files: index, rootReducer and store.
- Index: a central place from which you can import all actions - this file is used when you import the redux folder
- rootReducer: combines all reducers - used in the store
- store: one central source of truth - stores the application's state. In this file the rootReducer and the different middleware are added
