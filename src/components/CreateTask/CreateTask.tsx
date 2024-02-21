import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

type CreateTaskProps = {
    lanes: any[],
    saveNewTask: (taskName: string, taskDescription: string, laneId:number)=>void
}

const CreateTask = ({lanes ,saveNewTask}:CreateTaskProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLaneOption, setSelectedLaneOption] = useState(lanes[0]);
  const [statusDropdownIsOpen, setStatusDropdownIsOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDesription] = useState('');

  const toggleDropdown = () => {
    setStatusDropdownIsOpen(!statusDropdownIsOpen);
  };

  function onSelectLaneOption(lane:any){
    toggleDropdown()
    setSelectedLaneOption(lane)
  }

  function onCreateTask(){
    var newTask = {
        "title": newTaskName,
        "body":newTaskDescription,
        "laneId":selectedLaneOption.id
    }

    console.log("New Task: ", newTask)
    setShowModal(false)
    saveNewTask(newTaskName, newTaskDescription, selectedLaneOption.id)
  }

  const handleNameInputChange = (event) => {
    setNewTaskName(event.target.value);
  };

  const handleDescriptionInputChange = (event) => {
    setNewTaskDesription(event.target.value);
  };

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150
        absolute right-4"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create Task
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    New Task
                  </h3>
                  

                  <button  onClick={() => setShowModal(false)} type="button" className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#autoheight-textarea-modal-example">
          <span className="sr-only">Close</span>
          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

                </div>
                {/*body*/}
                
                <div className="relative p-6 flex-auto">
                <form>
                    <label>
                        Name:
                        <input className="w-full py-2 px-4 text-left border border-gray-300 rounded-md" 
                        type="text"
                        value={newTaskName} // Bind the input value to the state
                        onChange={handleNameInputChange} // Call handleInputChange when input changes
                        />
                    </label>
                    <label>
                        Description:
                        <input className="w-full py-2 px-4 text-left border border-gray-300 rounded-md" 
                        type="text"
                        value={newTaskDescription} // Bind the input value to the state
                        onChange={handleDescriptionInputChange} // Call handleInputChange when input changes
                        />
                    </label>
                </form>
                    
                <div className="mt-2">
                    <p className="mb-2">Status:</p>
                    <div className="relative">
                    <button
                        className="w-full py-2 px-4 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        onClick={() => toggleDropdown()}
                    >
                        {selectedLaneOption? selectedLaneOption.title : lanes[0].title}
                    </button>
                    {statusDropdownIsOpen? (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 overflow-hidden">
                        {lanes.map((lane) => (
                        <li
                            key={lane.id}
                            className="hover:bg-gray-100 py-2 px-4 cursor-pointer"
                            onClick={()=> onSelectLaneOption(lane)}
                        >
                            {lane.title}
                        </li>
                        ))}
                        </ul>
                    ):null}
                    </div>
                    </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="  bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onCreateTask()}
                  >
                    Save Task
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default CreateTask;