// import {ADD_GOAL, ADD_TODO, REMOVE_GOAL} from "./actions";
// import {goals, todos} from "./reducers";
//
//
// export function createStore(reducer: Function) {
//     // The store should have four parts
//     // 1. The state
//     // 2. Get the state
//     // 3. Listen to changes on the state.
//     // 4. Update the state
//     let state: any = {
//         todos: [],
//         goals: [],
//     }
//     let listeners: Function[] = [];
//
//     const getState = () => state;
//
//     const subscribe = (listener: Function) => {
//         listeners.push(listener)
//         return () => {
//             listeners = listeners.filter((l) => l !== listener)
//         }
//     }
//
//     const dispatch = (action: any) => {
//         state = reducer(state, action)
//         listeners.forEach((listener) => listener())
//     }
//
//     return {
//         getState,
//         subscribe,
//         dispatch
//     }
// }
//
// function app(state: any, action: any) {
//     return {
//         todos: todos(state.todos, action),
//         goals: goals(state.goals, action),
//     }
// }
//
// export const store = createStore(app);
//
// store.subscribe(() => {
//     console.log('The new state is:', store.getState())
// })
// const unsubscribe = store.subscribe(() => {
//     console.log('The store change.')
// })
// unsubscribe();
//
// function checker(store: any) {
//     return function (next: any) {
//         return function (action : any) {
//             return next(action);
//         }
//     }
// }

export * from './store'
