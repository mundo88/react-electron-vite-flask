import { useCallback, useEffect, useMemo,  useState } from 'react'
import ReactFlow, { 
  ReactFlowProvider,
  useNodesState, 
  useEdgesState, 
  Background, 
  Controls, 
  addEdge, 
  SelectionMode,
  useOnSelectionChange
} from 'reactflow';
import 'reactflow/dist/style.css';
import { IconArrowLeft, IconBrandChrome, IconCheck, IconChevronDown, IconDeviceMobile, IconDots, IconExternalLink, IconLetterA, IconLink, IconPencilMinus, IconPhone, IconPilcrow, IconPlug, IconPlus, IconReload, IconTextCaption, IconX } from '@tabler/icons-react';
import OpenUrl from '../components/nodes/OpenUrl';
import ClickElement from '../components/nodes/ClickElement';
import SendText from '../components/nodes/SendText';
import PythonCodeEditor from '../components/nodes/PythonCodeEditor';
import ViewLog from '../components/ViewLog';
import useNodeType from '../hooks/useNodeType';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import useAxiosPrivate from '@renderer/hooks/useAxiosPrivate';
import useAuth from '@renderer/hooks/useAuth';



const TaskSideBar = ({task,callbackAppName,callbackPlatform})=>{
  const [appName,setAppName] = useState<string>(task.title)
  const [onEditAppName,setOnEditAppName] = useState(false)
  const [platformShow,setPlatformShow] = useState(false)
  const onDragStart = (event, nodeType,label) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/reactflow-label', label);
    event.dataTransfer.effectAllowed = 'move';
  };
  const platforms = [
    {
      title:"chrome",
      icon:<IconBrandChrome/>
    },
    {
      title:"mobie",
      icon:<IconDeviceMobile/>
    }
  ]
  const platformDefault = platforms.find(item=>item.title===task.platform)
  const [platform,setPlatform] = useState(platformDefault)
  useEffect(()=>callbackPlatform(platform),[platform])

  const nodeItems = useNodeType()

  const createNode = ()=>{

  }

  useEffect(()=>{
    callbackAppName(appName)
  },[appName])

  return (
    <div className='w-80 border-r  h-full py-2 max-h-full flex flex-col overflow-hidden'>
      <div className="px-4">
        <div className='flex items-center justify-between gap-8 px-4'>
            <div className='flex items-center gap-1'>
              { 
              onEditAppName ? 
                <div className='flex items-center justify-center gap-2'>
                    <input onChange={(e)=>setAppName(e.target.value)} type="text" value={appName} className='w-36 p-2 border outline-none focus:border-sky-500 rounded-lg' />
                    <button onClick={()=>setOnEditAppName(false)} className='flex items-center justify-center text-white p-2 rounded-md bg-sky-500 hover:bg-sky-600 duration-150'>
                      <IconCheck size={24}></IconCheck>
                    </button>
                </div>
                :
                <div className='flex items-center justify-center gap-2'>
                  <h2 className='text-xl font-bold'>{appName}</h2>
                  <button onClick={()=> setOnEditAppName(true)} className='flex items-center justify-center text-gray-500 hover:text-gray-800'>
                    <IconPencilMinus size={16}></IconPencilMinus>
                  </button>
                </div>
              }
            </div>
            {/* <p className='px-2 py-1 border bg-gray-100 text-gray-800 rounded-full'>v1.0.0</p> */}
        </div>
        <div className='relative flex items-center justify-between mt-4 border border-gray-300 p-2 rounded-lg' onClick={()=>setPlatformShow(!platformShow)}> 
            <div className='flex items-center gap-2 text-gray-500'>
              {platform.icon}
              <p className='text-gray-800'>{platform.title}</p>
            </div>
            <div className='text-gray-300'>
              <IconChevronDown size={18}></IconChevronDown>
            </div>
            {
            platformShow &&
            <div className='p-1 border absolute top-full mt-1 left-0 w-full bg-white rounded-md shadow-md'>
              {platforms.map((item,index)=>(
                <div onClick={()=>setPlatform(item)} key={index} className='text-gray-500 flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-gray-100 duration-150'>
                    {item.icon}
                    <span className='text-gray-800'>{item.title}</span>
                </div>
              ))}
            </div>
            }
        </div>
        <div className='h-px w-full bg-gray-200 my-8'></div>
        <input type="search" className='p-2 border border-gray-300 rounded-md w-full outline-none focus:border-sky-500' placeholder='Search (ctrl+f)'  />
        <div className='flex items-center justify-between my-6'>
            <p className='text-lg font-bold uppercase text-gray-500'>Navigation</p>
            <button className='text-gray-500' onClick={createNode}>
              <IconPlus size={24}></IconPlus>
            </button>
        </div>
      </div>
      <div className='flex flex-col gap-2 h-full overflow-auto px-4 pb-4'>
          {nodeItems.map((item,index)=>(
            <div key={index} onDragStart={(event) => onDragStart(event, item.type,item.label)} draggable className='py-2.5 px-8 border border-gray-300 rounded-md w-full outline-none hover:border-sky-500 flex items-center gap-3 text-gray-800'>
                {item.icon}
                {item.label}
            </div>
          ))}
      </div>
    </div>
  )
}




function Flow({innitialNodes,innitialEdges,callbackNodes,callbackEdges}) {
  const nodeTypes = useMemo(() => ({
    openUrl: OpenUrl,
    clickElement:ClickElement,
    sendText:SendText,
    pythonCode:PythonCodeEditor
  }), []);

  const [nodes, setNodes,onNodesChange] = useNodesState(innitialNodes);
  const [edges, setEdges,onEdgesChange] = useEdgesState(innitialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState(null);
  const [pasteNodes, setPasteNodes] = useState([]);
  const [customSelectedNodes, setCustomSelectNodes] = useState([]);
  const onConnect = useCallback(
    (connection) => {
      setEdges((oldEdges) => addEdge(connection, oldEdges));
      const node = nodes.find(x=>x.id ===connection.source)
      console.log(node)
    },
    [setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/reactflow-label');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      let nodeId = uuidv4()
      const newNode = {
        id: String(nodeId),
        type,
        position,
        data: { label: label,value:"",by:"id"},
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );
  useEffect(() => {
    callbackNodes(nodes)
  }, [nodes]);

  useEffect(() => {
    callbackEdges(edges)
  }, [edges]);


  const onChange = useCallback(({ nodes,edges }) => {
    const nodesCustom = customSelectedNodes.filter(node=>nodes.includes(node.id))
  
    setCustomSelectNodes(nodesCustom);
    console.log(nodesCustom)

    setSelectedNodes(nodes.map((node) => node.id));
    setSelectedEdges(edges);
  }, [])
 
  useOnSelectionChange({
    onChange
  });

  
  useEffect(() => {
    function onKeyDown(event){
      if(event.key==='Delete'){
        onDelete(event)
      }
      return 
    }
    function onDelete(event){
      if (!event.target?.closest(".react-flow") || event.target?.closest("input")) {
        return;
      }
      const newNodes = nodes.filter(node=>!selectedNodes.includes(node.id))
      setNodes(newNodes)
      setSelectedNodes([])
    }
    function onCut(event){
      if (!event.target?.closest(".react-flow") || event.target?.closest("input")) {
        return;
      }
      const cutNode = nodes.filter(node=>selectedNodes.includes(node.id))
      const unCutNode = nodes.filter(node=>!selectedNodes.includes(node.id))
      setNodes(unCutNode)
      setPasteNodes(cutNode)
    }
    function onCopy(event){
      if (!event.target?.closest(".react-flow")) {
        return;
      }
      const copyNodes = nodes.filter(node=>selectedNodes.includes(node.id))
      setPasteNodes(copyNodes)
    }
    function onPaste(event){
      if (event.target?.closest("input")) {
        return;
      }
      const newNodes = []
      pasteNodes.map((node)=> {
          const newNode = {...node}
          newNode.id = uuidv4()
          newNode.position = {x:node.position.x+100,y:node.position.y+100}
          newNode.positionAbsolute = {x:node.position.x+100,y:node.position.y+100}
          newNodes.push(newNode)
        }
      )
      setNodes((node) => [...node,...newNodes]);
    }
    window.addEventListener('keydown',onKeyDown);
    window.addEventListener('copy',onCopy);
    window.addEventListener('paste',onPaste);
    window.addEventListener('cut',onCut);

    return () => {
      window.removeEventListener('keydown',onKeyDown);
      window.removeEventListener('copy',onCopy);
      window.removeEventListener('paste',onPaste);
      window.removeEventListener('cut',onCut);
    };
  }, [selectedNodes]);
  
  return (
      <>
        <ReactFlow 
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          onNodeClick={(event, node) => {
            console.log(node)
          }}
          onDragOver={onDragOver}
          selectionOnDrag
          panOnDrag={[1, 2]}
          selectionMode={SelectionMode.Partial}
          fitView
        >
          <Background />
          <Controls/>
        </ReactFlow>
      </>
  );
}


export default function Task({task,onSave}) {
  const [nodes,setNodes] = useState(task.nodes)
  const [edges,setEdges] = useState(task.edges)
  const [appName,setAppName] = useState(task.title)
  const [platform,setPlatform] = useState(task.platform)
  const handleOnSave = ()=>{
    const data = {
      title: appName,
      nodes:nodes,
      platform :platform.title,
      edges:edges
    }
    onSave(data)
  }

  return (
    <div className='h-full flex-1 flex flex-col overflow-hidden'>
        <div className='w-full p-4 flex items-center justify-between border-b'>
          <button onClick={()=>window.history.back()} className='flex items-center gap-1 text-gray-500 hover:text-gray-800 duration-150'>
              <IconArrowLeft size={18}></IconArrowLeft>
              <span>Back to my app</span>
          </button>
          <div className='flex items-center justify-end gap-4'>
              <button onClick={handleOnSave} className='px-4 py-2 border border-sky-500 hover:border-sky-600 duration-150 rounded-md active:scale-95'>
                Lưu dự án
              </button>
              <button className='px-4 py-2 bg-sky-500 hover:bg-sky-600 duration-150 text-white rounded-md active:scale-95 '>
                Chạy thử
              </button>
              <button className='text-gray-500 hover:text-sky-500 flex items-center justify-center duration-150'>
                <IconDots></IconDots>
              </button>
          </div>
        </div>
        <ReactFlowProvider>
        <div className='flex flex-1 overflow-hidden'>
          <TaskSideBar callbackPlatform={setPlatform} callbackAppName={setAppName} task={task}/>
          <div className='w-full flex flex-col'>
            <Flow innitialNodes={nodes} innitialEdges={edges} callbackNodes={setNodes} callbackEdges={setEdges}/>
            <ViewLog/>
          </div>
        </div>
        </ReactFlowProvider>
    </div>
  )
}
