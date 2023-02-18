import React from "react";

export interface DatabaseRecordProps {
    recordId: string
}

export const TreeNavigatorNode: React.FunctionComponent<DatabaseRecordProps> = ({recordId}) => {
  return(<div className='pl-10 cursor-pointer'>{recordId}</div>)
}