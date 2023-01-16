// Import the necessary libraries
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';

// Define the initial state of the app
const initialState = {
  books: []
};

// Define a reducer to handle actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.book] };
    case 'REMOVE_BOOK':
      return { ...state, books: state.books.filter(book => book.id !== action.id) };
    default:
      return state;
  }
};

// Create the store with the reducer and apply the thunk middleware
const store = createStore(reducer, applyMiddleware(thunk));

// Define a component to display the list of books
const BookList = ({ books }) => (
  <ul>
    {books.map(book => (
      <li key={book.id}>{book.title}</li>
    ))}
  </ul>
);

// Map the state to the props of the component
const mapStateToProps = state => ({
  books: state.books
});

// Connect the component to the store
const ConnectedBookList = connect(mapStateToProps)(BookList);

// Define the App component
const App = () => (
  <Provider store={store}>
    <ConnectedBookList />
  </Provider>
);

// Render the App component
render(<App />, document.getElementById('root'));
