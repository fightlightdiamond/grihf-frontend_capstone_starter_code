import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions';
import type { ITodo, ITodoAction } from '../../../common/interfaces';

export type TTodoState = ITodo[];

export function todos(state: TTodoState = [], action: ITodoAction): TTodoState {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);

    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);

    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id ? todo : { ...todo, complete: !todo.complete },
      );

    default:
      return state;
  }
}
