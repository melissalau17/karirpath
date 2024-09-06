import React, { useEffect, useState } from "react";
import { supabase } from "../../../App";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function JobTrendChart() {
	const [dataset, setDataset] = useState();
	const fetchData = async () => {
		const { data, error } = await supabase
			.from("Job")
			.select("date, id_roleclass")
			.order("date", { ascending: true });

		const jobCount = data.reduce((acc, job) => {
			const month = new Date(job.date).toISOString().slice(0, 7);
			const roleClass = job.id_roleclass;
			const key = `${month}-${roleClass}`;
			if (!acc[key]) {
				acc[key] = {
					month,
					id_roleclass: roleClass,
					job_count: 0,
				};
			}
			acc[key].job_count += 1;
			return acc;
		}, {});

		const result = Object.values(jobCount);

		const convertToChartData = (data) => {
			const groupedData = {};
			data.forEach((item) => {
				const { month, id_roleclass, job_count } = item;
				if (!groupedData[month]) {
					groupedData[month] = {
						month,
						job_count_1: 0,
						job_count_2: 0,
						job_count_3: 0,
						job_count_4: 0,
						job_count_5: 0,
						job_count_6: 0,
					};
				}
				groupedData[month][`job_count_${id_roleclass}`] = job_count;
			});
			return Object.values(groupedData);
		};
		const chartData = convertToChartData(result);

		setDataset({
			labels: chartData.map((data) => data.month),
			datasets: [
				{
					label: "Network",
					data: chartData.map((data) => data.job_count_1),
					borderColor: "red",
					borderWidth: 2,
				},
				{
					label: "Data",
					data: chartData.map((data) => data.job_count_2),
					borderColor: "green",
					borderWidth: 2,
				},
				{
					label: "Front End",
					data: chartData.map((data) => data.job_count_3),
					borderColor: "blue",
					borderWidth: 2,
				},
				{
					label: "Back End",
					data: chartData.map((data) => data.job_count_4),
					borderColor: "yellow",
					borderWidth: 2,
				},
				{
					label: "Full Stack",
					data: chartData.map((data) => data.job_count_5),
					borderColor: "black",
					borderWidth: 2,
				},
				{
					label: "Design",
					data: chartData.map((data) => data.job_count_6),
					borderColor: "cyan",
					borderWidth: 2,
				},
			],
		});
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="bg-teal-100 w-full h-full">
			{dataset && (
				<>
					<Line
						data={dataset}
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

export default JobTrendChart;
