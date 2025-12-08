import React from 'react'
import { Button, Spinner } from "flowbite-react";


export function Spinner() {
  return (
    <div className="flex flex-row gap-3">
      <Button>
        <Spinner aria-label="Spinner button example" size="sm" light />
        <span className="pl-3">Loading...</span>
      </Button>
      
    </div>
  );
}

export default Spinner