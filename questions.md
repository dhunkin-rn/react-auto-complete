## Questions

#### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

The difference is how they react to the props and state changes. Component will always do rerender, however
PureComponent will rerender only when props or state is different from the previous values. PureComponents are
good for the performance reasons, but they can give false results for the nested props or state objects, as they
do not deep comparison to decide on render.

#### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

`ShouldComponentUpdate` could break the context functionality, as if the component decides not to rerender, and
some other child component uses the context it can miss the context updates.

#### 3. Describe 3 ways to pass information from a component to its PARENT.

a) callback function: pass it to the child and call it with needed data
b) context api: creat some context in the parent, then useContext in child
c) redux store: `useSelector` and `useDispatch`, dispatch action from the child and select data in parent
or any other redux-like library.

#### 4. Give 2 ways to prevent components from re-rendering.

a) `useMemo` hook with equality function which always returns true
b) `shouldComponentUpdate` always return false for the class component

#### 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragment is the react component which was created to avoid introducing redundant tags to combine
multiple siblings when returned as a component output. Fragment can be tricky when used without key property
for collection rendering, and when this collection is manipulated.

#### 6. Give 3 examples of the HOC pattern.

a) `React.memo` HOC which does memoization of the component to prevent redundant rerenders.
b) `connect` from Redux library, which connects the component passed to the store.
c) Any custom withLogger HOC which wraps the component and logs the props changes if needed.

#### 7. What's the difference in handling exceptions in promises, callbacks and async...await.

Promises use catch method to handle exceptions, also second callback to then could be used for this purpose.
Callbacks uses error-first approach to pass an error or null if successful.
Async/Await should be used within try/catch blocks to catch and handle the exceptions.

#### 8. How many arguments does setState take and why is it async.

`setState` takes the state to set and the callback, which is executed when the state will be mutated.
This is done for performance reasons, as the state change causes rerender and it can be pretty heavy and
react can even batch such rerenders.

#### 9. List the steps needed to migrate a Class to Function Component.

a) convert class declaration into function declaration
b) use state hooks for all the state initialized in the constructor
c) move `componentDidMount` and `componentDidUpdate` logic into `useEffect` hook
d) move `componentWillUnmount` into the function returned from `useEffect` hook
e) move all custom methods into regular functions
f) move the content of the render method as a return function content

#### 10. List a few ways styles can be used with components.

a) styles can be just imported as a regular css file
b) it is convinient to use react styled-components for styling or some other styling libraries
c) styles can be inlined with the jsx tags in style property

#### 11. How to render an HTML string coming from the server.

a) html string can be rendered with dangerouslySetInnerHTML property, but don't forget to clear it
for any XSS payloads (which is hard)
b) thirdparty html-react-parser library
