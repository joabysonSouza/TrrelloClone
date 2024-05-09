"use client";
import React, { useState } from "react";
import Header from "./Components/Header";
import Board from "./Components/Board";
import List from "./Components/List";
import { loadLists } from "./Service/api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragDropContext } from "@hello-pangea/dnd";

export default function Home() {
  const liste = loadLists;
  const listetest = loadLists.map(listTeste => listTeste.cards)

  const [listCard, setListCard] = useState(liste);

  const onDragEnd = (result: any) => {
    // if (!result.destination) return;
    // const { source, destination } = result;
    // const newListCard = [...liste];
    // const [removed] = newListCard.splice(source.index, 1);
    // newListCard.splice(destination.index, 0, removed);
    // setListCard(newListCard);
    console.log(listetest);
  };

  return (
    <>
      <Header />
      <button onClick={onDragEnd}>chamar</button>
      <div className="w-full flex mx-9 flex-col sm:flex-row overflow-x-hidden sm:mx-2 ">
        {listCard.map((list, i) => (
          <DragDropContext onDragEnd={onDragEnd} key={i}>
            <List data={list} key={i} />
          </DragDropContext>
        ))}
      </div>
    </>
  );
}
