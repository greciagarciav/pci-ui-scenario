import { useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";

export const useGridActions = () => {

  const gridRef = useRef<AgGridReact>(null);

  const clearFilters = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.setFilterModel(null);
      gridRef.current.columnApi.applyColumnState({
        defaultState: {
          sort: null,
        },
      });
    }
  }, []);

  return { gridRef, clearFilters };
};