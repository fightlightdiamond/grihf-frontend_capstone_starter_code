import React from "react";
import {IItems} from "../interfaces";
import {Badge, ListGroup} from "flowbite-react";

interface IItemsPros extends IItems {
    ondDelTodo: (todoId: string) => void;
}

const TodoList: React.FC<IItemsPros> = (props) => {
    const {items, ondDelTodo} = props;

    return <ListGroup>
        {items.map((todo) => <ListGroup.Item key={todo.id} id={todo.id.toString()}>
            <div className='flex justify-between w-[100%]'>
                {todo.title} <Badge onClick={() => ondDelTodo(todo.id)} color='failure'>Del</Badge>
            </div>
        </ListGroup.Item>)}
    </ListGroup>
}

export default TodoList