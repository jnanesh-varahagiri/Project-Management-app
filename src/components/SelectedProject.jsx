import Button from "./Button"
import Tasks from "./Tasks"

export default function SelectedProject({project ,onDelete ,onAddTask,onDeleteTask,tasks}){
    const formattedDate = new Date(project.due_date).toLocaleDateString('en-US',{
        year : 'numeric',
        month:'short',
        day : 'numeric'
    })
    console.log(project)
    return (
        <>
        <div className="w-[35rem] mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h1>
                
                <button className="w-1/4 p-2 bold bg-slate-700 rounded-sm text-stone-200 hover:bg-stone-50 hover:text-stone-950" onClick={onDelete}>Delete</button>

                </div>
                <p className="mb-4 text-stone-500">{formattedDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>

            </header>
            <Tasks onAddTask={onAddTask} onDeleteTask={onDeleteTask} tasks={tasks} project={project}></Tasks>
        </div>
        </>
    )
}