import { GluegunToolbox, GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'generate:page',
  alias: ['g:p'],
  description: 'Create new page',

  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      createComponent,
      print: { error, success },
      template,
      isFileExists,
      isNextFramework,
      verifyCorrectName,
    } = toolbox
    const isNext = isNextFramework()
    const name = parameters.first

    if (isNext) {
      if (!verifyCorrectName(name)) {
        return
      }
      const path = parameters.options?.path

      if (path?.length < 1 || !path) {
        error('Page path required --path=/')
        return
      }

      const filePath = `src/app/${path}/page.tsx`

      if (isFileExists(filePath)) {
        return
      } else {
        await template.generate({
          template: 'next:page.ts.ejs',
          target: `src/app/${path}/page.tsx`,
          props: { name },
        })
        success(`Generated file at src/app${path}/page.tsx`)
        return
      }
    }

    createComponent(`src/page`, parameters.first)
  },
}

export default command
