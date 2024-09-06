import React, { useEffect, useState } from "react";
import { supabase } from "../../../App";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function GraduationTotalChart() {
	const [dataset, setDataset] = useState();
	const fetchData = async () => {
		// Call the function
		let result = await supabase.from("DataKelulusan").select("*");
		result = result.data;
		const groupByYear = (data) => {
			const groupedData = {};

			data.forEach((item) => {
				const { tahun, id_jurusankuliah, total } = item;
				if (!groupedData[tahun]) {
					groupedData[tahun] = {
						tahun,
						jurusan_0: null,
						jurusan_1: null,
						jurusan_2: null,
						jurusan_3: null,
					};
				}
				groupedData[tahun][`jurusan_${id_jurusankuliah}`] = total;
			});
			return Object.values(groupedData);
		};
		const chartData = groupByYear(result);

		console.log(chartData);
		setDataset({
			labels: chartData.map((data) => data.tahun),
			datasets: [
				{
					label: "Ilmu Komputer & Informatika",
					data: chartData.map((data) => data.jurusan_0),
					borderColor: "black",
					borderWidth: 2,
				},
				{
					label: "Teknologi & Sistem Informasi",
					data: chartData.map((data) => data.jurusan_1),
					borderColor: "red",
					borderWidth: 2,
				},
				{
					label: "Telekomunikasi & Elektro",
					data: chartData.map((data) => data.jurusan_2),
					borderColor: "green",
					borderWidth: 2,
				},
				{
					label: "Data & Statistika",
					data: chartData.map((data) => data.jurusan_3),
					borderColor: "blue",
					borderWidth: 2,
				},
			],
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
					<Line
						data={dataset}
						options={{
							plugins: {
								title: {
									display: true,
									text: "Student Graduate Informatics Related",
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

export default GraduationTotalChart;
