import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Header from "./components/header";
import { useMemo } from "react";

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation" },
  { field: "discovery_date", headerName: "Discovery Date",
    valueFormatter: (params) => {
      const date = new Date(params.value);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formattedDate;
    }
   },
  { field: "h_mag", headerName: "H (mag)" },
  { field: "moid_au", headerName: "MOID (au)" },
  { field: "q_au_1", headerName: "q (au)" },
  { field: "q_au_2", headerName: "Q (au)" },
  { field: "period_yr", headerName: "Period (yr)" },
  { field: "i_deg", headerName: "Inclination (deg)" },
  { field: "pha", headerName: "Potentially Hazardous" },
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, },
];

const NeoGrid = (): JSX.Element => {
  const defaultColDef = useMemo( ()=> {
    return {
      filter: true,
      sortable: true
    }
  }, [])

  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <Header />
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowGroupPanelShow={'always'}
      />
    </div>
  );
};

export default NeoGrid;
