import { GluegunToolbox } from 'gluegun'

// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
  const {
    // parameters,
    // filesystem,
    template,
    print: { error, success },
  } = toolbox
  toolbox.foo = () => {
    toolbox.print.info('called foo extension')
  }

  // async function isNext() {
  //   const packages = await filesystem.read('package.json', 'json')
  //   return !!packages.dependencies['next']
  // }

  async function createComponent(folder, name) {
    if (!name) {
      error('Component name be specified')
      return
    }

    // const packages = await filesystem.read('package.json', 'json')

    await template.generate({
      template: 'component.ts.ejs',
      target: `${folder}/${name}/index.tsx`,
      props: { name },
    })
    await template.generate({
      template: 'component:c.ts.ejs',
      target: `${folder}/${name}/use${name}Controller.ts`,
      props: { name },
    })

    success(`Generated file at ${folder}/${name}`)
  }
  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "hm-cli" property),
  // hm-cli.config.json, etc.
  // toolbox.config = {
  //   ...toolbox.config,
  //   ...toolbox.config.loadConfig("hm-cli", process.cwd())
  // }

  toolbox.createComponent = createComponent
}
