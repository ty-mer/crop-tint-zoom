var sizeOf = require('image-size');
const { exec } = require("child_process");
// const cropBy = 320;

async function main() {
	const path = '/Users/tylermerle/Downloads/gws_photos/Omar Huerta - 16323225259848555278468269374968.jpg';
	var dimensions = sizeOf(path);
	console.log(dimensions.width, dimensions.height);
	let cropBy = { x: dimensions.width * .09, y: dimensions.height * .09 };
	const cmd = `~/Downloads/ffmpeg -i "${path}" -f lavfi -i "color=blue:s=${dimensions.width}x${dimensions.height}" -filter_complex "scale=${dimensions.width}:${dimensions.height},rotate=-10*PI/180,crop=${dimensions.width - (cropBy.x * 2)}:${dimensions.height - (cropBy.y * 2)}:${cropBy.x}:${cropBy.y},scale=${dimensions.width}:${dimensions.height},blend=shortest=1:all_mode=overlay:all_opacity=0.1" output.jpeg`;
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