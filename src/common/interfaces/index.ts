import {Todo} from "../../features/todos/types";

export interface IItems {
    items: Todo[]
}

export interface ITodo {
    id: number,
    name: string,
    complete: boolean
}


export interface ITodoAction {
    id?: number;
    type: string;
    todo: ITodo
}
