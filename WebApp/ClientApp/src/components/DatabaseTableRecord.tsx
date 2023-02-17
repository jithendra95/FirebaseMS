import React from "react";

export interface DatabaseRecordProps {
    recordId: string
}

export const DatabaseTableRecord: React.FunctionComponent<DatabaseRecordProps> = ({recordId}) => {
  return(<div>{recordId}</div>)
}