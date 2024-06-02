'use client'
import React, {useState} from 'react';
import classes   from "./TestDragAndDrop.module.scss";
interface IEntity{
    id: number,
    text: string,
}
const TestDragAndDrop = () => {
    const [entityArray, setentityArray] = useState<IEntity[]>([{id: 1, text:'text1'},{id: 2, text:'text2'},{id: 3, text:'text3'}]);
    const [currentDraggableItem, setCurrentDraggableItem] = useState<IEntity|null>(null);
    const [dropEntityArray, setDropEntityArray] = useState<IEntity[]>([]);
    const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }
    const dragStartHandler = (event: React.DragEvent<HTMLDivElement>, id: number) => {
        setCurrentDraggableItem(entityArray.find(item => item.id === id)!);
    }
    const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }
    const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log(currentDraggableItem)
        setDropEntityArray(prevState => {
            const newArray = prevState;
            if(currentDraggableItem) newArray.push(currentDraggableItem);
            return newArray;
        })
        setCurrentDraggableItem(null);
    }
    return (
        <div>
            <div className={classes.container}>
                {entityArray.map(item => <div draggable={true}
                                              className={classes.item}
                                              key={item.id}
                                              onDragEnd={dragEndHandler}
                                              onDragOver={dragOverHandler}
                                              onDragStart={(event) => dragStartHandler(event, item.id)}
                                              onDrop={dropHandler}
                >{item.text}</div>)}
            </div>
            <div className={classes.dropArea} onDrop={dropHandler} onDragOver={dragOverHandler}>
                {dropEntityArray.map(item => <div className={classes.item} key={item.id}>{item.text}</div>)}
            </div>
        </div>
    );
};

export default TestDragAndDrop;