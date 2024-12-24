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
import React, { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

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
function Default() {
  const { values } = breakpoints;
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const tables = [
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
    1: [0], // Table 1, seat 1 booked
    4: [0, 1], // Table 4, seats 1 and 2 booked
    7: [3], // Table 7, seat 4 booked
    11: [5, 6, 7, 8, 9], // Table 11, last 5 seats booked
  };

  const [bookedSeats, setBookedSeats] = useState(initialBookings);

  const toggleSeatBooking = (tableId, seatIndex) => {
    setBookedSeats((prev) => {
      const newBookings = { ...prev };
      if (newBookings[tableId]) {
        if (newBookings[tableId].includes(seatIndex)) {
          newBookings[tableId] = newBookings[tableId].filter(
            (index) => index !== seatIndex
          );
          if (newBookings[tableId].length === 0) {
            delete newBookings[tableId];
          }
        } else {
          newBookings[tableId] = [...(newBookings[tableId] || []), seatIndex];
        }
      } else {
        newBookings[tableId] = [seatIndex];
      }
      return newBookings;
    });
  };

  const isSeatBooked = (tableId, seatIndex) =>
    bookedSeats[tableId] && bookedSeats[tableId].includes(seatIndex);
  const getSeatName = (tableId, seatIndex) => {
    // Calculate seat letter based on the seat index
    const seatLetter = String.fromCharCode(97 + seatIndex); // 97 is the ASCII code for 'a'
    
    // Combine tableId and seatLetter to form the seat name
    return `${tableId}${seatLetter}`;
};
  // const getSeatName = (tableId, seatIndex) => {
  //   const seatNumber = seatIndex + 1; // Seat numbers start from 1
  //   const row = Math.floor(seatIndex / 10) + 1;
  //   const column = String.fromCharCode(97 + (seatIndex % 10));
  //   return `${tableId}${column} (${seatNumber})`;
  // };

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
    // if (seats === 2 || seats === 4) {
    //   rows = 2;
    //   cols = seats / 2;
    // } else if (seats === 6) {
    //   rows = 2;
    //   cols = 3;
    // } else if (seats === 8) {
    //   rows = 2;
    //   cols = 4;
    // } else if (seats === 10) {
    //   rows = 2;
    //   cols = 5;
    // } else {
    //   rows = 1;
    //   cols = seats;
    // }

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
                onClick={() => toggleSeatBooking(tableId, seatIndex)}
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container>
          {/* <Grid item xs={12} lg={7}>
            <SoftBox mb={3} p={1}>
              <SoftTypography
                variant={window.innerWidth < values.sm ? "h3" : "h2"}
                textTransform="capitalize"
                fontWeight="bold"
              >
                general statistics
              </SoftTypography>
            </SoftBox>

            <Grid container>
              <Grid item xs={12}>
                <Globe
                  display={{ xs: "none", md: "block" }}
                  position="absolute"
                  top="10%"
                  right={0}
                  mt={{ xs: -12, lg: 1 }}
                  mr={{ xs: 0, lg: 10 }}
                  canvasStyle={{ marginTop: "3rem" }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={5}>
                <SoftBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "today's money", fontWeight: "bold" }}
                    count="$53,000"
                    percentage={{ color: "success", text: "+55%" }}
                    icon={{ color: "info", component: "paid" }}
                  />
                </SoftBox>
                <MiniStatisticsCard
                  title={{ text: "today's users", fontWeight: "bold" }}
                  count="2,300"
                  percentage={{ color: "success", text: "+3%" }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <SoftBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "new clients", fontWeight: "bold" }}
                    count="+3,462"
                    percentage={{ color: "error", text: "-2%" }}
                    icon={{ color: "info", component: "emoji_events" }}
                  />
                </SoftBox>
                <SoftBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "sales", fontWeight: "bold" }}
                    count="$103,430"
                    percentage={{ color: "success", text: "+5%" }}
                    icon={{
                      color: "info",
                      component: "shopping_cart",
                    }}
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </Grid> */}
          {/* <Grid item xs={12} md={10} lg={7}>
            <Grid item xs={12} lg={10}>
              <SoftBox mb={3} position="relative">
                <SalesTable title="Sales by Country" rows={salesTableData} />
              </SoftBox>
            </Grid>
          </Grid> */}
          {/* <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid> */}
           <div style={styles.tableBooking}>
      {tables.map((table) => (
        <div key={table.tableId} style={styles.table}>
          <div style={styles.tableTitle}>Table {table.tableId}</div>
          <div style={styles.seats}>{renderSeats(table.tableId, table.capacity)}</div>
        </div>
      ))}
    </div>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
