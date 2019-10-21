## Utilities

Any reusable logic or function in the app such as custom hooks or analytics is defined here.

Global and shared state is handled through [React's Context API](https://reactjs.org/docs/context.html). The value passed through context is the global state, as well as a dispatch function. This pattern is provided by the `useReducer` hook, and uses _actions_ to mutate state.

The dispatch reducer function is called with an action and whatever data is required for the operation to work. Based on the type of the action (defined in an `ActionType` enum), it will return a new updated state with whatever operation completed.

The reducer is also a _pure_ function, which means that it will return the same output given the same input and never produces any side effects, making it easier for testing. This is why the dispatch will spread the old state into a new object and modify any properties that the action wants to modify.

> Note also that nested object fields in the state will not be merged into any new fields you provide, so you will also need to spread the nested object into your new field if you modidify a nested object.
