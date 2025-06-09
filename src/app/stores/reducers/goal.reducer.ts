import {ADD_GOAL, REMOVE_GOAL, TOGGLE_GOAL} from "../actions";

export interface IGoal {
    id: number,
    name: string,
    complete: boolean
}

export interface IGoalAction {
    id?: number;
    type: string;
    goal: IGoal
}

export type TGoalState = IGoal[]

export function goals(state: TGoalState = [], action: IGoalAction): TGoalState {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal]);

        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id);

        case TOGGLE_GOAL:
            return state.map((goal) =>
                goal.id !== action.id
                    ? goal
                    : { ...goal, complete: !goal.complete }
            );

        default:
            return state;
    }
}