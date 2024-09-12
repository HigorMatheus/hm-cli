import { GluegunToolbox, GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'generate:page',
  alias: ['g:p'],
  description: 'Create new page inside src/page',

  run: async (toolbox: GluegunToolbox) => {
    const { parameters, createComponent } = toolbox

    createComponent(`src/page`, parameters.first)
  },
}

export default command
