import type { ITodo } from '../../../common/interfaces';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';
export const TOGGLE_GOAL = 'TOGGLE_GOAL';

export function addTodoAction(todo: ITodo) {
  return {
    type: ADD_TODO,
    todo,
  };
}

export function removeTodoAction(id: number) {
  return {
    type: REMOVE_TODO,
    id,
  };
}

export function toggleTodoAction(id: number) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}

export function addGoalAction(goal: ITodo) {
  return {
    type: ADD_GOAL,
    goal,
  };
}

export function removeGoalAction(id: number) {
  return {
    type: REMOVE_GOAL,
    id,
  };
}
