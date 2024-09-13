import type { GluegunToolbox } from "gluegun";

// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
	const {
		filesystem,
		template,
		print: { error, success },
	} = toolbox;
	toolbox.foo = () => {
		toolbox.print.info("called foo extension");
	};

	function isFirstLetterUppercase(str: string): boolean {
		if (!str || typeof str !== "string") return false; // Verifica se é uma string válida
		return str.charAt(0) === str.charAt(0).toUpperCase();
	}

	function verifyCorrectName(name: string) {
		if (!name) {
			error("Component name be specified");
			return false;
		}
		if (!isFirstLetterUppercase(name)) {
			error("1 letter of component must be capitalized");
			return false;
		}
		return true;
	}

	// async function isNextFramework() {
	// 	const packages = await filesystem.read("package.json", "json");
	// 	return !!packages.dependencies["next"];
	// }

	// async function isFileExists(filePath: string) {
	// 	if (filesystem.exists(filePath)) {
	// 		warning(`File ${filePath} already exists`);
	// 		return true;
	// 	}
	// 	return false;
	// }

	async function createComponent(folder, name) {
		if (!verifyCorrectName(name)) {
			return;
		}
		const componentPath = `${folder}/${name}`;
		const componentFilePath = `${componentPath}/index.tsx`;
		if (!filesystem.exists(componentFilePath)) {
			await template.generate({
				template: "component.ts.ejs",
				target: componentFilePath,
				props: { name },
			});
		}
		const componentControllerFilePath = `${componentPath}/use${name}Controller.ts`;
		if (!filesystem.exists(componentControllerFilePath)) {
			await template.generate({
				template: "component:c.ts.ejs",
				target: componentControllerFilePath,
				props: { name },
			});
		}

		// if (
		// 	filesystem.exists(componentFilePath) &&
		// 	filesystem.exists(componentControllerFilePath)
		// ) {
		// 	error(`File ${filePath} already exists `);
		// 	return;
		// }

		success(`Generated files at ${componentPath}`);
	}
	// enable this if you want to read configuration in from
	// the current folder's package.json (in a "hm-cli" property),
	// hm-cli.config.json, etc.
	// toolbox.config = {
	//   ...toolbox.config,
	//   ...toolbox.config.loadConfig("hm-cli", process.cwd())
	// }

	toolbox.createComponent = createComponent;
	// toolbox.isNextFramework = isNextFramework;
	toolbox.isFirstLetterUppercase = isFirstLetterUppercase;
	toolbox.verifyCorrectName = verifyCorrectName;
	// toolbox.isFileExists = isFileExists;
};
