import React from 'react'
import List from './List'
import { MdAdd } from 'react-icons/md'

interface BoardProps{
  task: string[]
  handleButton: any
}

export default function Board({task, handleButton}:BoardProps) {
  return (
    <>   
  <header className="w-80 h-10 flex items-center p-8">
    <h2 className='font-bold'>{task}</h2>
    {handleButton && (
       <button type="button" className='bg-blue-600 p-1 rounded-full ml-3'><MdAdd size={24} color="black"/></button> 
    )}
   
 </header>



 
 </>
  )
}
