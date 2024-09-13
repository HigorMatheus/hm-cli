import type { GluegunToolbox, GluegunCommand } from "gluegun";

const command: GluegunCommand = {
	name: "generate:component",
	alias: ["g:c"],
	description: "Create new Component inside src/component",

	run: async (toolbox: GluegunToolbox) => {
		const { parameters, createComponent } = toolbox;

		createComponent(`src/components`, parameters.first);
	},
};

export default command;
