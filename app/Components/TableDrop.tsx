//@ts-ignore
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
//@ts-ignore
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

// a little function to help us with reordering the result
//@ts-ignore
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
//@ts-ignore
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  //@ts-ignore
  result[droppableSource.droppableId] = sourceClone;
  //@ts-ignore
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;//@ts-ignore
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
//@ts-ignore
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

const App = () => {
  const [items, setItems] = useState(getItems(10));
  const [selected, setSelected] = useState(getItems(5, 10));
//@ts-ignore
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const reorderedItems = reorder(
        source.droppableId === "droppable" ? items : selected,
        source.index,
        destination.index
      );

      if (source.droppableId === "droppable") {
        //@ts-ignore
        setItems(reorderedItems);
      } else {
        //@ts-ignore
        setSelected(reorderedItems);
      }
    } else {
      const result = move(
        source.droppableId === "droppable" ? items : selected,
        source.droppableId === "droppable" ? selected : items,
        source,
        destination
      );
//@ts-ignore
      setItems(result.droppable);
      //@ts-ignore
      setSelected(result.droppable2);
    }
  };

  return ( 
    //@ts-ignore
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
     
        {(provided: { innerRef: React.LegacyRef<HTMLDivElement> | undefined; placeholder: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, snapshot: { isDraggingOver: any; }) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided:any, snapshot:any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="droppable2">
      {(provided:any, snapshot:any) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {selected.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                 {(provided:any, snapshot:any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

// Put the things into the DOM!
ReactDOM.render(<App />, document.getElementById("root"));
