import {useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import '../styles/analytics.css'
import { BarChart } from '@mui/x-charts/BarChart';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from "@mui/x-charts";
import { Gauge } from '@mui/x-charts/Gauge';


function Analytics() {

    const {token} = useContext(AuthContext);
    const[response, setResponse] = useState(null);
    const[priorities, setPriorities] = useState(null);
    const[rate, setRate] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/tasks/time-spent-comparison", {headers: { Authorization: `Bearer ${token}`}})
        .then((res) => {
            setResponse(res.data);
        console.log(res.data)})
        .catch((err) => console.log("Error fetching data", err));
    }, []);

    useEffect(() => {
      axios.get("http://localhost:8080/tasks/priority-completion", {headers: {Authorization: `Bearer ${token}`}})
      .then((res) => {
        setPriorities(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log("Error fetching data", err));
    }, []);

    useEffect(() => {
      axios.get("http://localhost:8080/tasks/on-time-rate", {headers: {Authorization: `Bearer ${token}`}})
      .then((res) => {
        setRate(res.data);
        console.log(res.data);
      })

      .catch((err) => console.log("Error fetching data", err));
    }, []);

      



    return (
      <div className="analytics">
          <Navbar />
          <div className="analytics-sidebar-ctr">
              <Sidebar />
              <div className="analytics-ctr">
                  {/* First Row */}
                  <div className="row1">
                      <div className="chart-container">
                          <h3>Task Completion Over the Years</h3>
                          {response ? (
                              <BarChart
                                  xAxis={[{ scaleType: "band", data: response.months }]}
                                  series={[
                                      { data: response.lastYear, label: "Last Year" },
                                      { data: response.thisYear, label: "This Year" },
                                  ]}
                                  width={600}
                                  height={300}
                              />
                          ) : (
                              <p>Loading...</p>
                          )}
                      </div>
  
                      <div className="chart-container">
                          <h3>Task Completion Trend Over the Months</h3>
                          {response ? (
                              <LineChart
                                  xAxis={[
                                      {
                                          scaleType: "band",
                                          data: response.months.map((m) => m || ""),
                                      },
                                  ]}
                                  series={[
                                      {
                                          data: response.lastYear.map((val) =>
                                              typeof val === "number" && !isNaN(val) ? val : 0
                                          )
                                      },
                                  ]}
                                  width={500}
                                  height={300}
                              />
                          ) : (
                              <p>Loading...</p>
                          )}
                      </div>
                  </div>
  
                  {/* Second Row */}
                  <div className="row2">
                      <div className="chart-container">
                          <h3>Task Priority Distribution</h3>
                          {priorities ? (
                              <PieChart
                                  series={[
                                      {
                                          data: [
                                              { id: 0, value: priorities.LOW, label: "LOW" },
                                              { id: 1, value: priorities.MEDIUM, label: "MEDIUM" },
                                              { id: 2, value: priorities.HIGH, label: "HIGH" },
                                          ],
                                      },
                                  ]}
                                  width={450}
                                  height={250}
                              />
                          ) : (
                              <p>Loading...</p>
                          )}
                      </div>
  
                      <div className="chart-container">
                          <h3>On-Time Task Completion Rate</h3>
                          {rate ? (
                              <Gauge width={200} height={200} value={rate} />
                          ) : (
                              <p>Loading...</p>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );

}

export default Analytics;