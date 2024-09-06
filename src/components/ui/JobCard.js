import React from "react";
import PropTypes from "prop-types";

function JobCard({ title, salary, level, desc, date, link }) {
	return (
		<a href={link} target="_blank">
			<div className="border rounded p-2 w-80 h-48 bg-teal-100 text-gray-700">
				<div id="header" className="flex flex-row w-full h-14">
					<div className="flex flex-col mr-auto max-w-[70%]">
						<h1 className="truncate font-bold text-lg">{title}</h1>
						<span className="text-sm">{salary}</span>
					</div>
					<p className=" text-xs">{level}</p>
				</div>
				<hr />
				<div id="body" className="w-full h-28">
					<div>{date.split("T")[0]}</div>
					<p className="text-clip text-sm w-full h-full ">{desc}</p>
				</div>
			</div>
		</a>
	);
}

JobCard.propTypes = {};

export default JobCard;
