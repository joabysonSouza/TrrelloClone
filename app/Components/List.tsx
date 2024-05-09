import React from "react";
import { MdAdd } from "react-icons/md";
import Card from "./Card";
import Board from "./Board";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

interface CardType {
  id: number;
}

export default function List({ data }: { data: any }) {

  

  return (
    <div className="w-full flex flex-col " key={data.id}>
      <Board task={data.title} handleButton={data.creatable} />

      <ul className="w-80">
        {data.cards.map((card: CardType, index: number) => (
          <Droppable droppableId={`${card.id}`}>
            {(provider) => (
              <div ref={provider.innerRef}>
                <Card data={card} />
                {provider.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </ul>
    </div>
  );
}
