const { rimraf } = require("rimraf");

const { exec } = require("child_process");
const fs = require("fs");

const time = Date.now();
exec(`tar -pczf ${time}.tar.gz ./dist`);

setTimeout(() => {
	const oldPath = `./${time}.tar.gz`;
	const newPath = `./builds/${time}.tar.gz`;

	fs.access(oldPath, fs.constants.F_OK, (err) => {
		if (err) {
			console.log("File does not exist");
		} else {
			fs.rename(oldPath, newPath, (err) => {
				if (err) throw err;
				console.log("Moved successfuly complete!");
			});
		}
	});
	rimraf("dist");

	fs.readdir("./builds", (err, files) => {
		if (err) throw err;
		if (files.length > 3) {
			// Delete 4 oldest files
			files.sort((a, b) => a - b);
			for (let i = 0; i < 2; i++) {
				fs.unlink(`./builds/${files[i]}`, (err) => {
					if (err) throw err;
					console.log(`Deleted ${files[i]}`);
				});
			}
		}
	});
}, 1500);

fs.access("./builds", fs.constants.F_OK, (err) => {
	if (err) {
		fs.mkdir("./builds", (err) => {
			if (err) throw err;
			return console.log("Directory created");
		});
	}
	return console.log("Directory exists");
});
