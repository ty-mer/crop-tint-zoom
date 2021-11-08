var sizeOf = require('image-size');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require("fs");

const readPath = '/Users/tylermerle/Downloads/gws_photos';
const writePath = `~/Downloads/output`;
const cropByPercent = .09;

async function cropZoomTint(file) {
	var dimensions = sizeOf(file);

	let cropBy = { x: dimensions.width * cropByPercent, y: dimensions.height * cropByPercent };
	let colors = ["yellow", "blue", "green"];
	let color = colors[Math.floor(Math.random() * colors.length)]; // get random color

	// TODO: (TRM) use ffmpeg npm package instead of relying on `exec` and a local, external copy of ffmpeg
	const cmd = `~/Downloads/ffmpeg -i "${file}" -f lavfi -i "color=${color}:s=${dimensions.width}x${dimensions.height}" -filter_complex "scale=${dimensions.width}:${dimensions.height},rotate=-5*PI/180,crop=${dimensions.width - (cropBy.x * 2)}:${dimensions.height - (cropBy.y * 2)}:${cropBy.x}:${cropBy.y},scale=${dimensions.width}:${dimensions.height},blend=shortest=1:all_mode=overlay:all_opacity=0.05" ${writePath}/${guid()}.jpeg`;

	await exec(cmd);
}

function guid() {
	const gen = (count) => {
		let out = "";
		for (let i = 0; i < count; i++) {
			out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}
		return out;
	}

	return [gen(2), gen(1), gen(1), gen(1), gen(3)].join("-");
}

async function main() {
	const files = await fs.promises.readdir(readPath);
	let errors = [];

	for (const file of files) {
		console.log(file);
		try {
			await cropZoomTint(readPath + "/" + file.toString());
		} catch (e) {
			errors.push(readPath + "/" + file.toString());
		}
	}

	console.log(errors.join("\n"));

	process.exit();
}

main();