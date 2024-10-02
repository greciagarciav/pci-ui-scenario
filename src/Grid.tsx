import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Header from "./components/header";
import { useMemo } from "react";
import Button from "./components/button";
import { formatDiscoveryDate, formatPotentiallyHazardous } from "./lib/utils";
import { AsteroidObject } from "./lib/definitions";
import { useGridActions } from "./lib/actions";

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", checkboxSelection:true, headerCheckboxSelection: true },
  { field: "discovery_date", headerName: "Discovery Date", valueFormatter: formatDiscoveryDate },
  { field: "h_mag", headerName: "H (mag)" },
  { field: "moid_au", headerName: "MOID (au)" },
  { field: "q_au_1", headerName: "q (au)" },
  { field: "q_au_2", headerName: "Q (au)" },
  { field: "period_yr", headerName: "Period (yr)" },
  { field: "i_deg", headerName: "Inclination (deg)" },
  { field: "pha", headerName: "Potentially Hazardous", valueFormatter: formatPotentiallyHazardous },
  { field: "orbit_class", headerName: "Orbit Class" },
];

const NeoGrid = (): JSX.Element => {
  const { gridRef, clearFilters } = useGridActions();

  const defaultColDef = useMemo( ()=> {
    return {
      filter: true,
      sortable: true
    }
  }, [])

  const copySelectedCellsToClipboard = () => {
    if (gridRef.current) {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      const columnKeys = gridRef.current.columnApi.getColumns()?.map(col => col.getColId());
      
      let clipboardText = '';

      if (selectedData.length > 0 && columnKeys) {
        clipboardText = selectedData
          .map(row => columnKeys.map(key => row[key] ?? '').join('\t'))
          .join('\n');

        navigator.clipboard.writeText(clipboardText)
          .then(() => console.log("Copied to clipboard"))
          .catch(err => console.error("Failed to copy:", err));
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'c') {
      copySelectedCellsToClipboard();
    }
  };

  const rowSelectionType="multiple"

  return (
    <div className="ag-theme-alpine" 
      style={{ height: 900, width: 1920 }}
      tabIndex={0} 
      onKeyDown={handleKeyDown}
      >
        
      <div style={{marginBottom:"20px", marginTop: "8px", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Header />
        <Button onClick={clearFilters} />
      </div>

      <AgGridReact        
        ref={gridRef}
        rowData={data as AsteroidObject[]}
        columnDefs={columnDefs}
        rowSelection={rowSelectionType}
        rowMultiSelectWithClick={true}  
        defaultColDef={defaultColDef}
        rowGroupPanelShow={'always'}
        enableRangeSelection={true}
        suppressRowClickSelection={true}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default NeoGrid;
