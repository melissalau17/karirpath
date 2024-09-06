import React from "react";
import PropTypes from "prop-types";

function CustomCard({ title, salary, level, desc, date, link }) {
	return (
		<div className="border rounded p-2 w-96 h-36 bg-green-300">
			<div id="header" className="flex flex-row">
				<div className="flex flex-col mr-auto">
					<h1 className=" font-bold text-2xl">Title</h1>
					<h1>Salary</h1>
				</div>
				<p>Level</p>
			</div>
			<hr />
			<div id="body">
				<div>Company</div>
				<div>Desc</div>
			</div>
		</div>
	);
}

CustomCard.propTypes = {};

export default CustomCard;
