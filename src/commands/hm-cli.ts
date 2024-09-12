import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'hm-cli',
  run: async (toolbox) => {
    const { print } = toolbox

    print.info('Welcome to your CLI')
  },
}

module.exports = command
