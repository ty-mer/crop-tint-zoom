var sizeOf = require('image-size');
const { exec } = require("child_process");
const cropByPercent = .09;
async function main() {
	const path = '/Users/tylermerle/Downloads/gws_photos/Omar Huerta - 16323225259848555278468269374968.jpg';
	var dimensions = sizeOf(path);
	console.log(dimensions.width, dimensions.height);
	let cropBy = { x: dimensions.width * cropByPercent, y: dimensions.height * cropByPercent };
	let radians = 111 * cropByPercent;
	let colors = ["yellow", "blue", "green"];
	let color = colors[Math.floor(Math.random() * colors.length)];
	console.log(color);
	const cmd = `~/Downloads/ffmpeg -i "${path}" -f lavfi -i "color=${color}:s=${dimensions.width}x${dimensions.height}" -filter_complex "scale=${dimensions.width}:${dimensions.height},rotate=-${radians}*PI/180,crop=${dimensions.width - (cropBy.x * 2)}:${dimensions.height - (cropBy.y * 2)}:${cropBy.x}:${cropBy.y},scale=${dimensions.width}:${dimensions.height},blend=shortest=1:all_mode=overlay:all_opacity=0.05" output_${color}.jpeg`;
	console.log(cmd);
	exec(cmd, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
}

main();