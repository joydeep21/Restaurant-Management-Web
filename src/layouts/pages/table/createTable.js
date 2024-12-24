/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState,useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    TextField,
    Card,
    CardContent,
    Button
} from '@mui/material';

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import Globe from "examples/Globe";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";
import breakpoints from "assets/theme/base/breakpoints";

// Data
import salesTableData from "layouts/dashboards/default/data/salesTableData";
import reportsBarChartData from "layouts/dashboards/default/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboards/default/data/gradientLineChartData";
import { addTableApi ,getbookedTable} from "assets/globalApi";

const styles = {
    tableBooking: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
    },
    table: {
        border: "2px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "#f8f8f8",
        textAlign: "center",
    },
    tableTitle: {
        marginBottom: "10px",
        fontWeight: "bold",
        fontSize: "16px",
    },
    seats: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    row: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "5px",
    },
    seat: {
        width: "50px",
        height: "50px",
        borderRadius: "4px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: "12px",
        textAlign: "center",
        margin: "0 2px",
    },
};
function createTable() {
    const { values } = breakpoints;
    const { size } = typography;
    const { chart, items } = reportsBarChartData;
    const tablesDemo = [
      { tableId: 1, capacity: 2 },
      { tableId: 2, capacity: 2 },
      { tableId: 3, capacity: 2 },
      { tableId: 4, capacity: 3 },
      { tableId: 5, capacity: 4 },
      { tableId: 6, capacity: 4 },
      { tableId: 7, capacity: 4 },
      { tableId: 8, capacity: 5 },
      { tableId: 9, capacity: 6 },
      { tableId: 10, capacity: 8 },
      { tableId: 11, capacity: 10 },
    ];


    const initialBookings = {
        1: [0,2], // Table 1, seat 1 booked
        4: [0, 1], // Table 4, seats 1 and 2 booked
        7: [0,2,3], // Table 7, seat 4 booked
        11: [5, 6, 7, 8, 9], // Table 11, last 5 seats booked
    };
    const [tables, setTables] = useState(tablesDemo);
    const [bookedSeats, setBookedSeats] = useState(initialBookings);
    const [addTable, setAddTable] = useState(false);
    const [tableId, setTableId] = useState('');
    const [capacity, setCapacity] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    console.log("tableData", addTable);

    const handleAddTable = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        // Prepare the table data to send to the API
        const tableData = {
          tableId: tableId.trim(),
          capacity: Number(capacity),
        };
        try {
            // Make API request to add the table
            console.log("the response ",tableData);
            const response = await addTableApi(tableData)
            console.log("the response ",response);
            
      
            if (response.status === 201) {
              // Show success message
            alert('Table added successfully!');
              setTableId('');
              setCapacity('');
              setAddTable(false)
            } else {
              // Handle unsuccessful API response
              setErrorMessage('Failed to add table. Please try again.');
            }
          } catch (error) {
            // Handle any error during the request
            setErrorMessage('An error occurred while adding the table.');
          }
      
          setLoading(false);
        };

    // const toggleSeatBooking = (tableId, seatIndex) => {
    //     setBookedSeats((prev) => {
    //         const newBookings = { ...prev };
    //         if (newBookings[tableId]) {
    //             if (newBookings[tableId].includes(seatIndex)) {
    //                 newBookings[tableId] = newBookings[tableId].filter(
    //                     (index) => index !== seatIndex
    //                 );
    //                 if (newBookings[tableId].length === 0) {
    //                     delete newBookings[tableId];
    //                 }
    //             } else {
    //                 newBookings[tableId] = [...(newBookings[tableId] || []), seatIndex];
    //             }
    //         } else {
    //             newBookings[tableId] = [seatIndex];
    //         }
    //         return newBookings;
    //     });
    // };

    const isSeatBooked = (tableId, seatIndex) =>
        bookedSeats[tableId] && bookedSeats[tableId].includes(seatIndex);

    const getSeatName = (tableId, seatIndex) => {
      // Calculate seat letter based on the seat index
      const seatLetter = String.fromCharCode(97 + seatIndex); // 97 is the ASCII code for 'a'
      
      // Combine tableId and seatLetter to form the seat name
      return `${tableId}${seatLetter}`;
  };

    const renderSeats = (tableId, seats) => {
        // Calculate rows and columns based on the number of seats

        let rows=2;
    let cols;
    if(seats%2 ==0)
    {
      cols=seats/2;
    }
    else{
      cols=seats/2 +1;
    }
        const seatElements = [];
        for (let row = 0; row < rows; row++) {
            seatElements.push(
                <div key={row} style={styles.row}>
                    {Array.from({ length: cols }).map((_, colIndex) => {
                        const seatIndex = row * cols + colIndex;
                        if (seatIndex >= seats) return null; // Avoid rendering extra seats
                        return (
                            <div
                                key={seatIndex}
                                style={{
                                    ...styles.seat,
                                    backgroundColor: isSeatBooked(tableId, seatIndex)
                                        ? "red"
                                        : "green",
                                }}
                                // onClick={() => toggleSeatBooking(tableId, seatIndex)}
                                title={getSeatName(tableId, seatIndex)}
                            >
                                {getSeatName(tableId, seatIndex)}
                            </div>
                        );
                    })}
                </div>
            );
        }

        return seatElements;
    };
    const fetchTable = async (e) => {
      try {
          const response = await getbookedTable()
          console.log("the response from fetchTable ",response);
          if (response.status === 200) {
            setTables(response.data.allTable);
            setBookedSeats(response.data.initialBookings)
          } 
        } catch (error) {
          // Handle any error during the req
          console.log("the response ",error);
        }
      };
      useEffect(() => {
        // Define an async function to fetch data
        // Call the async function
      console.log("useEffected called first time ");

        fetchTable();
    }, []); 
    useEffect(() => {
      // Define an async function to fetch data
      // Call the async function
      console.log("useEffected called second time ");
      
      fetchTable();
  }, [addTable]); 


    return (
        <DashboardLayout>
          <DashboardNavbar />
          <SoftBox py={3}>
            <Grid container spacing={2}>
              {/* Top section with Add table button and filters */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                  <Button variant="contained" color="info" onClick={() => setAddTable(true)}>
                    Add table
                  </Button>
      
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="contained" onClick={() => handleFilterClick('month')}>
                      Month
                    </Button>
                    <Button variant="contained" onClick={() => handleFilterClick('weekly')}>
                      Weekly
                    </Button>
                    <Button variant="contained" onClick={() => handleFilterClick('today')}>
                      Today
                    </Button>
                  </Box>
                </Box>
              </Grid>
      
              {/* Render the Add Table form */}
              {addTable && (
                <Grid item xs={12}>
                  <Box
                    component="form"
                    onSubmit={handleAddTable}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      p: 2,
                      backgroundColor: '#f0f0f0',
                      borderRadius: 2,
                      position: 'relative',
                    }}
                  >
                    {/* Header aligned to the top-left */}
                    <Typography variant="h5" component="h1" align="left" sx={{ mb: 2 }}>
                      Add Table
                    </Typography>
      
                    {/* Input fields and button in one line */}
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <TextField
                        label="Table ID"
                        variant="outlined"
                        value={tableId}
                        onChange={(e) => setTableId(e.target.value)}
                        required
                        sx={{ flex: 1 }}
                      />
      
                      <TextField
                        label="Capacity"
                        type="number"
                        variant="outlined"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        required
                        sx={{ flex: 1 }}
                      />
      
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{
                          minWidth: '150px',
                        }}
                      >
                        {loading ? 'Adding Table...' : 'Add Table'}
                      </Button>
                    </Box>
      
                    {/* Success or Error Message */}
                    {successMessage && <Typography color="green">{successMessage}</Typography>}
                    {errorMessage && <Typography color="red">{errorMessage}</Typography>}
                  </Box>
                </Grid>
              )}
      
              {/* Table view section - always below the form */}
              <Grid item xs={12}>
                <Box sx={styles.tableBooking}>
                  {tables.map((table) => (
                    <Box key={table.tableId} sx={styles.table}>
                      <Typography sx={styles.tableTitle}>Table {table.tableId}</Typography>
                      <Box sx={styles.seats}>{renderSeats(table.tableId, table.capacity)}</Box>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </SoftBox>
          <Footer />
        </DashboardLayout>
      );
      
      
      
}

export default createTable;
