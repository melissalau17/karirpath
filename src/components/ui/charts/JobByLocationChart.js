import React, { useEffect, useState } from "react";
import { supabase } from "../../../App";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function JobByLocationChart() {
	const [dataset, setDataset] = useState();
	const fetchData = async () => {
		// Call the function
		let result = await supabase.rpc("rcp_get_total_jobs_by_location");
		console.log(result.data);
		setDataset({
			label: result.data.map((d) => d.city),
			data: result.data.map((d) => d.total_jobs),
		});
		return;
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="bg-teal-100 w-full h-full">
			{dataset && (
				<>
					<Bar
						data={{
							labels: dataset.label,
							// datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
							datasets: [
								{
									label: "Popularity of colours",
									data: dataset.data,
									// you can set individual colors for each bar
									backgroundColor: [
										"rgba(255, 99, 132, 0.6)",
										"rgba(255, 159, 64, 0.6)",
										"rgba(54, 162, 235, 0.6)",
									],
									borderWidth: 1,
								},
							],
						}}
						options={{
							plugins: {
								title: {
									display: true,
									text: "Job Trend June-August 2024",
								},
								legend: {
									display: true,
								},
							},
						}}
					/>
				</>
			)}
		</div>
	);
}

export default JobByLocationChart;
