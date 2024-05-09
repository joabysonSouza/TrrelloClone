"use client";
import React, { useRef } from "react";
import Image from "next/image";
import avatar from "../../public/avatar.jpg";
import { MdAdd } from "react-icons/md";
import { useDrag } from "react-dnd";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { LuFunctionSquare } from "react-icons/lu";
import {cards} from "../Service/api"

//@ts-ignore
export default function Card({ data }) {

  const testea = cards.map(newCard => newCard)
  
  
  return (     
   
      
    
    <Draggable key={data} draggableId={`${data.id}`} index={data.id}>  
    {(provider)=> (
      <section className="w-80 bg-white drop-shadow-2xl mb-5 rounded-xl "
      {...provider.draggableProps}
      {...provider.dragHandleProps}
      ref={provider.innerRef}
      style={{...provider.draggableProps.style}}>
      <header>
        {data.labels.map((label: any) => (
          <div
            className="w-4 h-4"
            style={{ backgroundColor: `${label}` }}
            key={label}
          ></div>
        ))}
      </header>
      <p>{data.content}</p>
      <button className="bg-red-600">chamar</button>
      <Image src={avatar} alt="avatar" width={50} height={50} />
    </section>
    )}  
     </Draggable>
    

     
    
    
   
  
  );
}
