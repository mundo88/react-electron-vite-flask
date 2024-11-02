import { IconBrandPython, IconClick, IconLink, IconPilcrow } from '@tabler/icons-react'



const useNodeType = ()=>{
    return [
        {
          icon:<IconLink size={20}/>,
          label:"Open url",
          type:"openUrl",
        },
        {
          icon:<IconClick size={20}/>,
          label:"Click element",
          type:"clickElement"
        },
        {
          icon:<IconPilcrow size={20}/>,
          label:"Send Text",
          type:"sendText"
        },
        {
          icon:<IconBrandPython size={20}/>,
          label:"Python code",
          type:"pythonCode"
        },
    ]
}
export default useNodeType
