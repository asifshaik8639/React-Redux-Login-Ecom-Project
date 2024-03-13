import React  from 'react';

const ContextWrapper =  React.createContext();;
function Context() {
  return (
    <div>
        <ContextWrapper.Provider value="Hello I am here">
            <GrandParent></GrandParent>
        </ContextWrapper.Provider>
    </div>
  )
}

function GrandParent() {
    return (
        <div>
            <h1>GrandParent</h1>
            <Parent></Parent>
        </div>
    );
}

function Parent() {
    return (
        <div>
            <h1>Parent</h1>
            <Children></Children>
        </div>
    );
}

function Children() {
    const message = React.useContext(ContextWrapper);;
    return (
        <div className='context-cls'>
            <h1>{message}</h1>
        </div>
    );
}

export default Context;